import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import { useState } from "react";

function ExpenseItem(props) {
  const [title, setTitle] = useState(props.expenseData.title);

  const clickHandler = () => {
    setTitle("Updated!"); 
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.expenseData.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">{props.expenseData.price}€</div>
      </div>
      <button onClick={clickHandler}>Update!</button>
    </Card>
  );
}

export default ExpenseItem;