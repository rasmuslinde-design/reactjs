import express from 'express';
import fs from 'node:fs/promises';
import cors from 'cors';

const app = express();

app.use(cors()); // Lubab Reactil päringuid teha
app.use(express.json()); // Lubab lugeda JSON andmeid päringust

// GET päring - andmete saatmine Reactile
app.get('/expenses', async (req, res) => {
  const fileContent = await fs.readFile('./data/expenses.json', 'utf-8');
  const expensesData = JSON.parse(fileContent);
  res.status(200).json(expensesData);
});

// POST päring - uue kulu vastuvõtmine ja salvestamine
app.post('/expenses', async (req, res) => {
  const newExpense = req.body;
  const fileContent = await fs.readFile('./data/expenses.json', 'utf-8');
  const expensesData = JSON.parse(fileContent);
  
  expensesData.push(newExpense);
  
  await fs.writeFile('./data/expenses.json', JSON.stringify(expensesData));
  res.status(201).json({ message: 'Kulu lisatud!' });
});

app.listen(3001, () => {
  console.log('Server jookseb pordil 3001');
});