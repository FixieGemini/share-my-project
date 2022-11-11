const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//This will save a new comment at endpoint /api/Comments
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

//This will update Comment info at endpoint /api/Comments/#
router.put('/:id', withAuth, async (req, res) => {
  try {
    const CommentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    if (!CommentData) {
      res.status(404).json({ message: 'Comment ID not found!' });
      return;
    };

    res.status(200).json(CommentData)
  } catch (err) {
    res.status(400).json(err)
  }
});

//This will delete a Comment by its id number at endpoint /api/Comments/#
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const CommentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!CommentData) {
      res.status(404).json({ message: 'Comment ID not found!' });
      return;
    }

    res.status(200).json(CommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;