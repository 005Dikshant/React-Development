import { useState } from "react";

export default function App() {
  const [custBill, setCustBill] = useState(0);
  const [myTip, setMyTip] = useState(0);
  const [friendTip, setMyFriendTip] = useState(0);

  function handleCustomerBill(val) {
    setCustBill(val);
  }

  function handleMyTip(tip) {
    setMyTip(tip);
  }
  function handleMyFriendTip(tip) {
    setMyFriendTip(tip);
  }

  return (
    <>
      <CustomerBill
        custBill={custBill}
        handleCustomerBill={handleCustomerBill}
      />
      <Tip handleTip={handleMyTip} currentTip={myTip}>
        <span>How did you like the service?</span>
      </Tip>
      <Tip handleTip={handleMyFriendTip} currentTip={friendTip}>
        <span>How did your friend like the service?</span>
      </Tip>
      <Output myTip={myTip} friendTip={friendTip} custBill={custBill}></Output>
      <Reset
        handleMyTip={handleMyTip}
        handleMyFriendTip={handleMyFriendTip}
        handleCustomerBill={handleCustomerBill}
      />
    </>
  );
}

function CustomerBill({ custBill, handleCustomerBill }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        type="text"
        value={custBill}
        onChange={(e) => handleCustomerBill(Number(e.target.value))}
      />
    </div>
  );
}

function Tip({ handleTip, currentTip, children }) {
  return (
    <div>
      {children}
      <select
        value={currentTip}
        onChange={(e) => handleTip(Number(e.target.value))}
      >
        <option value="0">Dissatified(0%)</option>
        <option value="5">It was okay(5%)</option>
        <option value="10">It was good(10%)</option>
        <option value="20">Absolutely Amazing(20%)</option>
      </select>
    </div>
  );
}

function Output({ myTip, friendTip, custBill }) {
  const percentage = ((custBill / 100) * (myTip + friendTip)) / 2;
  return (
    <h3>
      You pay ${percentage + custBill}(${custBill} + ${percentage}tip)
    </h3>
  );
}

function Reset({ handleMyTip, handleMyFriendTip, handleCustomerBill }) {
  function handleReset() {
    handleMyTip(0);
    handleCustomerBill(0);
    handleMyFriendTip(0);
  }
  return <button onClick={handleReset}>Reset</button>;
}
