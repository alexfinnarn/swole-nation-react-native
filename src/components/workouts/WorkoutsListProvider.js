import {connect} from 'react-redux';
import WorkoutsList from './WorkoutsList';

const mapStateToProps = state => {
  return {
    workouts: Object.keys(state.workouts).map(key => state.workouts[key]),
    thing: state.theThing,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      createWorkout: () => {
        dispatch({type: 'CREATE_WORKOUT'});
      },
      setActiveWorkoutKey: key => {
        dispatch({key, type: 'SET_ACTIVE_WORKOUT'});
      },
      deleteWorkout: key => {
        dispatch({key, type: 'DELETE_WORKOUT'});
      },
    },
  };
};

const WorkoutsListProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkoutsList);

export default WorkoutsListProvider;
