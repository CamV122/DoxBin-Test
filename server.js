const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.'));

let posts = [];
let messages = [];

if (fs.existsSync('posts.json')) posts = JSON.parse(fs.readFileSync('posts.json'));
if (fs.existsSync('messages.json')) messages = JSON.parse(fs.readFileSync('messages.json'));

app.get('/posts', (req, res) => res.json(posts));
app.post('/posts', (req, res) => {
  const { user, text } = req.body;
  if (user && text) {
    posts.push({ user, text });
    fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2));
  }
  res.sendStatus(200);
});

app.get('/messages', (req, res) => res.json(messages));
app.post('/messages', (req, res) => {
  const { from, to, text } = req.body;
  if (from && to && text) {
    messages.push({ from, to, text });
    fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));
  }
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`🟢 Server running at http://localhost:${PORT}`));
