import React from 'react';
import './App.scss';
import News from './routes/News/News';
import Quote from './routes/Quote/Quote';
import Home from './routes/Home/Home';
import { SubscribeToPath } from './subscription/SubscriptionHandler';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/news">
          <News />
        </Route>

        <Route path="/quote">
          <Quote />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
