import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
// import './NewExpense.css';

const NewExpense = (props) => {
  // Vihje 1? editForm olek (isEditing)
  const [isEditing, setIsEditing] = useState(false);

  // vormi avamine
  const startEditingHandler = () => {
    setIsEditing(true);
    console.log("form edit open");
  };

  // cancel nupp
  const stopEditingHandler = () => {
    setIsEditing(false);
    console.log("form edit close");
  };

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    
    // app.jsx saab andmed
    props.onAddExpense(expenseData);
    
    // Vihje 4? Pane vorm kinni pärast lisamist
    setIsEditing(false);
    console.log("form edit close");
  };

  return (
    <div className='new-expense'>
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}
      
      {isEditing && (
        <ExpenseForm 
          onSaveExpenseData={saveExpenseDataHandler} 
          onCancel={stopEditingHandler} 
        />
      )}
    </div>
  );
};

export default NewExpense;