const articleDB = require('../models/article');

exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be emtpy!' });
    return;
  }

  // new article
  const article = new articleDB({
    title: req.query.title,
    body: req.query.body,
    postedBy: req.query.postedBy,
  });

  // save article in the database
  article
    .save(article)
    .then((data) => {
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating a create operation',
      });
    });
};

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    articleDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: 'Not found article with id ' + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: 'Erro retrieving article with id ' + id });
      });
  } else {
    articleDB
      .find()
      .then((article) => {
        res.send(article);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Error Occurred while retriving article information',
        });
      });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Data to update can not be empty' });
  }

  const id = req.params.id;
  articleDB
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update article with ${id}. Maybe article not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error Update article information' });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  articleDB
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: 'article was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete article with id=' + id,
      });
    });
};
