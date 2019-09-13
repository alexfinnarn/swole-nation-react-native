import {connect} from 'react-redux';
import ExercisesList from './ExercisesList';

const mapStateToProps = state => {
  return {
    exercises: state.exercises,
    thing: state.theThing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      createExercise: () => {
        dispatch({type: 'CREATE_EXERCISE'});
      },
      setActiveExerciseIndex: (index) => {
        dispatch({index, type: 'SET_ACTIVE_EXERCISE'});
      }
    }
  };
};

const ExercisesListProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExercisesList);

export default ExercisesListProvider;
