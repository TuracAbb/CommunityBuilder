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

    const newDatatype = new Datatype({datatypeName, datatypeField});

    newDatatype.save()
        .then(() => res.json({data: newDatatype, error: ""}))
        .catch(err => res.json({data: "", error: err}))
});

router.route('/createCommunity').post((req, res) => {
    const communityName = req.body.communityName;
    const communityDescription = req.body.communityDescription;
    const communityDataTypes = req.body.communityDataTypes;
    const communityTags = req.body.communityTags;

    const newCommunity = new Community({communityName, communityDescription, communityDataTypes,communityTags });

    newCommunity.save()
        .then(() => res.json({data: newCommunity, error: ""}))
        .catch(err => res.json({data: "", error: err}))
});

module.exports = router;