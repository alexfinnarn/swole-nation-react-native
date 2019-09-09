import { connect } from 'react-redux'
import AddExercise from './AddExercise';
import shortId from "shortid";

function getExercise(exercises, otherProps) {
  const id = otherProps.navigation.getParam('exerciseId', 0);

  return exercises[1];

  if (id === 0) {
    return {id: shortId.generate(), name: '', instructions: '', sets: []};
  } else {
    return exercises.find((el) => el.id === id);
  }
}

const mapStateToProps = (state, otherProps) => {
  return {
    theExercise: getExercise(state.exercises, otherProps),
    exercises: state.exercises,
    thing: state.theThing
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
