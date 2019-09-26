import {WorkoutActions} from "./actions";
import shortId from 'shortid';
import data from './data';

function mainStore(state = data, action) {
  let newWorkouts = Object.assign({}, state.workouts);
  let exercise = {};
  let sets = [];

  switch (action.type) {

    case WorkoutActions.CREATE_WORKOUT:
      let workout = {key: shortId.generate(), name: '', description: '', exercises: []};
      return {...state, workouts: {...state.workouts, [workout.key]: workout}, activeWorkoutKey: workout.key};

    case WorkoutActions.UPDATE_WORKOUT:
      return Object.assign({}, state, {
        workouts: {...state.workouts, [action.workout.key]: action.workout},
        theThing: shortId.generate()
      });

    case WorkoutActions.DELETE_WORKOUT:
      delete newWorkouts[action.key];
      // @todo Handle releasing the active workout key.
      return Object.assign({}, state, {workouts: {...newWorkouts}, activeWorkoutKey: ''});

    case WorkoutActions.SET_ACTIVE_WORKOUT:
      return Object.assign({}, state, {
        activeWorkoutKey: action.key,
        activeTransformerKey: action.transformerKey ?? 'none'
      });

    case WorkoutActions.CREATE_EXERCISE:
      exercise = {key: shortId.generate(), new: true, name: '', instructions: '', sets: []};
      return Object.assign({}, state, {
        exercises: {...state.exercises, [exercise.key]: exercise},
        activeExerciseKey: exercise.key
      });

    case WorkoutActions.UPDATE_EXERCISE:
      return Object.assign({}, state, {
        exercises: {...state.exercises, [action.exercise.key]: action.exercise},
        activeExerciseKey: action.exercise.key
      });

    case WorkoutActions.ADD_EXERCISE:
      newWorkouts[state.activeWorkoutKey].exercises.push(action.exercise.name);
      return Object.assign({}, state, {workouts: {...newWorkouts}, theThing: shortId.generate()});


    case WorkoutActions.SET_ACTIVE_EXERCISE:
      return Object.assign({}, state, {activeExerciseKey: action.key});

    case WorkoutActions.ADD_SET:
      exercise = state.exercises[state.activeExerciseKey];
      exercise.sets.push(action.set);

      return Object.assign({}, state, {
        exercises: {...state.exercises, [state.activeExerciseKey]: exercise},
        theThing: shortId.generate()
      });

    case WorkoutActions.REMOVE_SET:
      exercise = state.exercises[state.activeExerciseKey];
      exercise.sets.splice(action.index, 1);

      return Object.assign({}, state, {
        exercises: {...state.exercises, [state.activeExerciseKey]: exercise},
        theThing: shortId.generate()
      });

    case WorkoutActions.UPDATE_SET:
      exercise = state.exercises[state.activeExerciseKey];
      exercise.sets[action.index] = action.set;

      return Object.assign({}, state, {
        exercises: {...state.exercises, [state.activeExerciseKey]: exercise},
        theThing: shortId.generate()
      });

    case WorkoutActions.CREATE_SESSION:
      let session = {
        key: shortId.generate(),
        duration: 0,
        progress: [0,0],
        completed: 0,
        name: new Date(Date.now()).toLocaleString('en-US'),
        workoutName: state.workouts[state.activeWorkoutKey].name,
        exercises: state.workouts[state.activeWorkoutKey].exercises.map((name) => {
          const foundKey = Object.keys(state.exercises).find(key => state.exercises[key].name === name);
          return state.exercises[foundKey];
        })
      };

      // Add completed property. Not added to workout because it only makes sense to record in a session.
      session.exercises.map((exercise) => {
        exercise.sets = exercise.sets.map((set) => {
          set.completed = false;
          return set;
        });
        return exercise;
      });

      // Apply session transformer if there is one.
      if (action.transformerKey !== 'none') {
        session = state.transformers[action.transformerKey].callback(session);
      }

      return Object.assign({}, state, {
        sessions: {...state.sessions, [session.key]: session},
        activeSessionKey: session.key
      });

    case WorkoutActions.DELETE_SESSION:
      let sessions = Object.assign({}, state.sessions);
      delete sessions[action.key];
      return Object.assign({}, state, {
        sessions: {...sessions},
        activeSessionKey: '',
        theThing: shortId.generate()
      });

    case WorkoutActions.SET_ACTIVE_SESSION:
      return Object.assign({}, state, {activeSessionKey: action.key});

    case WorkoutActions.FINISH_SESSION:
      return Object.assign({}, state, {
        sessions: {...state.sessions, [action.session.key]: action.session},
        activeSessionKey: '',
      });

    case WorkoutActions.SAVE_SETTINGS:
      return Object.assign({}, state, {theSetting: action.setting});

    default:
      return state;
  }
}

export default mainStore;
