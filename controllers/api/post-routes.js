const router = require('express').Router();
<<<<<<< HEAD
const sequelize = require('../../config/connection');
const { Post, User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
=======
// const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', withAuth, (req, res) => {
  console.log('======================');
  Post.findAll({
    where: {
      user_id: req.session.user_id
  },
>>>>>>> c28d0e864747330558435af0ef61d3a7659426e3
    attributes: [
      'id',
      'post_url',
      'title',
<<<<<<< HEAD
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = like.post_id)'), 'likes_count']
=======
      'created_at'
>>>>>>> c28d0e864747330558435af0ef61d3a7659426e3
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
<<<<<<< HEAD
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = like.post_id)'), 'likes_count']
=======
      'created_at'
>>>>>>> c28d0e864747330558435af0ef61d3a7659426e3
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
<<<<<<< HEAD
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
=======
>>>>>>> c28d0e864747330558435af0ef61d3a7659426e3
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

<<<<<<< HEAD
router.put('/likes', withAuth, (req, res) => {
  // custom static method created in models/Post.js
  Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

=======
>>>>>>> c28d0e864747330558435af0ef61d3a7659426e3
router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
<<<<<<< HEAD
  console.log('id', req.params.id);
  Post.destroy({
=======
  Post.destroy(
    {
>>>>>>> c28d0e864747330558435af0ef61d3a7659426e3
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> c28d0e864747330558435af0ef61d3a7659426e3
