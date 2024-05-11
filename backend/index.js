// index.js
import express from 'express';
import cors from 'cors';
import authService from './authService';

const app = express();
const PORT = 3001; // Port for backend server

// Enable CORS
app.use(cors());

// Use authService for authentication routes
app.use('/', authService);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
