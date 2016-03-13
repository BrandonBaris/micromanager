'use strict';

import React, { PropTypes } from 'react';
import TaskComponent from './TaskComponent';

require('styles//Job.sass');

class JobComponent extends React.Component {
  render() {
    return (
      <div className="job-component">
        <h3>{this.props.initator}</h3>
        <h2>{this.props.job_id}</h2>
        <ul className="tasklist-component">
          {
            this.props.tasks.map((task) => {
              return (<TaskComponent
                key={task.node_id}
                {...task}
                {...this.props.actions} />)
            })
          }
        </ul>
      </div>
    );
  }
}

JobComponent.displayName = 'JobComponent';

// Uncomment properties you need
JobComponent.propTypes = {
  check_bypass: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
  hard_time_limit: PropTypes.number.isRequired,
  initator: PropTypes.string.isRequired,
  job_id: PropTypes.string.isRequired,
  start_time: PropTypes.number.isRequired,
  tasks: PropTypes.array.isRequired
};
// JobComponent.defaultProps = {};

export default JobComponent;
