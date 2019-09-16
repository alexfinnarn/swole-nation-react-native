import {connect} from 'react-redux';
import AddExercise from './AddExercise';

function getExercise(exercises, activeExerciseKey) {
  const index = activeExerciseKey ?? Object.keys(exercises)[0];
  return exercises[index];
}

function getExercises(exercises, workouts, key, navigation) {
  const workout = navigation.getParam('workout', null);

  if (workout) {
    const exers = Object.keys(exercises).map((exerciseKey) => {
      if (workouts[key].exercises.includes(exercises[exerciseKey].name) === false) {
        return exercises[exerciseKey];
      }
    });

    return exers;
  } else {
    return exercises;
  }
}

const mapStateToProps = (state, otherProps) => {
  return {
    theExercise: getExercise(getExercises(state.exercises, state.workouts, state.activeWorkoutKey, otherProps.navigation), state.activeExerciseKey),
    exercises: getExercises(state.exercises, state.workouts, state.activeWorkoutKey, otherProps.navigation),
    thing: state.theThing,
    pickerEnabled: otherProps.navigation.getParam('pickerEnabled', true)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleUpdate: (updatedSet, index, action) => {
      dispatch({set: updatedSet, index, type: action});
    },
    saveExercise: (exercise, exerciseIsNew) => {
      if (exercise.connectedWorkout) {
        dispatch({exercise, type: 'ADD_EXERCISE'});
      } else {
        dispatch({exercise, type: 'UPDATE_EXERCISE'});
      }

    }
  };
};

const AddExerciseProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExercise);

export default AddExerciseProvider;
