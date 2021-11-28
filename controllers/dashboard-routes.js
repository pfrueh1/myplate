const router = require('express').Router();
<<<<<<< HEAD
const sequelize = require('../config/connection');
const { Post, User, Comment, } = require('../models');
=======
// const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
>>>>>>> c28d0e864747330558435af0ef61d3a7659426e3
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'post_url',
      'title',
<<<<<<< HEAD
      'created_at',
      [sequelize.literal()]
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
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'post_url',
      'title',
<<<<<<< HEAD
      'created_at',
      [sequelize.literal()]
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
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        res.render('edit-post', {
          post,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> c28d0e864747330558435af0ef61d3a7659426e3
