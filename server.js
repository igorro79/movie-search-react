const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const { errorHandler } = require('./middleware/asyncWrapper');
const authRoutes = require('./routes/authRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose
      .connect(process.env.MONGO_DB)
      .then(console.log('database connected successfuly'))
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
// app.use('/api/auth', authRoutes);

app.use(errorHandler);

// app.get('/api/news', (req, res) => {
//   const articles = [
//     { id: 1, title: 'aricle title1', text: 'text for article1 eeeeeeeeeeeeee' },
//     { id: 2, title: 'aricle title2', text: 'text for article2 wwwwwwwwwwwwww' },
//     { id: 3, title: 'aricle title3', text: 'text for article3 qqqqqqqqqqqqqq' },
//   ];
//   res.json(articles);
// });
