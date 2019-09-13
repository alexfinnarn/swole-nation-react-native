import { connect } from 'react-redux'
import Home from './Home';

const mapStateToProps = (state, otherProps) => {
  return {
    workouts: state.workouts,
    thing: state.theThing
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      nextWorkoutInteraction: (workoutId) => {
        dispatch({index: workoutId, type: 'SET_ACTIVE_WORKOUT'});
      }
    },
  }
};

const HomeScreenProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeScreenProvider;
