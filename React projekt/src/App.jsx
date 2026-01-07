import "./Expenses/Expenses";
import './App.css';
import ExpenseItem from "./ExpenseItem";

function App() {
    const expenses = [
        {
            date: new Date(2023, 0, 10),
            title:'Pitsa',
            price: 12.99
        },
        {
            date: new Date(2023, 0, 5),
            title:'Kartul',
            price: 3.99
        },
        {
            date: new Date(2023, 0, 1),
            title:'Soda',
            price: 1.99
        }
    ]

  return (
    <div className="App">
      <ExpenseItem expenseData={expenses[0]}></ExpenseItem>
      <ExpenseItem expenseData={expenses[1]}></ExpenseItem>
      <ExpenseItem expenseData={expenses[2]}></ExpenseItem>
    </div>
  );
}

export default App;