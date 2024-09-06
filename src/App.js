import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [desc, setDesc] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const res = await fetch(url);
    return await res.json();
  }
  function addNewTranx(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ price, name, desc, datetime }),
    }).then((res) => {
      setName("");
      setPrice("");
      setDatetime("");
      setDesc("");
      res.json().then((json) => console.log("result", json));
    });
  }
  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }
  return (
    <main>
      <h1>
        {balance} <span>.00</span>
      </h1>
      <form onSubmit={addNewTranx}>
        <div className="basic">
          <input
            type="number"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            placeholder={"200"}
          ></input>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder={"+200 new TV"}
          ></input>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(ev) => setDatetime(ev.target.value)}
          ></input>
        </div>
        <div className="description">
          <input
            type="text"
            value={desc}
            onChange={(ev) => setDesc(ev.target.value)}
            placeholder={"description"}
          ></input>
        </div>
        <button type="submit">Add New Transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <div id={Math.random() * 100} className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.desc}</div>
              </div>
              <div className="right">
                <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
