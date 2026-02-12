import React, { useState, useEffect } from 'react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import './Login.css';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className="login">
      <form onSubmit={submitHandler}>
        <div className="control">
          <label>E-mail</label>
          <input type="email" onChange={(e) => setEnteredEmail(e.target.value)} />
        </div>
        <div className="control">
          <label>Parool</label>
          <input type="password" onChange={(e) => setEnteredPassword(e.target.value)} />
        </div>
        <div className="actions">
          <Button type="submit" disabled={!formIsValid}>Logi sisse</Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;