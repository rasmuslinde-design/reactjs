import React, { useState } from "react";
import "./App.css";
import NewExpense from "./Newexpenses/NewExpense";
import Expenses from "./Expenses/Expenses";

const DUMMY_EXPENSES = [
  { id: 'e1', date: new Date(2023, 0, 10), title: 'Pitsa', price: 12.99 },
  { id: 'e2', date: new Date(2024, 5, 5), title: 'Kartul', price: 3.99 },
  { id: 'e3', date: new Date(2025, 11, 1), title: 'Soda', price: 1.99 },
  { id: 'e4', date: new Date(2023, 8, 15), title: 'Kino', price: 9.50 }
];

function App() {
  // useState
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
    console.log("Uus kulu lisatud:", expense);
  };

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;