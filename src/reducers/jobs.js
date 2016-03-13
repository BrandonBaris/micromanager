/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { getJobs } from '../services/jobs';
const initialState = {
  jobs : []
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'GET_JOBS': {
      getJobs()
        .then((response) => nextState.jobs = response.data.jobs);
      return nextState;
    }
    case 'COMPLETE': {
      window.alert("BYE");
      return nextState;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
