import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { type } from 'os';

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

// Маршрут для добавления нового товара 
app.post('/api/products', upload.single('image'), (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.category_id || 
    !req.body.price || !req.body.weight || !req.file || !req.body.quantity) {
    console.error('Ошибка: Не все поля заполнены или файл не выбран');
    return res.status(400).send('Не все поля заполнены или файл не выбран');
  }

  // Получаем путь к изображению
  const imageUrl = '/uploads/' + req.file.filename;  // Этот путь используется для сохранения в базе данных

  // Добавляем товар в базу данных
  const { name, description, category_id, price, weight, quantity } = req.body;

  const query = 'INSERT INTO products (name, description, category_id, price, weight, quantity, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, description, Number(category_id), Number(price), Number(weight), Number(quantity), imageUrl], (err, result) => {
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

// Маршрут для обновления товара
app.put('/api/products/:id', upload.single('image'), (req, res) => {
  const productId = req.params.id;

  const { name, description, category_id, price, weight, quantity } = req.body;

  // Формируем новый путь к изображению, если оно передано
  let imageUrl = req.body.image_url; // Если новое изображение не загружено, используем старое
  
  if (req.file) {
    imageUrl = '/uploads/' + req.file.filename; // Если изображение загружено, обновляем путь
  }

  // Обновляем данные в базе данных
  const query = 'UPDATE products SET name = ?, description = ?, category_id = ?, price = ?, weight = ?, quantity = ?, image_url = ? WHERE id = ?';
  db.query(query, [name, description, category_id, price, weight, quantity, imageUrl, productId], (err, result) => {
    if (err) {
      console.error('Ошибка при обновлении товара:', err);
      return res.status(500).send('Ошибка при обновлении товара');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Товар не найден');
    }
    res.status(200).json({ message: 'Товар успешно обновлен'});
  });
});

app.get('/', (req, res) => {
  res.send('Сервер работает! Вы можете обращаться к /api/products для получения данных.');
});


// получениех всех товаров
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при запросе данных:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    res.json(results);  // Отправляем результат в формате JSON
  });
});

// найти товары по названию
app.get('/api/productsOfName', (req, res) => {
  const { name } = req.query; // Получаем название товара из параметров запроса

  if (!name) {
    return res.status(400).json({ error: 'Название товара не указано' });
  }

  const query = 'SELECT * FROM products WHERE name LIKE ?';
  const searchPattern = `%${name}%`; // Создаем шаблон для поиска

  db.query(query, [searchPattern], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Товары с указанным названием не найдены' });
    }

    res.status(200).json(results);
  });
});


// Маршрут для удаления товара
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  const query = 'DELETE FROM products WHERE id = ?';

  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error('Ошибка при удалении товара:', err);
      return res.status(500).send('Ошибка при удалении товара');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Товар не найден');
    }

    res.status(200).json({ message: 'Товар успешно удален' });
  });
});


// Маршрут для авторизации администратора
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM admins WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err);
      return res.status(500).send({ success: false, message: 'Ошибка сервера' });
    }

    if (results.length === 0) {
      return res.status(401).send({ success: false, message: 'Неверный email или пароль' });
    }

    const admin = results[0];
  
    // Сравнение пароля 
    if (admin.password === password) {
      res.send({ success: true });
    } else {
      res.status(401).send({ success: false, message: 'Неверный email или пароль' });
    }
  });
});


// POST запрос на регистрацию администратора
app.post('/api/register', (req, res) => {
  const { name, last_name, middle_name, email, password } = req.body;

   // Проверка на существующего администратора по email
   db.query('SELECT * FROM admins WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Ошибка при проверке email:', err);
      return res.status(500).json({ error: 'Ошибка при проверке email' });
    }
    
    if (results.length > 0) {
      return res.status(400).json({ error: 'Администратор с таким email уже существует' });
    }

    // Вставка нового администратора в базу данных
    const query = 'INSERT INTO admins (name, last_name, middle_name, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, last_name, middle_name, email, password], (err, results) => {
      if (err) {
        console.error('Ошибка при добавлении администратора:', err);
        return res.status(500).json({ error: 'Ошибка при сохранении администратора в базе данных' });
      }

      res.status(201).json({
        message: 'Администратор успешно зарегистрирован',
        admin: { id: results.insertId, name, last_name, middle_name, email },
      });
    });
  });
});



// получениех всех админов
app.get('/api/admins', (req, res) => {
  const query = 'SELECT * FROM admins';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при запросе данных:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    res.json(results);  
  });
});

// Удаление администратора по ID
app.delete('/api/admins', (req, res) => {
  const { id } = req.body; // Получаем ID из тела запроса

  if (!id) {
    return res.status(400).json({ error: 'Не указан ID администратора' });
  }

  const query = 'DELETE FROM admins WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Ошибка при удалении администратора:', err);
      return res.status(500).json({ error: 'Ошибка при удалении администратора' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Администратор с указанным ID не найден' });
    }

    res.status(200).json({ message: `Администратор с ID ${id} успешно удален` });
  });
});

// Запуск сервера
const port = 8080
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})

