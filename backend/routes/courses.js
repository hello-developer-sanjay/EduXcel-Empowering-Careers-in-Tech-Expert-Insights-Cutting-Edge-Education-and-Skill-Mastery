const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Module = require('../models/Module'); // Import the Module model
const SubModule = require('../models/SubModule'); 
// Define the route to fetch the list of courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Define a route to fetch module titles for a course





router.get('/:title/moduletitles', async (req, res) => {
  try {
    const courseTitle = req.params.title;

    const course = await Course.findOne({ title: courseTitle });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Extract module titles from the course syllabus
    const moduleTitles = course.syllabus.map((module) => ({
      title: module.module,
    }));

    res.json(moduleTitles);
  } catch (error) {
    console.error('Error fetching module titles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Define a new route to fetch sub-module details
// Define a new route to fetch sub-module details
router.get('/:title/modules/:module/:submodule', async (req, res) => {
  try {
    const courseTitle = req.params.title;
    const moduleTitle = req.params.module;
    const subModuleTitle = req.params.submodule;

    const course = await Course.findOne({ title: courseTitle });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const module = course.syllabus.find((module) => module.module === moduleTitle);

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Now, fetch the sub-module details from the "submodules" collection using the sub-module title
    const subModuleDetails = await SubModule.findOne({ title: subModuleTitle });

    if (!subModuleDetails) {
      return res.status(404).json({ error: 'Sub-Module not found' });
    }

    res.json(subModuleDetails);
  } catch (error) {
    console.error('Error fetching sub-module details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});










router.get('/:title', async (req, res) => {
  try {
    const courseTitle = req.params.title;

    const course = await Course.findOne({ title: courseTitle });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the route to fetch module details by title
router.get('/:title/modules/:module', async (req, res) => {
  try {
    const courseTitle = req.params.title;
    const moduleTitle = req.params.module;

    const course = await Course.findOne({ title: courseTitle });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Find the module that matches the moduleTitle in the syllabus
    const moduleData = course.syllabus.find(
      (module) => module.module === moduleTitle
    );

    if (!moduleData) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Now, fetch the module details from the "modules" collection using the module title
    const moduleDetails = await Module.findOne({ title: moduleTitle });

    if (!moduleDetails) {
      return res.status(404).json({ error: 'Module details not found' });
    }

    res.json(moduleDetails);
  } catch (error) {
    console.error('Error fetching module details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
