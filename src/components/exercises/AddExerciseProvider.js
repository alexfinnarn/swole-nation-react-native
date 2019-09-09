import { connect } from 'react-redux'
import AddExercise from './AddExercise';
import shortId from "shortid";

function getExercise(exercises, navigation) {
  const id = navigation.getParam('exerciseId', '');

  if (id === '') {
    return exercises[0];
  } else {
    return exercises.find((el) => el.id === id);
  }
}

function getExercises(exercises, navigation) {
  const workout = navigation.getParam('workout', {id: shortId.generate(), name: '', description: '', exercises: []});
  return exercises.filter(exercise => workout.exercises.includes(exercise.name) === false);
}

const mapStateToProps = (state, otherProps) => {
  return {
    theExercise: getExercise(getExercises(state.exercises, otherProps.navigation), otherProps.navigation),
    exercises: getExercises(state.exercises, otherProps.navigation),
    thing: state.theThing,
    pickerEnabled: otherProps.navigation.getParam('pickerEnabled', true)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleUpdate: (updatedSet, exercise, thing, action) => {
      dispatch({set: updatedSet, exercise, thing, type: action });
    },
    addExercise: (exercise) => {
      dispatch({ exercise, type: 'ADD_EXERCISE' });
    }
  }
};

const AddExerciseProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExercise);

export default AddExerciseProvider;
