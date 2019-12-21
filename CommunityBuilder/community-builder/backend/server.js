const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const communityRouter = require('./routes/community');
const userRouter = require('./routes/users');
const dataTypeRouter = require('./routes/dataType');

app.use('/community', communityRouter);
app.use('/users', userRouter);
app.use('/dataType', dataTypeRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});