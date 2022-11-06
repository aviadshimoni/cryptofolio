const transactionModel = require('../models/transaction');
const mongoose = require('mongoose');
const coinService = require('../services/coin_service');

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be emtpy!' });
    return;
  }

  const transaction = new transactionModel({
    amount: req.body.amount,
    userEmail: req.body.userEmail,
    // userEmail: req.oidc.user.email,
    coinId: req.body.coinId,
    date: req.body?.date,
  });
  transaction
    .save(transaction)
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
  transactionModel
    .findById(id)
    .then((transaction) => {
      if (!transaction) {
        res
          .status(404)
          .send({ message: 'Not found transaction with id ' + id });
      } else {
        res.send(transaction);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          'Error retrieving transaction with id ' + id + '\nError: ' + err,
      });
    });
};

exports.get = (req, res) => {
  const query = req.query;
  if (Object.keys(query).length === 0) {
    transactionModel
      .find()
      .then((transaction) => {
        res.send(transaction);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            'Error Occurred while retriving transaction information',
        });
      });
  } else {
    let parsedQuery = {};
    const userEmail = query.userEmail;
    const coinId = query.coinId;
    let fromDate = query.fromDate;
    let toDate = query.toDate;
    if (userEmail) {
      parsedQuery['userEmail'] = userEmail;
    }
    if (coinId) {
      parsedQuery['coinId'] = coinId;
    }
    if (fromDate) {
      let [dateValues, timeValues] = fromDate.split(' ');
      let [month, day, year] = dateValues.split('/');
      let [hours, minutes, seconds] = timeValues.split(':');
      fromDate = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
      parsedQuery['date'] = { $gt: fromDate };
    }
    if (toDate) {
      let [dateValues, timeValues] = toDate.split(' ');
      let [month, day, year] = dateValues.split('/');
      let [hours, minutes, seconds] = timeValues.split(':');
      toDate = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
      parsedQuery['date'] = { $lt: toDate };
    }

    console.log(`searching transactions: ${JSON.stringify(parsedQuery)}`);

    transactionModel
      .find(parsedQuery)
      .then((transaction) => {
        if (!transaction) {
          res.status(404).send({
            message: 'Not found transaction with the following query',
          });
        } else {
          res.send(transaction);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving transaction with the following query',
        });
      });
  }
};
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Data to update can not be empty' });
  }

  const id = req.params.id;
  transactionModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update transaction with ${id}. Maybe transaction not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error Update transaction information' });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  transactionModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete transaction with id ${id}. Maybe id is wrong`,
        });
      } else {
        res.send({
          message: 'transaction was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete transaction with id=' + id,
      });
    });
};

exports.balance = (req, res) => {
  const query = req.query;
  if (Object.keys(query).length === 0) {
    res.status(500).send('empty email');
  } else {
    const userEmail = query.userEmail;
    transactionModel
      .aggregate([
        {
          $match: { userEmail },
        },
        {
          $group: {
            _id: '$coinId',
            amount: { $sum: '$amount' },
          },
        },
        {
          $lookup: {
            from: 'coins',
            localField: '_id',
            foreignField: '_id',
            as: 'coin',
          },
        },
      ])
      .then((transaction) => {
        if (!transaction) {
          res.status(404).send({
            message: 'Not found transaction with the following query',
          });
        } else {
          res.send(transaction);
        }
      });
  }
};