import React, { useState, useEffect, useCallback } from "react";
import NewExpense from "./Newexpenses/NewExpense";
import Expenses from "./Expenses/Expenses";
import Error from "./UI/Error";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // FUNKTSIOON ANDMETE PÄRIMISEKS (GET)
  const fetchExpensesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3001/expenses");
      
      if (!response.ok) {
        throw new Error("Andmete pärimine ebaõnnestus!");
      }

      const data = await response.json();

      // Kuna JSON-is on kuupäev tekst, muudame selle Date objektiks
      const loadedExpenses = data.map((expense) => ({
        ...expense,
        date: new Date(expense.date),
      }));

      setExpenses(loadedExpenses);
    } catch (err) {
      setError({
        title: "Viga laadimisel",
        message: err.message || "Serveriga ei saadud ühendust.",
      });
    }
    setIsLoading(false);
  }, []);

  // Käivitan laadimise kohe, kui äpp avatakse
  useEffect(() => {
    fetchExpensesHandler();
  }, [fetchExpensesHandler]);

  // 2. FUNKTSIOON UUE KULU LISAMISEKS (POST)
  const addExpenseHandler = async (expense) => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3001/expenses", {
        method: "POST",
        body: JSON.stringify(expense),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Kulu salvestamine serverisse ebaõnnestus!");
      }

      // Kui serveris salvestamine õnnestus, uuendame vaadet
      setExpenses((prevExpenses) => [
        { ...expense, date: new Date(expense.date) },
        ...prevExpenses,
      ]);
    } catch (err) {
      setError({
        title: "Salvestamise viga",
        message: err.message,
      });
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && (
        <Error
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      
      <NewExpense onAddExpense={addExpenseHandler} />
      
      {isLoading && <p style={{ textAlign: "center", color: "white" }}>Laadin andmeid...</p>}
      
      {!isLoading && <Expenses items={expenses} />}
    </div>
  );
}

export default App;