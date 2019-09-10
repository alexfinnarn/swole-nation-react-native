import {WorkoutActions} from "./actions";
import shortId from 'shortid';

const initialState = {
  workouts: [
    {
      id: shortId.generate(),
      name: 'Stronglifts A',
      description: 'Squats, Overhead Press, Deadlifts',
      exercises: []
    },
    {
      id: shortId.generate(),
      name: 'Stronglifts B',
      description: 'Squats, Bench Press, Barbell Row',
      exercises: [
        'Squats Warmup',
        'Squats'
      ]
    }
  ],
  exercises: [
    {
      id: shortId.generate(),
      name: 'Squats Warmup',
      instructions: 'Do with a barbell',
      sets: [
        {key: shortId.generate(), reps: 5, weight: 45.0},
        {key: shortId.generate(), reps: 5, weight: 45.0},
      ]
    },
    {
      id: shortId.generate(),
      name: 'Squats',
      instructions: 'Do with a barbell',
      sets: [
        {key: shortId.generate(), reps: 5, weight: 200.0},
        {key: shortId.generate(), reps: 5, weight: 200.0},
        {key: shortId.generate(), reps: 5, weight: 200.0},
        {key: shortId.generate(), reps: 5, weight: 200.0},
        {key: shortId.generate(), reps: 5, weight: 200.0},
      ]
    },
    {
      id: shortId.generate(),
      name: 'Bench Press Warmup',
      instructions: 'Do with a barbell',
      sets: [
        {key: shortId.generate(), reps: 5, weight: 110.0},
        {key: shortId.generate(), reps: 5, weight: 135.0},
      ]
    },
    {
      id: shortId.generate(),
      name: 'Bench Press',
      instructions: 'Do with a barbell',
      sets: [
        {key: shortId.generate(), reps: 5, weight: 160.0},
        {key: shortId.generate(), reps: 5, weight: 160.0},
      ]
    },
  ],
  sessions: [
    {
      id: shortId.generate(),
      name: new Date(Date.now()).toLocaleString('en-US'),
      workoutIds: [],
      exercises: [
        {
          shortName: 'SQ',
          sets: '5x5',
          weight: 200.0
        },
        {
          shortName: 'OH',
          sets: '5x5',
          weight: 100.0
        },
        {
          shortName: 'DL',
          sets: '5x5',
          weight: 200.0
        },
      ]
    },
    {
      id: shortId.generate(),
      name: 'Next Workout',
      workoutIds: [2],
      exercises: [
        {
          shortName: 'SQ',
          sets: '5x5',
          weight: 205.0
        },
        {
          shortName: 'BP',
          sets: '5x5',
          weight: 160.0
        },
        {
          shortName: 'BR',
          sets: '5x5',
          weight: 90.0
        },
      ]
    }
  ],
  tempExerciseList: [],
  theThing: '',
  activeWorkoutId: '',
};

function mainStore(state = initialState, action) {
  let newWorkouts = [];
  let exercise = {};
  let index = 0;
  let newExercises = state.exercises;

  switch (action.type) {

    case WorkoutActions.CREATE_WORKOUT:
      let newWorkout = action.workout;
      newWorkout.id = shortId.generate();
      newWorkout.exercises = state.tempExerciseList;
      return Object.assign({}, state, {workouts: [...state.workouts, newWorkout]});

    case WorkoutActions.UPDATE_WORKOUT:
      newWorkouts = state.workouts.map((workout) => {
        if (workout.id === action.workout.id) {
          action.workout.exercises = state.tempExerciseList;
          return action.workout;
        }
        return workout;
      });
      return Object.assign({}, state, {workouts: newWorkouts});

    case WorkoutActions.DELETE_WORKOUT:
      newWorkouts = state.workouts.filter(workout => workout.id !== action.workout.id);
      return Object.assign({}, state, {workouts: newWorkouts});

    case WorkoutActions.SET_ACTIVE_WORKOUT:
      return Object.assign({}, state, {activeWorkoutId: action.id});

    case WorkoutActions.ADD_EXERCISE:
      // Trigger the workout list to reload...should contain more sensible functionality later.
      return Object.assign({}, state, {theThing: shortId.generate()});

    case WorkoutActions.ADD_SET:
      let newSet = action.set;
      let newExercise = action.exercise;
      newExercises = state.exercises;
      state.exercises.forEach((ex, ind) => {
        if (ex.name === action.exercise.name) {
          index = ind;
          exercise = ex;
        }
      });
      newSet.key = shortId.generate();
      newExercise.sets.push(newSet);
      newExercises[index] = newExercise;

      return Object.assign({}, state, {exercises: newExercises, theThing: action.thing});

    case WorkoutActions.REMOVE_SET:
      newExercises = state.exercises;
      state.exercises.forEach((ex, ind) => {
        if (ex.name === action.exercise.name) {
          index = ind;
          exercise = ex;
        }
      });
      let newSets = state.exercises[index].sets.filter(set => set.key !== action.set.key);

      newExercises[index].sets = newSets;
      return Object.assign({}, state, {exercises: newExercises, theThing: action.thing});

    case WorkoutActions.UPDATE_SET:
      newExercises = state.exercises.map((exercise) => {
        if (exercise.id === action.exercise.id) {
          exercise.sets = exercise.sets.map(set => set.key === action.set.key ? action.set : set);
          return exercise;
        }
        return exercise;
      });
      return Object.assign({}, state, {exercises: newExercises, theThing: action.thing});

    default:
      return state;
  }
}

export default mainStore;
