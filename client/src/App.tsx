import React from "react";
import "./App.css";
import { Subscriber } from "./subscription/Subscriber";
import News from "./routes/News/News";
import Quote from "./routes/Quote/Quote";

const sub = Subscriber.get({ id: "test" });
const obj = { id: "Socket 1" };

sub.stream.subscribe({
  next: (message) => {
    console.log(`Message From Here`, message);
  },
});

function App() {
  return (
    <div>
      <News />
      <Quote />
    </div>
  );
}

export default App;
