import { connect } from 'react-redux'
import Home from './Home';

const mapStateToProps = (state, otherProps) => {
  return {
    workouts: Object.keys(state.workouts).map((key) => state.workouts[key]),
    thing: state.theThing,
    sessionTeaser: state.sessions[Object.keys(state.sessions).pop()]
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      nextWorkoutInteraction: (workoutKey) => {
        dispatch({key: workoutKey, type: 'SET_ACTIVE_WORKOUT'});
      }
    },
  }
};

const HomeScreenProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeScreenProvider;
