/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  componentWillMount() {
    setInterval(this.props.actions.getJobs, 2500);
  }
  render() {
    const {actions, jobs} = this.props;
    return <Main jobs={jobs} actions={actions}/>;
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = { jobs: state.jobs };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    getJobs: require('../actions/getJobs.js'),
    complete: require('../actions/complete.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
