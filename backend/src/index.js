import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  credentials: true,
  origin : 'http://localhost:5173'
}))

app.use(express.static('public'))

const payload = {
  name : "Sanjay Gehlot",
  github : "https://github.com/Sanjaygehlot1",
  linkedin : "https://www.linkedin.com/in/sanjay-gehlot-62b7a0301/",
  email : "sanjaygehlot1695@gmail.com",
  interest : ["Coding", "Gaming", "Movies"] 
} 

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is healthy' });
});

app.get('/data', (req, res) => {
  res.json(payload);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
