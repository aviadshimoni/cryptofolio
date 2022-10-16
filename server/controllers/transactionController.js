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
        userId: req.body.userId,
        coinId: req.body.coinId,
        date: req.body.date,
    });

    // save article in the database
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
    const id =  req.params.id;
    console.log(`id : ${typeof(id)}`);
    transactionDB
        .findById(id)
        .then((transaction) => {
            if (!transaction) {
                res.status(404).send({ message: 'Not found transaction with id ' + id });
            } else {
                res.send(transaction);
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({ message: 'Error retrieving transaction with id ' + id });
        });
};

exports.get = (req, res) => {
    const query =  req.query;
    if(Object.keys(query).length === 0){
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
    else{
        let parsedQuery={}
        const userId = query.userId
        console.log(`${userId}`)
        const coinId = query.coinId
        let fromDate = query.fromDate
        let toDate = query.toDate
        if(userId){
            parsedQuery["userId"]=userId
        }
        if(coinId){
            parsedQuery["coinId"]=coinId
        }
        if(fromDate){
            let [dateValues, timeValues] = fromDate.split(' ');
            let [month, day, year] = dateValues.split('/');
            let [hours, minutes, seconds] = timeValues.split(':');
            fromDate = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
            parsedQuery["date"]={$gt: fromDate}
        }
        if(toDate){
            let [dateValues, timeValues] = toDate.split(' ');
            let [month, day, year] = dateValues.split('/');
            let [hours, minutes, seconds] = timeValues.split(':');
            toDate = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
            parsedQuery["date"]={$lt: toDate}
        }

        console.log(`searching transactions: ${JSON.stringify(parsedQuery)}`)

        transactionDB
    .find(parsedQuery)
        .then((transaction) => {
            if (!transaction) {
                res.status(404).send({ message: 'Not found transaction with id' });
            } else {
                res.send(transaction);
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({ message: 'Error retrieving transaction with id '});
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

//// Delete a user with specified user id in the request
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
