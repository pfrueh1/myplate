const router = require('express').Router();
const sequelize = require('../../config/connection');
const {checkFileType, upload, storage} =  require('../../utils/multerHelpers')
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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
    if(err) {console.log("you are at 1")
        res.render('dashboard', {
            msg: err
        });
    }else {
        if(req.file == undefined){
          console.log('you are at 2')
          console.log('####################req begin3################',req,'###########req end#################')
            res.render('dashboard', {
                msg: 'Error: No File Selected!'
            });
        } else {
          console.log('you are at 3')
            // res.render('dashboard', {
            //     msg: 'File Uploaded!',
            //     file: `uploads/${req.file.filename}`
            console.log('####################req begin3################',req.body.file,'###########req end#################')
            // });
            // console.log('here')
            Post.create({
              title: req.body.title,
              pic_name: req.body.file.filename,
              user_id: req.session.user_id
            })
            .then(dbPostData => res.json(dbPostData))
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