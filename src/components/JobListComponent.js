'use strict';

import React, { PropTypes } from 'react';
import JobComponent from './JobComponent';

require('styles//JobList.sass');

class JobListComponent extends React.Component {
  render() {
    return (
      <ul className="joblist-component">
        {
          this.props.jobs.jobs.map((job) => {
            return (<JobComponent
              {...job}
              {...this.props.actions} />)
          })
        }
      </ul>
    );
  }
}

JobListComponent.displayName = 'JobListComponent';

JobListComponent.propTypes = {
  jobs: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};
// JobListComponent.defaultProps = {};

export default JobListComponent;
