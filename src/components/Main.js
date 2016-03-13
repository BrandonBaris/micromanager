require('normalize.css');
require('styles/App.css');

import React from 'react';
import JobListComponent from './JobListComponent';

class AppComponent extends React.Component {
  render() {
    const {actions, jobs} = this.props;
    return (
      <div className="index">
        <h1>MicroManager</h1>
        <JobListComponent jobs={jobs} actions={actions} />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
