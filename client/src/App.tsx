import React from 'react';
import './App.css';
import { SubscribeToPath } from './subscription/SubscriptionHandler';
import News from './routes/News/News';
import Quote from './routes/Quote/Quote';

const SubToTest = SubscribeToPath('test');
const SubToOther = SubscribeToPath('other');
SubToTest.addListener({
  next: (message) => {
    console.log('Subscribed to Test', message);
  },
});

SubToOther.addListener({
  next: (message) => {
    console.log('Subscribed to OTher', message);
  },
});

function App(): JSX.Element {
  return (
    <div>
      <News />
      <Quote />
    </div>
  );
}

export default App;
