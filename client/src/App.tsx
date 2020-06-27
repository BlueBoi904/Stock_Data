import React  from 'react';
import './App.css';
import {Subscriber} from './subscription/Subscriber'


const sub = Subscriber.get({id: "test"})
const obj = {id: "Socket 1"}

sub.stream.subscribe({
  next: (message) => {
      console.log(`Message From Here`,message)
  }
})



function App() {

  return (
    <div className="App">
      
    <div>Something Bad</div>


    </div>
  );
}

export default App;
