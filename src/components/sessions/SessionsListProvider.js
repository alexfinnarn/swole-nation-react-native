import { connect } from 'react-redux'
import SessionsList from './SessionsList';

const mapStateToProps = state => {
  return {
    sessions: Object.keys(state.sessions).map(key => state.sessions[key])
  }
};

const SessionsListProvider = connect(
  mapStateToProps,
)(SessionsList);

export default SessionsListProvider;
