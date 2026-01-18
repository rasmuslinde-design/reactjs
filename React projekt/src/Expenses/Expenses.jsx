import React, { useState } from 'react';
import ExpenseItem from '../components/ExpenseItem'; 
import ExpensesFilter from '../Expenses/ExpensesFilter'; 
import Card from '../UI/Card'; 
import '../Expenses/ExpensesFilter';

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2023');

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <Card className="expenses">
      <ExpensesFilter 
        selected={filteredYear} 
        onChangeFilter={filterChangeHandler} 
      />
      {props.items.map((item) => (
        <ExpenseItem key={item.id || Math.random()} expenseData={item} />
      ))}
    </Card>
  );
};

export default Expenses;