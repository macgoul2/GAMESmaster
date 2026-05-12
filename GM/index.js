require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connexion DB
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Erreur connexion DB:', err);
    return;
  }
  console.log('✅ Connecté à MySQL');
});

// ========================
// ROUTES PRODUITS ⭐ NOUVEAU
// ========================

// GET tous les produits
app.get('/api/produits', (req, res) => {
  db.query('SELECT * FROM produits', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST ajouter un produit
app.post('/api/produits', (req, res) => {
  const { nom, description, prix, stock, categorie, image } = req.body;
  db.query(
    'INSERT INTO produits (nom, description, prix, stock, categorie, image) VALUES (?, ?, ?, ?, ?, ?)',
    [nom, description, prix, stock, categorie, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, message: '✅ Produit ajouté' });
    }
  );
});

// PUT modifier un produit
app.put('/api/produits/:id', (req, res) => {
  const { nom, description, prix, stock, categorie, image } = req.body;
  db.query(
    'UPDATE produits SET nom=?, description=?, prix=?, stock=?, categorie=?, image=? WHERE id=?',
    [nom, description, prix, stock, categorie, image, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// DELETE supprimer un produit
app.delete('/api/produits/:id', (req, res) => {
  db.query('DELETE FROM produits WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// ========================
// ROUTES GROUPES
// ========================

// GET tous les groupes
app.get('/api/groups', (req, res) => {
  db.query('SELECT * FROM groups_gm', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST créer un groupe
app.post('/api/groups', (req, res) => {
  const { id, name, type, status, gold, blueGold, missions, locations } = req.body;
  db.query(
    'INSERT INTO groups_gm VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, name, type, status, gold, blueGold, missions, locations],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// PUT modifier un groupe
app.put('/api/groups/:id', (req, res) => {
  const { name, type, status, gold, blueGold, missions, locations } = req.body;
  db.query(
    'UPDATE groups_gm SET name=?, type=?, status=?, gold=?, blueGold=?, missions=?, locations=? WHERE id=?',
    [name, type, status, gold, blueGold, missions, locations, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// DELETE supprimer un groupe
app.delete('/api/groups/:id', (req, res) => {
  db.query('DELETE FROM groups_gm WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// ========================
// ROUTES NOTES
// ========================

app.get('/api/notes', (req, res) => {
  db.query('SELECT * FROM notes', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/notes', (req, res) => {
  const { id, groupId, text, date } = req.body;
  db.query(
    'INSERT INTO notes VALUES (?, ?, ?, ?)',
    [id, groupId, text, date],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.delete('/api/notes/:id', (req, res) => {
  db.query('DELETE FROM notes WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// ========================
// ROUTES GIVES
// ========================

app.get('/api/gives', (req, res) => {
  db.query('SELECT * FROM gives', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/gives', (req, res) => {
  const { id, groupId, amount, reason, status, date } = req.body;
  db.query(
    'INSERT INTO gives VALUES (?, ?, ?, ?, ?, ?)',
    [id, groupId, amount, reason, status, date],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.put('/api/gives/:id', (req, res) => {
  const { status } = req.body;
  db.query(
    'UPDATE gives SET status=? WHERE id=?',
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// ========================
// ROUTES REVS
// ========================

app.get('/api/revs', (req, res) => {
  db.query('SELECT * FROM revs', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/revs', (req, res) => {
  const { id, groupId, title, content, date } = req.body;
  db.query(
    'INSERT INTO revs VALUES (?, ?, ?, ?, ?)',
    [id, groupId, title, content, date],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.delete('/api/revs/:id', (req, res) => {
  db.query('DELETE FROM revs WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// ========================
// ROUTE LOGIN ADMIN
// ========================

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Identifiants incorrects' });
  }
});

// ========================
// START SERVEUR
// ========================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
