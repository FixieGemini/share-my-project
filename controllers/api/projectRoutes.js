const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

//This will save a new project at endpoint /api/projects
router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

//This will update project info at endpoint /api/projects/#
router.put('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    if (!projectData) {
      res.status(404).json({ message: 'Project ID not found!' });
      return;
    };

    res.status(200).json(projectData)
  } catch (err) {
    res.status(400).json(err)
  }
});

//This will delete a project by its id number at endpoint /api/projects/#
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'Project ID not found!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;