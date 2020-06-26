import React  from 'react';
import './App.css';
import {Subscriber} from './subscription/Subscriber'


const sub = Subscriber.get({id: "test"})
const obj = {id: "test"}

sub.publish(JSON.stringify(obj))

function App() {

  return (
    <div className="App">
      
    <div>Something Bad</div>


    </div>
  );
}

export default App;
