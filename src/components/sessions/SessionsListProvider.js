import { connect } from 'react-redux'
import SessionsList from './SessionsList';

const mapStateToProps = state => {
  return {
    sessions: state.sessions
  }
};

const SessionsListProvider = connect(
  mapStateToProps,
)(SessionsList);

export default SessionsListProvider;
