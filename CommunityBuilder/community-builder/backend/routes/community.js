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
    //const communityDataTypes = req.body.communityDataTypes;
    //const communityTags = req.body.communityTags;

    const newCommunity = new Community({communityName, communityDescription});

    newCommunity.save()
        .then(() => res.json({data: newCommunity, error: ""}))
        .catch(err => res.json({data: "", error: err}))
});

router.route('/updateCommunityDatatype/:id').post((req, res) => {
    Community.findById(req.params.id)
      .then(community => {
        community.communityDataTypes = req.body.communityDataTypes;
        community.save()
          .then(() => res.json({data: community, error: ""}))
          .catch(err => res.json({data: "", error: err}))
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get((req, res) => {
    Community.findById(req.params.id)
      .then(community => res.json(community))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;