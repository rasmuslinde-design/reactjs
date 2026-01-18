import "../src/App.css";
import NewExpense from "./Newexpenses/NewExpense";
import Expenses from "./Expenses/Expenses";

function App() {
  const expenses = [
    { id: 'e1', date: new Date(2023, 0, 10), title: 'Pitsa', price: 12.99 },
    { id: 'e2', date: new Date(2023, 0, 5), title: 'Kartul', price: 3.99 },
    { id: 'e3', date: new Date(2023, 0, 1), title: 'Soda', price: 1.99 }
  ];

  const addExpenseHandler = (expense) => {
    console.log("Uus kulu:", expense);
  };

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;