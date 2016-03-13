require('normalize.css');
require('styles/App.css');

import React from 'react';
import JobListComponent from './JobListComponent';
import FontFaceObserver from 'fontfaceobserver';

// promise to check if google font is loaded then applies it, avoids FOIT/FOUT
const openSansObserver = new FontFaceObserver('Open Sans', {});
openSansObserver.check().then(() => {
  document.body.classList.add('js-open-sans-loaded');
}, () => {
  document.body.classList.remove('js-open-sans-loaded');
});

class AppComponent extends React.Component {
  render() {
    const {actions, jobs} = this.props;
    return (
      <section className="mainContent">
        <section className="title">
          <div className="flexTitleArea">
            <h1>Micromanager</h1>
            <p><i>Internet of Potatoes</i></p>
          </div>
          <div className="flexNewJobButtonArea">
            <button className="newJobButton">
              New Job
            </button>
          </div>
        </section>
        <JobListComponent jobs={jobs} actions={actions} />
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
