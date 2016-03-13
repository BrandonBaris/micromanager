'use strict';

import React, { PropTypes } from 'react';

require('styles//Job.sass');

class JobComponent extends React.Component {
  render() {
    return (
      <div className="job-component">
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}

JobComponent.displayName = 'JobComponent';

// Uncomment properties you need
JobComponent.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
// JobComponent.defaultProps = {};

export default JobComponent;
