import React, { useState, useEffect, useCallback, Fragment } from "react";
import NewExpense from "./Newexpenses/NewExpense";
import Expenses from "./Expenses/Expenses";
import Error from "./UI/Error";
import Login from "./components/Login/Login";
import MainHeader from "../src/components/MainHeader/Mainheader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  
  const fetchExpensesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3001/expenses");
      if (!response.ok) {
        throw new Error("Andmete pärimine ebaõnnestus!");
      }
      const data = await response.json();
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

  useEffect(() => {
    if (isLoggedIn) {
      fetchExpensesHandler();
    }
  }, [isLoggedIn, fetchExpensesHandler]);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

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
    <Fragment>
      {/* Päis on alati olemas, aga sisu muutub isLoggedIn põhjal */}
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      
      <main>
        {error && (
          <Error
            title={error.title}
            message={error.message}
            onConfirm={errorHandler}
          />
        )}

        {!isLoggedIn && <Login onLogin={loginHandler} />}

        {isLoggedIn && (
          <Fragment>
            <NewExpense onAddExpense={addExpenseHandler} />
            {isLoading && <p style={{ textAlign: "center", color: "white" }}>Laadin andmeid...</p>}
            {!isLoading && <Expenses items={expenses} />}
          </Fragment>
        )}
      </main>
    </Fragment>
  );
}

export default App;