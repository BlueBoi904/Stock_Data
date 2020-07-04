import { Subscriber } from './Subscriber';
import xs, { Listener } from 'xstream';

function buildSubscription() {
  const subscription = Subscriber.get({ id: '12313' });
  return (subscribePath) => {
    let listener: Listener<unknown> | null = null;

    const listenToServer = {
      next: (message) => {
        if (listener === null) {
          throw new Error('Shouldnt be empty');
        }
        if (subscribePath === message.type) {
          listener.next(message);
        }
      },
      error: (error) => {
        if (listener === null) {
          throw new Error('Shouldnt be empty');
        }
        listener.error(error);
      },
      complete: () => {
        if (listener === null) {
          throw new Error('Expected listener to not be null.');
        }
        listener.complete();
      },
    };

    return xs.create({
      start: (newListener) => {
        if (listener !== null) {
          throw new Error('Expected listener to be null.');
        }
        listener = newListener;
        subscription.publish({
          type: 'subscribe',
          topic: subscribePath,
        });
        subscription.stream.addListener(listenToServer);
      },
      stop: () => {
        if (listener === null) {
          throw new Error('Expected listener to not be null.');
        }
        listener = null;
        subscription.publish({
          type: 'unsubscribe',
          topic: subscribePath,
        });
        subscription.stream.removeListener(listenToServer);
      },
    });
  };
}

const SubscribeToPath = buildSubscription();

export { SubscribeToPath };
