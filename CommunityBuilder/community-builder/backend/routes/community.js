const router = require('express').Router();
let Community = require('../models/community.model');


router.route('/').get((req, res) => {
    Community.find()
        .then(communities =>res.json(communities))
        .catch(err=> res.status(400).json('eroor' + err));

});

router.route('/getDatatypes/:id').get((req, res) => {
  Community.findById(req.params.id)
      .then(community => res.json(community.dataTypes))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/getFieldsOfDatatype/:comId/:dataId').get((req, res) => {
    Community.findOne({_id: req.params.comId}, { dataTypes: { $elemMatch: { _id: req.params.dataId}}})
        .then(community => res.json(community.dataTypes[0]))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/createCommunity').post((req, res) => {
    const communityName = req.body.communityName;
    const communityDescription = req.body.communityDescription;
    const dataTypes = req.body.dataTypes;
    const communityTags = req.body.communityTags;

    const newCommunity = new Community({communityName, communityDescription, dataTypes,communityTags});

    newCommunity.save()
        .then(() => res.json({data: newCommunity, error: ""}))
        .catch(err => res.json({data: "", error: err}))
});

router.route('/updateCommunityDatatype/:id').post((req, res) => {
    Community.findById(req.params.id)
      .then(community => {
        community.dataTypes = req.body.dataTypes;
        community.save()
          .then(() => res.json({data: community, error: ""}))
          .catch(err => res.json({data: "", error: err}))
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/updateCommunityPost/:id').post((req, res) => {
    Community.findById(req.params.id)
      .then(community => {
        community.posts = req.body.posts;
        community.save()
          .then(() => res.json({data: community, error: ""}))
          .catch(err => res.json({data: "", error: err}))
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/getPosts/:id').get((req, res) => {
    Community.findById(req.params.id)
        .then(community => res.json(community.posts))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/:id').get((req, res) => {
    Community.findById(req.params.id)
      .then(community => res.json(community))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;