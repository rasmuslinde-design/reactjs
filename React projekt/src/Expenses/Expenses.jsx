import React, { useState } from "react";
import ExpenseItem from "../components/ExpenseItem";
import ExpensesFilter from "../Expenses/ExpensesFilter";
import Card from "../UI/Card";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2023");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
    console.log("Valitud aasta:", selectedYear);
  };

  // Uus massiiv valitud aastateks
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />

      {filteredExpenses.length === 0 ? (
        <p style={{ color: "white", textAlign: "center" }}>
          Sellel aastal kulusid ei leitud.
        </p>
      ) : (
        filteredExpenses.map((item) => (
          <ExpenseItem key={item.id} expenseData={item} />
        ))
      )}
    </Card>
  );
};

export default Expenses;
