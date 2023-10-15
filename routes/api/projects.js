// import express
const expresss = require('express');
// create router object
const router = expresss.Router();
// configure handlers

const Project = require("../../models/project");
const async = require('hbs/lib/async');

// GET projects
router.get("/", async(req, res, next) => {
    let projects = await Project.find().sort([["duedate", "descending"]])
    res.status(200).json(projects);
})


/* Old POST
router.post("/", async(req, res, next) => {
    // console.log(req.body);
    // res.status(200).json(req.body)
    if (!req.body.name) {
        res.status(400).json({ValidationErrro : "Name is required"})
    } else if (!req.body.course) {
        res.status(400).json({ValidationErrro : "Course is required"})
    } else {
        Project.create ({
            name: req.body.name,
            dueDate: req.body.dueDate,
            course: req.body.course
        }, (err, newProject) => {
            if (err) {
                console.log(err);
                res.status(500).json({"ErrorMessage" : "Server threw an exception"})
            } else {
                res.status(200).json(newProject)
            }
        })
    }``
})
*/

// New POST
router.post("/", async (req, res, next) => {
    if (!req.body.name) {
        res.status(400).json({ validationError: "Name is a required field." });
    } else if (!req.body.course) {
        res.status(400).json({ validationError: "Course is a required field." });
    } else {
        let project = new Project({
        name: req.body.name,
        dueDate: req.body.dueDate,
        course: req.body.course,
        });
        await project.save();
        res.status(201).json(project);
    }
});

// PUT
router.put("/:_id", async (req, res, next) => {
    if (!req.body.name) {
      res.status(400).json({ validationError: "Name is a required field." });
    } else if (!req.body.course) {
      res.status(400).json({ validationError: "Course is a required field." });
    } else {
      // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
      // https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
      let project = await Project.findByIdAndUpdate(
        req.params._id,
        {
          name: req.body.name,
          dueDate: req.body.dueDate,
          course: req.body.course,
        },
        { new: true } // need this parameter so that mongoose returns the updated version of project
      );
      res.status(200).json(project);
    }
});

// DELETE
router.delete("/:_id", async (req, res, next) => {
    await Project.findByIdAndDelete(req.params._id);
    res.status(200).json({ 'success': 'true' });
});

module.exports = router