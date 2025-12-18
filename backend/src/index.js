import express from 'express';

const app = express();

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is healthy' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
