const express = require('express');
const router = express.Router();

const Workout = require('../models/WorkoutModel');
const { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

// Require Authorization for other request
router.use(requireAuth)

// GET all workouts
router.get( '/', getWorkouts);

// GET a single workout
router.get( '/:id', getWorkout);

// POST a new workouts
router.post( '/', createWorkout);

// DELETE a workouts
router.delete( '/:id', deleteWorkout);

// UPDATE a workouts
router.patch( '/:id', updateWorkout);

module.exports = router