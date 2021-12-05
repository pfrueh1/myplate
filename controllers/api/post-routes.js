const router = require('express').Router();
const sequelize = require('../../config/connection');
const {checkFileType, upload, storage} =  require('../../utils/multerHelpers')
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const {uploadFile} = require('../../utils/s3')

// get all users
router.get('/', withAuth, (req, res) => {
  console.log('======================');
  Post.findAll({
    where: {
      user_id: req.session.user_id
  },
    attributes: [
      'id',
      'title',
      'created_at'
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
      'title',
      'created_at'
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
  upload(req, res, (err) => {
    const file = req.file
    if(err) {
        res.render('dashboard', {
            msg: err,
            style: 'dashboard.css'
        });
    }else {
        if(req.file == undefined){
            res.render('dashboard', {
                msg: 'Error: No File Selected!',
                style: 'dashboard.css'
            });
        } else {
             uploadFile(file)
            .then( result => {       
              Post.create({
              title: req.body.post_title,
              pic: result.Location,
              user_id: req.session.user_id
            })})

            .then(dbPostData => {
              res.redirect('/dashboard');
              
            })
            .catch(err => {
            console.log(err);
            res.status(500).json(err);
            });
        }
    }
  })

    

});

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
  Post.destroy(
    {
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

module.exports = router;
