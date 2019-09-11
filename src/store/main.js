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
        }
      ]
    },
  ],
  tempExerciseList: [],
  theThing: '',
  activeWorkoutIndex: 0,
  activeSessionIndex: 0,
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
      return Object.assign({}, state, {workouts: newWorkouts, theThing: shortId.generate()});

    case WorkoutActions.ADD_SET:
      let newSet = action.set;
      let newExercise = action.exercise;
      newExercises = state.exercises;

      if (action.exercise.new) {
        action.exercise.new = false;
        newExercises.push(action.exercise);
      }

      newExercises.forEach((ex, ind) => {
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
