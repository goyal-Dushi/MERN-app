const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req,res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error : "+err));
})

router.route('/add').post((req,res) => {
    const uname = req.body.username;
    const desc = req.body.description;
    const dur = Number(req.body.duration);
    const time = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username: uname,
        description : desc,
        duration : dur,
        date : time
    });

    newExercise.save()
    .then(() => res.json('Exercise added'))
    .catch(err => res.status(400).json('Error :'+err));

})

router.route('/:id').get((req,res) => {
    Exercise.findById(req.params.id)
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error : "+err));
})
.delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercises deleted"))
    .catch(err => res.status(400).json("Error : "+err)); 
});

router.route('/update/:id').patch((req,res) => {
    Exercise.findByIdAndUpdate(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json("Exercise Updated"))
        .catch(err => res.status(400).json("Error : "+err));
    })
    .catch(err => res.status(400).json("Error : "+err));
});

module.exports = router;