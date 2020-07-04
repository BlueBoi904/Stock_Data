import xs, { Listener, Stream } from 'xstream';

type Config = {
  id: string;
};

class Subscriber {
  private static clients = new WeakMap<Config, Subscriber>();
  public readonly stream: Stream<unknown>;
  private listener: Listener<unknown> | null = null;
  private retryTimeout: null | NodeJS.Timeout = null;
  private socket: Promise<WebSocket> | null = null;

  public static get(config: Config): Subscriber {
    let client = this.clients.get(config);
    if (client === undefined) {
      client = new Subscriber();
      this.clients.set(config, client);
    }
    return client;
  }

  private constructor() {
    this.stream = xs.create({
      start: (listener) => {
        if (this.listener !== null) {
          throw new Error('Expected listener to be null.');
        }
        this.listener = listener;
        this.ensureSocket();
      },
      stop: () => {
        if (this.listener === null) {
          throw new Error('Expected listener to not be null.');
        }
        this.listener = null;
      },
    });
  }
  private ensureSocket(): Promise<WebSocket> {
    // If we scheduled a retry then cancel it since we are retrying right now!
    if (this.retryTimeout !== null) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = null;
    }

    // We already have the socket. We don’t need to connect a new one.
    if (this.socket !== null) {
      return this.socket;
    }

    // If we don‘t have a WebSocket then create one...
    return (this.socket = this.createSocket());
  }

  private async createSocket(): Promise<WebSocket> {
    // We will modify the URL given to us in configuration to get the right
    // WebSocket URL.
    const url = 'ws://localhost:8080/subscribe';

    // Start our connection with the modified URL!
    const socket = new WebSocket(url);

    socket.addEventListener('open', () => {
      // Let the listener know our socket connected.
      if (this.listener !== null) {
        this.listener.next({ type: 'connected' });
      }
    });

    // When we get a message we parse the message as JSON and send it to
    // our listener.
    socket.addEventListener('message', (event) => {
      try {
        // Parse the message from our server as JSON. Assume that our server
        // gave us a correctly formatted subscription message.
        const rawMessage = event.data as unknown;
        if (typeof rawMessage !== 'string') {
          throw new Error('Expected string.');
        }
        const message: string = JSON.parse(rawMessage);

        switch (message) {
          case 'error': {
            throw new Error('Test');
          }
          default: {
            // If we have a listener then send it the message...
            if (this.listener !== null) {
              this.listener.next(message);
            }
            break;
          }
        }
      } catch (error) {
        this.handleError(error);
      }
    });

    // Forward any errors to our listener. If we have no listener then treat
    // the error as an unhandled error.
    socket.addEventListener('error', () => {
      this.handleError(new Error('WebSocket connection closed unexpectedly.'));
    });

    // If the socket closes before we’ve stopped the producer, then try to
    // re-connect! The WebSocket closing does not mean there will be no more
    // events. It more likely means the internet temporarily disconnected.
    socket.addEventListener('close', () => {
      this.socket = null;

      // Let the listener know our socket disconnected. If the listener waits
      // long enough the socket will re-connect.
      if (this.listener !== null) {
        this.listener.next({ type: 'disconnected' });
      }

      // If the WebSocket closes unexpectedly then after some delay we try to
      // re-connect.
      if (this.listener !== null && this.retryTimeout === null) {
        this.retryTimeout = setTimeout(() => {
          this.retryTimeout = null;

          if (this.listener !== null) {
            this.ensureSocket();
          }
        }, 1000);
      }
    });

    return socket;
  }

  private handleError(error: unknown) {
    if (this.listener !== null) {
      this.listener.error({ type: 'error', error });
    } else {
      console.error(error); // eslint-disable-line no-console
    }
  }

  /**
   * Publishes a message to our WebSocket. If our WebSocket is not yet open then
   * we will wait until it opens to send the message.
   */
  public publish(message: Message): void {
    this.ensureSocket().then((socket) => {
      if (socket.readyState === WebSocket.CONNECTING) {
        const handleOpen = () => {
          socket.removeEventListener('open', handleOpen);
          socket.send(JSON.stringify(message));
        };

        socket.addEventListener('open', handleOpen);
      } else {
        socket.send(JSON.stringify(message));
      }
    });
  }
}

type Message = {
  type: string;
  topic?: string;
};

export { Subscriber };
/*
var stream: Stream<string> = xs.create({
  start: listener => {
    if (this.listener !== null) {
      throw new Error("Expected listener to be null.");
    }
    this.listener = listener;
    this.ensureSocket();
  },
  stop: () => {
    if (this.listener === null) {
      throw new Error("Expected listener to not be null.");
    }
    this.listener = null;
  },
})
 */
