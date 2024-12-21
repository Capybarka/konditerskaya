import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';
// const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cors()); // Разрешаем все источники (временно, для разработки)

// подключение к бд
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bakery'
});

db.connect(err => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ', err);
    return;
  }
  console.log('Подключено к базе данных MySQL');
});

app.get('/', (req, res) => {
  res.send('Сервер работает! Вы можете обращаться к /api/products для получения данных.');
});

app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM Products';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при запросе данных:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    res.json(results);  // Отправляем результат в формате JSON
  });
});

// Запуск сервера
const port = 8080
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})