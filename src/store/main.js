import {WorkoutActions} from "./actions";
import shortId from 'shortid';
import {AsyncStorage} from 'react-native';
import data from './ddata';

async function initializeState() {
  try {
    const exercises = await AsyncStorage.getItem('EXERCISES');
    if (exercises !== null) {
      const workouts = await AsyncStorage.getItem('WORKOUTS');
      const sessions = await AsyncStorage.getItem('SESSIONS');

    } else {
      populateDB();
    }
  } catch (error) {
    // Error retrieving data
  }
}

function mainStore(state = initializeState(), action) {
  let newWorkouts = state.workouts;
  let exercise = {};
  let newExercises = state.exercises;
  let newSessions = state.sessions;

  switch (action.type) {

    case WorkoutActions.CREATE_WORKOUT:
      let workout = {key: shortId.generate(), name: '', description: '', exercises: []};
      newWorkouts.push(workout);
      return Object.assign({}, state, {workouts: newWorkouts, activeWorkoutIndex: newWorkouts.length - 1});

    case WorkoutActions.UPDATE_WORKOUT:
      newWorkouts[state.activeWorkoutIndex] = action.workout;
      return Object.assign({}, state, {workouts: newWorkouts, theThing: shortId.generate()});

    case WorkoutActions.DELETE_WORKOUT:
      newWorkouts = state.workouts.filter(workout => workout.key !== action.workout.key);
      return Object.assign({}, state, {workouts: newWorkouts});

    case WorkoutActions.SET_ACTIVE_WORKOUT:
      return Object.assign({}, state, {activeWorkoutIndex: action.index});

    case WorkoutActions.ADD_EXERCISE:
      newWorkouts = state.workouts;
      newWorkouts[state.activeWorkoutIndex].exercises.push(action.exercise.name);
      // newExercises[state.activeExerciseIndex] = action.exercise;
      return Object.assign({}, state, {workouts: newWorkouts, theThing: shortId.generate()});

    case WorkoutActions.CREATE_EXERCISE:
      exercise = {key: shortId.generate(), new: true, name: '', instructions: '', sets: []};
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
        key: shortId.generate(),
        duration: 0,
        name: new Date(Date.now()).toLocaleString('en-US'),
        workoutKeys: [state.workouts[state.activeWorkoutIndex].key],
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
