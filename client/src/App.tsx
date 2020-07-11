import React from 'react';
import './App.scss';
import { News } from './routes/News/News';
import Quote from './routes/Quote/Quote';
import { Home } from './routes/Home/Home';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

/*
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
*/

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/news/:ticker" component={News} />
        <Route path="/quote" exact component={Quote} />
      </Switch>
    </Router>
  );
}

export default App;
