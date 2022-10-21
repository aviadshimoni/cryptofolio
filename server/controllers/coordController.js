const coordModel = require('../models/coord');

exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be emtpy!' });
    return;
  }

  // new coord
  const coord = new coordModel({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });

  // save article in the database
  coord
    .save(coord)
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

exports.getId = (req, res) => {
  const id = req.params.id;
  coordModel
    .findById(id)
    .then((coord) => {
      if (!coord) {
        res.status(404).send({ message: 'Not found coord with id ' + id });
      } else {
        res.send(coord);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error retrieving coord with id ' + id });
    });
};

exports.get = (req, res) => {
  const query = req.query;
  if (Object.keys(query).length === 0) {
    coordModel
      .find()
      .then((coord) => {
        res.send(coord);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Error Occurred while retriving coord information',
        });
      });
  } else {
    let parsedQuery = {};
    const name = query.name;
    const shortName = query.shortName;
    if (name) {
      parsedQuery['name'] = name;
    }
    if (shortName) {
      parsedQuery['shortName'] = shortName;
    }

    console.log(`searching coords: ${JSON.stringify(parsedQuery)}`);

    coordModel
      .find(parsedQuery)
      .then((coord) => {
        if (!coord) {
          res
            .status(404)
            .send({ message: 'Not found coords with the following query' });
        } else {
          res.send(coord);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message: 'Error retrieving coords with the following query',
          });
      });
  }
};
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Data to update can not be empty' });
  }

  const id = req.params.id;
  coordModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update coord with ${id}. Maybe transaction not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error Update coord information' });
    });
};

//// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  coordModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete coord with id ${id}. Maybe id is wrong`,
        });
      } else {
        res.send({
          message: 'transaction was coord successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete coord with id=' + id,
      });
    });
};
