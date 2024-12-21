import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cors()); // Разрешаем все источники (временно, для разработки)

// Получаем путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Устанавливаем хранилище для файлов с помощью Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');  // Путь к папке uploads
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Если папки нет, создаем её
    }
    cb(null, uploadPath); // Указываем папку для хранения файлов
  },
  filename: (req, file, cb) => {
    // Генерируем уникальное имя файла
    cb(null, Date.now() + path.extname(file.originalname))
  },
});

const upload = multer({ storage: storage })

// Маршрут для добавления нового товара с изображением
app.post('/api/products', upload.single('image'), (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.category_id || 
    !req.body.price || !req.body.weight || !req.file) {
    console.error('Ошибка: Не все поля заполнены или файл не выбран');
    return res.status(400).send('Не все поля заполнены или файл не выбран');
  }

  // Получаем путь к изображению
  const imageUrl = '/uploads/' + req.file.filename;  // Этот путь используется для сохранения в базе данных

  // Добавляем товар в базу данных
  const { name, description, category_id, price, weight } = req.body;

  const query = 'INSERT INTO products (name, description, category_id, price, weight, image_url) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, description, Number(category_id), Number(price), Number(weight), imageUrl], (err, result) => {
    if (err) {
      console.error('Ошибка при добавлении товара:', err);
      return res.status(500).send('Ошибка при добавлении товара');
    }
    res.status(200).json({ message: 'Товар успешно добавлен', productId: result.insertId });
  });
});

// получение товара по id
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error('Ошибка при запросе товара:', err);
      return res.status(500).send('Ошибка при запросе товара');
    }
    if (result.length === 0) {
      return res.status(404).send('Товар не найден');
    }
    res.json(result[0]); // Возвращаем данные о продукте
  });
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

