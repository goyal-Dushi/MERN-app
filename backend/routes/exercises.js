const router = require("express").Router();
let Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/add").post((req, res) => {
  const newExercise = new Exercise(req.body);
  newExercise
    .save()
    .then(() =>
      res.json({
        show: true,
        msg: "New Exercise routine created Successfully.",
        type: "success",
      })
    )
    .catch((err) =>
      res.status(400).json("Error while adding new exercise:" + err)
    );
});

router
  .route("/:id")
  .get((req, res) => {
    Exercise.findById(req.params.id)
      .then((exercises) => res.json(exercises))
      .catch((err) =>
        res.status(400).json("Error while fetching exercise by ID : " + err)
      );
  })
  .delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json("Exercises deleted"))
      .catch((err) =>
        res.status(400).json("Error while deleting exercise : " + err)
      );
  });

router.route("/update/:id").patch((req, res) => {
  Exercise.findByIdAndUpdate(req.params.id).then((exercise) => {
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);
    // exercise = req.body;
    exercise
      .save()
      .then(() =>
        res.json({
          show: true,
          msg: "Exercise Updated Successfully!",
          type: "success",
        })
      )
      .catch((err) => {
        console.log("Error Updating: ", err);
        return res
          .status(400)
          .json({
            show: true,
            msg: "Error occured while updating exercise, please try again later.",
            type: "danger",
          });
      });
  });
});

module.exports = router;
