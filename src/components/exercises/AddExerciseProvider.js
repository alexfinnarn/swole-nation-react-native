import {connect} from 'react-redux';
import AddExercise from './AddExercise';

function getExercise(exercises, activeExerciseIndex) {
  return exercises[activeExerciseIndex];
}

function getExercises(exercises, navigation) {
  const workout = navigation.getParam('workout', null);
  if (workout) {
    return exercises.filter(exercise => workout.workout.exercises.includes(exercise.name) === false);
  }
  return exercises;
}

const mapStateToProps = (state, otherProps) => {
  return {
    theExercise: getExercise(getExercises(state.exercises, otherProps.navigation), state.activeExerciseIndex),
    exercises: getExercises(state.exercises, otherProps.navigation),
    thing: state.theThing,
    pickerEnabled: otherProps.navigation.getParam('pickerEnabled', true)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleUpdate: (updatedSet, action) => {
      dispatch({set: updatedSet, type: action});
    },
    addExercise: (exercise) => {
      dispatch({exercise, type: 'ADD_EXERCISE'});
    }
  };
};

const AddExerciseProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExercise);

export default AddExerciseProvider;
