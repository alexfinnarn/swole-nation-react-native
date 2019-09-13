import {WorkoutActions} from "./actions";
import shortId from 'shortid';

const initialState = {
  workouts: [
    {
      id: shortId.generate(),
      name: 'Stronglifts A',
      description: 'Squats, Overhead Press, Deadlifts',
      exercises: ['Bench Press Warmup', 'Bench Press']
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
      new: false,
      name: 'Squats Warmup',
      instructions: 'Do with a barbell',
      sets: [
        {key: shortId.generate(), reps: 5, weight: 45.0},
        {key: shortId.generate(), reps: 5, weight: 45.0},
      ]
    },
    {
      id: shortId.generate(),
      new: false,
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
      new: false,
      name: 'Bench Press Warmup',
      instructions: 'Do with a barbell',
      sets: [
        {key: shortId.generate(), reps: 5, weight: 110.0},
        {key: shortId.generate(), reps: 5, weight: 135.0},
      ]
    },
    {
      id: shortId.generate(),
      new: false,
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
          id: shortId.generate(),
          new: false,
          name: 'Squats',
          image: require('../../assets/squats.gif'),
          instructions: 'Do with a barbell',
          sets: [
            {key: shortId.generate(), reps: 5, weight: 250.0},
            {key: shortId.generate(), reps: 5, weight: 260.0},
          ]
        },
        {
          id: shortId.generate(),
          new: false,
          name: 'Bench Press',
          image: require('../../assets/bench-press.gif'),
          instructions: 'Do with a barbell',
          sets: [
            {key: shortId.generate(), reps: 5, weight: 160.0},
            {key: shortId.generate(), reps: 5, weight: 165.0},
          ]
        },
        {
          id: shortId.generate(),
          new: false,
          name: 'Shoulder Press',
          image: require('../../assets/shoulder-press.gif'),
          instructions: 'Do with a barbell',
          sets: [
            {key: shortId.generate(), reps: 5, weight: 115.0},
            {key: shortId.generate(), reps: 5, weight: 115.0},
          ]
        },
        {
          id: shortId.generate(),
          new: false,
          name: 'Barbell Row',
          image: require('../../assets/barbell-row.gif'),
          instructions: 'Do with a barbell',
          sets: [
            {key: shortId.generate(), reps: 5, weight: 95.0},
            {key: shortId.generate(), reps: 5, weight: 95.0},
          ]
        },
        {
          id: shortId.generate(),
          new: false,
          name: 'Deadlifts',
          image: require('../../assets/deadlift.gif'),
          instructions: 'Do with a barbell',
          sets: [
            {key: shortId.generate(), reps: 5, weight: 240.0},
            {key: shortId.generate(), reps: 5, weight: 240.0},
          ]
        },
      ]
    },
  ],
  tempExerciseList: [],
  theThing: '',
  activeWorkoutIndex: 0,
  activeSessionIndex: 0,
  activeExerciseIndex: 0,
};

function mainStore(state = initialState, action) {
  let newWorkouts = [];
  let exercise = {};
  let index = 0;
  let newExercises = state.exercises;
  let newSessions = state.sessions;

  switch (action.type) {

    case WorkoutActions.CREATE_WORKOUT:
      let newWorkout = action.workout;
      newWorkout.id = shortId.generate();
      newWorkout.exercises = state.tempExerciseList;
      return Object.assign({}, state, {workouts: [...state.workouts, newWorkout]});

    case WorkoutActions.UPDATE_WORKOUT:
      newWorkouts = state.workouts;
      newWorkouts[state.activeWorkoutIndex] = action.workout;
      return Object.assign({}, state, {workouts: newWorkouts, theThing: shortId.generate()});

    case WorkoutActions.DELETE_WORKOUT:
      newWorkouts = state.workouts.filter(workout => workout.id !== action.workout.id);
      return Object.assign({}, state, {workouts: newWorkouts});

    case WorkoutActions.SET_ACTIVE_WORKOUT:
      let workoutIndex = 0;
      state.workouts.forEach((workout, index) => {
        if (workout.id === action.id) {
          workoutIndex = index;
        }
      });
      return Object.assign({}, state, {activeWorkoutIndex: workoutIndex});

    case WorkoutActions.ADD_EXERCISE:
      newWorkouts = state.workouts;
      newWorkouts[state.activeWorkoutIndex].exercises.push(action.exercise.name);
      newExercises[state.activeExerciseIndex] = action.exercise;
      return Object.assign({}, state, {workouts: newWorkouts, exercises: newExercises, theThing: shortId.generate()});

    case WorkoutActions.CREATE_EXERCISE:
      exercise = {id: shortId.generate(), new: true, name: '', instructions: '', sets: []};
      newExercises.push(exercise);
      return Object.assign({}, state, {exercises: newExercises, activeExerciseIndex: newExercises.length - 1});

    case WorkoutActions.SET_ACTIVE_EXERCISE:
      return Object.assign({}, state, {activeExerciseIndex: action.index});

    case WorkoutActions.ADD_SET:
      action.set.key = shortId.generate();
      newExercises[state.activeExerciseIndex].sets.push(action.set);
      return Object.assign({}, state, {exercises: newExercises, theThing: shortId.generate()});

    case WorkoutActions.REMOVE_SET:
      newExercises[state.activeExerciseIndex].sets = newExercises[state.activeExerciseIndex].sets.filter(set =>
        set.key !== action.set.key);
      return Object.assign({}, state, {exercises: newExercises, theThing: shortId.generate()});

    case WorkoutActions.UPDATE_SET:
      newExercises[state.activeExerciseIndex].sets = newExercises[state.activeExerciseIndex].sets.map(set =>
        set.key === action.set.key ? action.set : set);
      return Object.assign({}, state, {exercises: newExercises, theThing: shortId.generate()});

    case WorkoutActions.CREATE_SESSION:
      const session = {
        id: shortId.generate(),
        duration: 0,
        name: new Date(Date.now()).toLocaleString('en-US'),
        workoutIds: [state.workouts[state.activeWorkoutIndex].id],
        exercises: state.workouts[state.activeWorkoutIndex].exercises.map(name =>
          state.exercises.find(exercise => exercise.name === name))
      };

      // Add completed property. Not added to workout because it only makes sense to record in a session.
      session.exercises.map((exercise) => {
        exercise.sets = exercise.sets.map((set) => {
          set.completed = false;
          return set;
        });
        return exercise;
      });


      newSessions.push(session);
      return Object.assign({}, state, {sessions: newSessions, activeSessionIndex: newSessions.length - 1});

    case WorkoutActions.FINISH_SESSION:
      newSessions[state.activeSessionIndex] = action.session;
      return Object.assign({}, state, {sessions: newSessions});

    default:
      return state;
  }
}

export default mainStore;
