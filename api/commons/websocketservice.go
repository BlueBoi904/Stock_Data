package commons

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 1024
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Client is a middleman between the websocket connection and the hub.
type Client struct {
	hub  *Hub
	conn *websocket.Conn
	send chan interface{}
}

type ClientReader interface {
	ReadMessageJSON(v interface{}) (interface{}, error)
}

func (c *Client) ReadMessageJSON(v interface{}) error {
	_, msg, err := c.conn.ReadMessage()
	if err != nil {
		return err
	}

	err = json.Unmarshal(msg, &v)
	if err != nil {
		return err
	}

	return nil
}

func (c *Client) WriteMessageJSON(message interface{}) error {
	w, err := c.conn.NextWriter(websocket.TextMessage)
	if err != nil {
		return err
	}

	json.NewEncoder(w).Encode(message)

	// Add queued chat messages to the current websocket message.
	n := len(c.send)
	for i := 0; i < n; i++ {
		err = json.NewEncoder(w).Encode(<-c.send)
		return err
	}

	if err := w.Close(); err != nil {
		return err
	}
	return nil
}

// readPump pumps messages from the websocket connection to the hub.
//
// The application runs readPump in a per-connection goroutine. The application
// ensures that there is at most one reader on a connection by executing all
// reads from this goroutine.
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error {
		c.conn.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})

	for {
		exp := SubscribeMessage{}
		err := c.ReadMessageJSON(&exp)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			fmt.Println(err)
			break
		}
		exp.Client = c
		c.hub.broadcast <- exp
	}
}

// writePump pumps messages from the hub to the websocket connection.
//
// A goroutine running writePump is started for each connection. The
// application ensures that there is at most one writer to a connection by
// executing all writes from this goroutine.
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			err := c.WriteMessageJSON(message)
			if err != nil {
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, []byte("ping")); err != nil {
				return
			}
		}
	}
}

// serveWs handles websocket requests from the peer.
func ServeWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{hub: hub, conn: conn, send: make(chan interface{})}
	client.hub.register <- client

	// Allow collection of memory referenced by the caller by doing all work in
	// new goroutines.
	go client.writePump()
	go client.readPump()
}

type ClientMessage struct {
	Type string `json:"id"`
}

type SubscribeMessage struct {
	Type   string `json:"type"`
	Topic  string `json:"topic"`
	Client *Client
}

type Hub struct {
	clients    map[*Client]bool
	broadcast  chan interface{}
	register   chan *Client
	unregister chan *Client
	topicMap   map[string][]*Client
}

func NewHub() *Hub {
	return &Hub{
		broadcast:  make(chan interface{}),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
		topicMap:   make(map[string][]*Client),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
		case message := <-h.broadcast:
			if m, ok := message.(SubscribeMessage); ok {
				if _, ok := h.topicMap[m.Topic]; ok {
					hasSubscribed := false
					for _, client := range h.topicMap[m.Topic] {
						if client == m.Client {
							hasSubscribed = true
						}
					}
					if !hasSubscribed {
						h.topicMap[m.Topic] = append(h.topicMap[m.Topic], m.Client)
					}
					break
				}
				h.topicMap[m.Topic] = make([]*Client, 1)
				h.topicMap[m.Topic][0] = m.Client
			}
		}
	}
}

func (h *Hub) SendMessage(v interface{}, topicName string) {
	defer func() {
		fmt.Println(h.topicMap)
	}()
	for i, client := range h.topicMap[topicName] {
		_, ok := h.clients[client]
		if !ok {
			h.topicMap[topicName] = remove(h.topicMap[topicName], i)
			continue
		}
		select {
		case client.send <- v:
		default:
			close(client.send)
			h.topicMap[topicName] = remove(h.topicMap[topicName], i)
		}
	}
}

func remove(s []*Client, i int) []*Client {
	s[i] = s[len(s)-1]
	// We do not need to put s[i] at the end, as it will be discarded anyway
	return s[:len(s)-1]
}
