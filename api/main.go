package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/Finnhub-Stock-API/finnhub-go"
	"github.com/Stock_Data/api/conf"
)

var config = conf.Initialize("./conf")
var apiKey = config.GetString("apiKey")
var finnhubClient = finnhub.NewAPIClient(finnhub.NewConfiguration()).DefaultApi
var auth = context.WithValue(context.Background(), finnhub.ContextAPIKey, finnhub.APIKey{
	Key: apiKey,
})

func homepage(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Fprintf(w, "Homepage endpoint hit!")
}

func news(w http.ResponseWriter, r *http.Request) {
	// Get general market news
	generalNews, _, err := finnhubClient.GeneralNews(auth, "general", nil)
	if err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(generalNews)
}
func quote(w http.ResponseWriter, r *http.Request) {
	// Get price data for a ticker
	quote, _, err := finnhubClient.Quote(auth, "AAPL")
	if err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(quote)
}

func handleRequests() {
	http.HandleFunc("/", homepage)
	http.HandleFunc("/quote", quote)
	http.HandleFunc("/news", news)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func main() {
	handleRequests()
}
