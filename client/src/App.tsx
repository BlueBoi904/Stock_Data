import React  from 'react';
import './App.css';
import {SubscribeToPath} from './subscription/SubscriptionHandler'



const SubToTest = SubscribeToPath("test")
const SubToOther = SubscribeToPath("other")
SubToTest.addListener({
  next: (message) => {
    console.log("Subscribed to Test",message)
  }
})

SubToOther.addListener({
  next: (message) => {
    console.log("Subscribed to OTher",message)
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
