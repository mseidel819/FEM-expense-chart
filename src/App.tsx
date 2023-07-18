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
    <main className="app-container" id="app-container">
      <Balance />
      <div className="bottom-container">
        <h1 className="app-title">Spending - Last 7 days</h1>
        <div id="graph-container" className="graph-container">
          <Graph data={data} />
        </div>
        <div className="monthly-container">
          <Monthly total={total} />
        </div>
      </div>
    </main>
  );
}

export default App;
