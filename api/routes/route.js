const express = require('express');
const db = require('../../data/dbConfig');
const router = express.Router();

router.get('/', (req, res) => {
  db.select('*')
    .from('accounts')
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  db('accounts')
    // or .where({id: id})
    // or .where({id: req.params.id})
    .where('id', id)
    .first()
    .then((account) => {
      res.status(200).json({ data: account });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  db('accounts')
    .insert(req.body)
    .then((ids) => {
      const id = ids[0];
      db('accounts')
        .where({ id })
        .first()
        .then((account) => {
          res.status(201).json({
            data: account,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('accounts')
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        db('accounts')
          .where('id', id)
          .first()
          .then((account) => {
            res
              .status(200)
              .json({ message: 'Update successful', data: account });
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      } else {
        res
          .status(404)
          .json({ message: 'There are no accounts with that ID.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db('accounts')
    .where('id', id)
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: 'Successfully deleted account.' });
      } else {
        res.status(404).json({
          message: 'There are no accounts with the ID. Unable to delete.',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
