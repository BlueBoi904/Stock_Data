import React from 'react';
import './App.scss';
import { News } from './routes/News/News';
import Quote from './routes/Quote/Quote';
import { Home } from './routes/Home/Home';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/historical/:ticker" component={Home} />
        <Route path="/news/:ticker" component={News} />
        <Route path="/quote/:ticker" exact component={Quote} />
      </Switch>
    </Router>
  );
}

export default App;
