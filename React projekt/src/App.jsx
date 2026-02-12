import React, { useState, useEffect, useCallback, Fragment } from "react";
import NewExpense from "./Newexpenses/NewExpense";
import Expenses from "./Expenses/Expenses";
import Error from "./UI/Error";
import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/Mainheader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. KONTROLLIME LOCALSTORAGE-IT (Käivitub üks kord äpi alguses)
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  // 2. FUNKTSIOON ANDMETE PÄRIMISEKS (GET)
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

  // Käivitame kulude laadimise ainult siis, kui kasutaja on sisse logitud
  useEffect(() => {
    if (isLoggedIn) {
      fetchExpensesHandler();
    }
  }, [isLoggedIn, fetchExpensesHandler]);

  // 3. LOGIMISE JA VÄLJALOGIMISE HALDUS
  const loginHandler = (email, password) => {
    // Salvestame brauserisse märke, et oleme sees
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    // Kustutame märke ja suuname sisselogimise ekraanile
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  // 4. KULU LISAMISE HALDUS (POST)
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
      {/* MainHeader peab saama isAuthenticated propsi, et Navigation teaks nuppe näidata */}
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      
      <main>
        {error && (
          <Error
            title={error.title}
            message={error.message}
            onConfirm={errorHandler}
          />
        )}

        {/* Kui pole sisse logitud, näita Login vormi (nüüd useReduceriga) */}
        {!isLoggedIn && <Login onLogin={loginHandler} />}

        {/* Kui on sisse logitud, näita äpi põhiosa */}
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