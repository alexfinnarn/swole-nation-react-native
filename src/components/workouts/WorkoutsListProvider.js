import { connect } from 'react-redux'
import WorkoutsList from './WorkoutsList';

const mapStateToProps = state => {
  return {
    workouts: state.workouts,
    thing: state.theThing
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      createWorkout: () => {
        dispatch({type: 'CREATE_WORKOUT' });
      },
      setActiveWorkoutIndex: (index) => {
        dispatch({index, type: 'SET_ACTIVE_WORKOUT'});
      }
    }
  };
};

const WorkoutsListProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutsList);

export default WorkoutsListProvider;
