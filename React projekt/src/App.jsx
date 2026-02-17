import React, { useState, useEffect, useCallback, Fragment, useContext } from "react";
import NewExpense from "./Newexpenses/NewExpense";
import Expenses from "./Expenses/Expenses";
import Error from "./UI/Error";
import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/Mainheader";
import AuthContext from "./store/auth-context";
import ThemeContext from "./store/theme-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const themeCtx = useContext(ThemeContext);

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
      if (!response.ok) throw new Error("Andmete pärimine ebaõnnestus!");
      const data = await response.json();
      const loadedExpenses = data.map((expense) => ({
        ...expense,
        date: new Date(expense.date),
      }));
      setExpenses(loadedExpenses);
    } catch (err) {
      setError({ title: "Viga laadimisel", message: err.message });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchExpensesHandler();
  }, [isLoggedIn, fetchExpensesHandler]);

  const loginHandler = () => {
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
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Salvestamine ebaõnnestus!");
      setExpenses((prevExpenses) => [
        { ...expense, date: new Date(expense.date) },
        ...prevExpenses,
      ]);
    } catch (err) {
      setError({ title: "Salvestamise viga", message: err.message });
    }
  };

  const errorHandler = () => setError(null);

  const loadingTextColor = themeCtx.theme === "dark" ? "#e0e0e0" : "#333333";

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}>
      <div className={themeCtx.theme} style={{ minHeight: '100vh', transition: 'all 0.3s ease' }}>
        <MainHeader />
        <main style={{ paddingBottom: '2rem' }}>
          {error && <Error title={error.title} message={error.message} onConfirm={errorHandler} />}
          
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          
          {isLoggedIn && (
            <Fragment>
              <NewExpense onAddExpense={addExpenseHandler} />
              {isLoading && (
                <p style={{ textAlign: "center", color: loadingTextColor, marginTop: '2rem' }}>
                  Laadin andmeid...
                </p>
              )}
              {!isLoading && <Expenses items={expenses} />}
            </Fragment>
          )}
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;