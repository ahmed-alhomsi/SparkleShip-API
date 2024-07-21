require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

//connect DB
const connectDB = require('./db/connect')

//routers
const authRouter = require('./routes/auth')
const scholarshipRouter = require('./routes/scholarships')
const studentsRouter = require('./routes/students')
const GroupsRouter = require('./routes/groups')
const messagesRouter = require('./routes/messages')
const authenticateUser = require('./middleware/authentication')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(xss())
app.use(helmet())
app.use(cors())

// routes
app.use('/api/auth', authRouter)
app.use('/api/scholarships', authenticateUser, scholarshipRouter)
app.use('/api/students', studentsRouter)
app.use('/api/groups', GroupsRouter)
app.use('/api/messages', messagesRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();