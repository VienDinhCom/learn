import { Router } from 'express';
import { ensureAuthenticated } from '../helpers/auth';
import Story from '../models/story';

const router = Router();

// Stories Index
router.get('/', (req, res) => {
  Story.find({ status: 'public' })
    .populate('user')
    .sort({ date: 'desc' })
    .then((stories) => {
      res.render('stories/index', {
        stories,
      });
    });
});

// Show Single Story
router.get('/show/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id,
  })
    .populate('user')
    .populate('comments.commentUser')
    .then((story) => {
      if (story.status === 'public') {
        res.render('stories/show', {
          story,
        });
      } else if (req.user) {
        if (req.user.id === story.user.id) {
          res.render('stories/show', {
            story,
          });
        } else {
          res.redirect('/stories');
        }
      } else {
        res.redirect('/stories');
      }
    });
});

// List stories from a user
router.get('/user/:userId', (req, res) => {
  Story.find({ user: req.params.userId, status: 'public' })
    .populate('user')
    .then((stories) => {
      res.render('stories/index', {
        stories,
      });
    });
});

// Logged in users stories
router.get('/my', ensureAuthenticated, (req, res) => {
  Story.find({ user: req.user.id })
    .populate('user')
    .then((stories) => {
      res.render('stories/index', {
        stories,
      });
    });
});

// Add Story Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

// Edit Story Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Story.findOne({
    _id: req.params.id,
  })
    .then((story) => {
      if (story.user !== req.user.id) {
        res.redirect('/stories');
      } else {
        res.render('stories/edit', {
          story,
        });
      }
    });
});

// Process Add Story
router.post('/', (req, res) => {
  let allowComments;

  if (req.body.allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }

  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments,
    user: req.user.id,
  };

  // Create Story
  new Story(newStory)
    .save()
    .then((story) => {
      res.redirect(`/stories/show/${story.id}`);
    });
});

// Edit Form Process
router.put('/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id,
  })
    .then((story) => {
      let allowComments;

      if (req.body.allowComments) {
        allowComments = true;
      } else {
        allowComments = false;
      }

      // New values
      story
        .set({
          title: req.body.title,
          body: req.body.body,
          status: req.body.status,
          allowComments,
        })
        .save()
        .then(() => {
          res.redirect('/dashboard');
        });
    });
});

// Delete Story
router.delete('/:id', (req, res) => {
  Story.remove({ _id: req.params.id })
    .then(() => {
      res.redirect('/dashboard');
    });
});

// Add Comment
router.post('/comment/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id,
  })
    .then((story) => {
      const newComment = {
        commentBody: req.body.commentBody,
        commentUser: req.user.id,
      };

      // Add to comments array
      story.comments.unshift(newComment);

      story.save()
        .then((story) => {
          res.redirect(`/stories/show/${story.id}`);
        });
    });
});

export default router;
