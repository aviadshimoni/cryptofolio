let user = require('../models/user');

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be emtpy!' });
    return;
  }

  const newUser = new user({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    password: req.body.password,
    phone: req.body.phone,
    birthdate: req.body.birthdate,
    balance: req.body.balance,
  });

  newUser
  .save(newUser)
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
  const id =  req.params.id;
  user
  .findById(id)
  .then((data) => {
      if (!data) {
          res.status(404).send({ message: 'Not found user with id ' + id });
      } else {
          res.send(data);
      }
  })
  .catch((err) => {
      res
          .status(500)
          .send({ message: 'Error retrieving user with id ' + id });
  });
};

exports.get = (req, res) => {
  const query =  req.query;
  if(Object.keys(query).length === 0){
    user
    .find()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message || 'Error Occurred while retriving user information',
        });
    });
  }
  else{
    let parsedQuery={}
    const name = query.name
    const email = query.email
    const phone = query.phone
    const birthdate = query.birthdate
    if(name){
        parsedQuery["name"]=name
    }
    if(email){
      parsedQuery["email"]=email
    }
    if(phone){
      parsedQuery["phone"]=phone
    }
    if(birthdate){
      parsedQuery["birthdate"]=birthdate
    }

    console.log(`searching users: ${JSON.stringify(parsedQuery)}`)

    user
    .find(parsedQuery)
    .then((data) => {
        if (!data) {
            res.status(404).send({ message: 'Not found user with the following query' });
        } else {
            res.send(data);
        }
    })
    .catch((err) => {
        res
            .status(500)
            .send({ message: 'Error retrieving user with the following query'});
    });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
      return res.status(400).send({ message: 'Data to update can not be empty' });
  }

  const id = req.params.id;
  user
  .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then((data) => {
      if (!data) {
          res.status(404).send({
              message: `Cannot Update user with ${id}. Maybe transaction not found!`,
          });
      } else {
          res.send(data);
      }
  })
  .catch((err) => {
      res.status(500).send({ message: 'Error Update user information' });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  user
  .findByIdAndDelete(id)
  .then((data) => {
      if (!data) {
          res
              .status(404)
              .send({ message: `Cannot Delete user with id ${id}. Maybe id is wrong` });
      } else {
          res.send({
              message: 'user was deleted successfully!',
          });
      }
  })
  .catch((err) => {
      res.status(500).send({
          message: 'Could not delete user with id=' + id,
      });
  });
};
