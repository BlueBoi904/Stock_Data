import React from 'react';
import './App.css';
import { Subscriber } from './subscription/Subscriber';
import News from './routes/News/News';
import Quote from './routes/Quote/Quote';
import Home from './routes/Home/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const sub = Subscriber.get({ id: 'test' });
const obj = { id: 'Socket 1' };

sub.stream.subscribe({
  next: (message) => {
    console.log(`Message From Here`, message);
  },
});

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>

        <Route path='/news'>
          <News />
        </Route>

        <Route path='/quote'>
          <Quote />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
