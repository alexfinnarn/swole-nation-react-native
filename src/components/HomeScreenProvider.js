import { connect } from 'react-redux'
import Home from './Home';

const mapStateToProps = (state, otherProps) => {
  return {
    workouts: state.workouts
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      nextWorkoutInteraction: (workoutId) => {
        dispatch({id: workoutId, type: 'SET_ACTIVE_WORKOUT'});
      }
    },
  }
};

const HomeScreenProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeScreenProvider;
