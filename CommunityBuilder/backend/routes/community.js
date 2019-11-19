const router = require('express').Router();
let Community = require('../models/community.model');

router.route('/').get((req, res) => {
    Community.find()
        .then(communities =>res.json(communities))
        .catch(err=> res.status(400).json('eroor' + err));

});

router.route('/createCommunity').post((req, res) => {
    const communityName = req.body.communityName;
    const communityDescription = req.body.communityDescription;
    const communityDataTypes = req.body.communityDataTypes;
    const communityTags = req.body.communityTags;

    const newCommunity = new Community({communityName, communityDescription, communityDataTypes,communityTags });

    newCommunity.save()
        .then(() => res.json('Community added'))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;