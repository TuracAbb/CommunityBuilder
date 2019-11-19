const router = require('express').Router();
let Datatype = require('../models/datatype.model');

router.route('/').get((req, res) => {
    Datatype.find()
        .then(datatypes =>res.json(datatypes))
        .catch(err=> res.status(400).json('eroor' + err));

});

router.route('/createDatatype').post((req, res) => {
    const datatypeName = req.body.datatypeName;
    const datatypeField = req.body.datatypeField;

    const newDatatype = new newDatatype({datatypeName, datatypeField});

    newDatatype.save()
        .then(() => res.json('Datatype added'))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;