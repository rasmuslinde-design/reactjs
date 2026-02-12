import React, { useState, useRef, Fragment } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Error from "../UI/Error";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  // useRef konksud andmete lugemiseks otse sisendväljadest
  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  // useState veateadete haldamiseks
  const [error, setError] = useState();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredAmount = amountInputRef.current.value;
    const enteredDate = dateInputRef.current.value;

    // 1. Kontroll, et väljad poleks tühjad
    if (
      enteredTitle.trim().length === 0 ||
      enteredAmount.trim().length === 0 ||
      enteredDate.trim().length === 0
    ) {
      setError({
        title: "Vigane sisestus",
        message: "Palun täida kõik väljad!",
      });
      return;
    }

    // 2. Kontroll, et summa oleks positiivne
    if (+enteredAmount < 0.01) {
      setError({
        title: "Vigane summa",
        message: "Summa peab olema suurem kui 0!",
      });
      return;
    }

    // 3. Andmete ettevalmistamine backendile (JSON-sõbralik formaat)
    // Muudame kuupäeva tekstiks (YYYY-MM-DD), et see sobiks JSON faili
    const expenseData = {
      title: enteredTitle,
      price: +enteredAmount,
      date: new Date(enteredDate).toISOString().split("T")[0],
    };

    // Saadame andmed üles NewExpense -> App.jsx poole
    props.onSaveExpenseData(expenseData);

    // Tühjendame väljad
    titleInputRef.current.value = "";
    amountInputRef.current.value = "";
    dateInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <Error
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Kulu nimetus</label>
            <input type="text" ref={titleInputRef} />
          </div>
          <div className="new-expense__control">
            <label>Summa</label>
            <input type="number" step="0.01" ref={amountInputRef} />
          </div>
          <div className="new-expense__control">
            <label>Kuupäev</label>
            <input type="date" ref={dateInputRef} />
          </div>
        </div>
        <div className="new-expense__actions">
          {/* props.onCancel lubab vormi sulgeda, kui see on vastavalt seadistatud */}
          <button type="button" onClick={props.onCancel}>
            Tühista
          </button>
          <button type="submit">Lisa kulu</button>
        </div>
      </form>
    </Fragment>
  );
};

export default ExpenseForm;