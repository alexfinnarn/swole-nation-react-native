import {connect} from 'react-redux';
import ExercisesList from './ExercisesList';

const mapStateToProps = state => {
  return {
    exercises: Object.keys(state.exercises).map(key => state.exercises[key]),
    thing: state.theThing,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      createExercise: () => {
        dispatch({type: 'CREATE_EXERCISE'});
      },
      setActiveExerciseKey: key => {
        dispatch({key, type: 'SET_ACTIVE_EXERCISE'});
      },
    },
  };
};

const ExercisesListProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExercisesList);

export default ExercisesListProvider;
