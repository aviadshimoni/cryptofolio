const coinsDB = require('../models/coin');

exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be emtpy!' });
        return;
    }

    // new coin
    const coin = new coinsDB({
        name: req.body.name,
        shortName: req.body.shortName
    });

    // save article in the database
    coin
    .save(coin)
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
    coinsDB
    .findById(id)
    .then((coin) => {
        if (!coin) {
            res.status(404).send({ message: 'Not found coin with id ' + id });
        } else {
            res.send(coin);
        }
    })
    .catch((err) => {
        res
            .status(500)
            .send({ message: 'Error retrieving coin with id ' + id });
    });
};

exports.get = (req, res) => {
    const query =  req.query;
    if(Object.keys(query).length === 0){
        coinsDB
        .find()
        .then((coin) => {
            res.send(coin);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Error Occurred while retriving coin information',
            });
        });
    }
    else{
        let parsedQuery={}
        const name = query.name
        const shortName = query.shortName
        if(name){
            parsedQuery["name"]=name
        }
        if(shortName){
            parsedQuery["shortName"]=shortName
        }

        console.log(`searching coins: ${JSON.stringify(parsedQuery)}`)

        coinsDB
        .find(parsedQuery)
        .then((coin) => {
            if (!coin) {
                res.status(404).send({ message: 'Not found coins with the following query' });
            } else {
                res.send(coin);
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({ message: 'Error retrieving coins with the following query'});
        });
    }
};
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update can not be empty' });
    }

    const id = req.params.id;
    coinsDB
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot Update coin with ${id}. Maybe transaction not found!`,
            });
        } else {
            res.send(data);
        }
    })
    .catch((err) => {
        res.status(500).send({ message: 'Error Update coin information' });
    });
};

//// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    coinsDB
    .findByIdAndDelete(id)
    .then((data) => {
        if (!data) {
            res
                .status(404)
                .send({ message: `Cannot Delete coin with id ${id}. Maybe id is wrong` });
        } else {
            res.send({
                message: 'transaction was coin successfully!',
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: 'Could not delete coin with id=' + id,
        });
    });
};
