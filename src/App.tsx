import "./App.css";
import Balance from "./components/balance.component";

import Data from "../data.json";
import Monthly from "./components/monthly.component";
import Graph from "./components/graph.component";

function App() {
  const data = Data;

  const total = data.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  return (
    <div className="app-container" id="app-container">
      <Balance />
      <div className="bottom-container">
        <h1 className="app-title">Spending - Last 7 days</h1>
        <Graph data={data} />
        <Monthly total={total} />
      </div>
    </div>
  );
}

export default App;
