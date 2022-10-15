const transactionDB = require('../models/transaction');

exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be emtpy!' });
        return;
    }

    // new transaction
    const transaction = new transactionDB({
        amount: req.body.amount,
        user = req.body.user
        date: Date.now(),
    });

    // save article in the database
    article
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

exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        transactionDB
            .findById(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({ message: 'Not found transaction with id ' + id });
                } else {
                    res.send(data);
                }
            })
            .catch((err) => {
                res
                    .status(500)
                    .send({ message: 'Error retrieving transaction with id ' + id });
            });
    } else {
        transactionDB
            .find()
            .then((transaction) => {
                res.send(transaction);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Error Occurred while retriving transaction information',
                });
            });
    }
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update can not be empty' });
    }

    const id = req.params.id;
    transactionDB
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

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    transactionDB
        .findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
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
