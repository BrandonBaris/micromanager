require('normalize.css');
require('styles/App.css');

import React from 'react';
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

      <ul className="taskList">
        <li>
          <div className="taskListHeader">
            <div className="taskTitle">
              <h2>Build-a-burger</h2>
            </div>        
          </div>

          <ul className="subtaskList">

            <li className="subtaskListItem">
              <div className="subtaskName">
                <h4>Jon</h4>
                <h3>Cook a Burger</h3>
              </div>
              <div className="subtaskTime">
                <h4>&nbsp;</h4>
                <h3>3:00</h3>
              </div>              
              <div className="subtaskDelOpt">
                <h4>&nbsp;</h4>
                <h3>&times;</h3>
              </div>
              <div className="subtaskFlags">
                <h4>&nbsp;</h4>
                <h3>0</h3>
              </div>
              <div className="subtaskStatus">
                <h4>&nbsp;</h4>
                <h3>Done</h3>
              </div>
            </li>

            <li className="subtaskListItem">
              <div className="subtaskName">
                <h4>Kelli</h4>
                <h3>Wrap the Burger</h3>
              </div>
              <div className="subtaskTime">
                <h4>&nbsp;</h4>
                <h3>3:00</h3>
              </div>              
              <div className="subtaskDelOpt">
                <h4>&nbsp;</h4>
                <h3>&times;</h3>
              </div>
              <div className="subtaskFlags">
                <h4>&nbsp;</h4>
                <h3>0</h3>
              </div>
              <div className="subtaskStatus">
                <h4>&nbsp;</h4>
                <h3>Done</h3>
              </div>
            </li>

            <li className="subtaskListItem">
              <div className="subtaskName late">
                <h4>Brad</h4>
                <h3>Eat the Burger</h3>
              </div>
              <div className="subtaskTime late">
                <h4>&nbsp;</h4>
                <h3>1:00</h3>
              </div>              
              <div className="subtaskDelOpt">
                <h4>&nbsp;</h4>
                <h3>&times;</h3>
              </div>
              <div className="subtaskFlags">
                <h4>&nbsp;</h4>
                <h3>0</h3>
              </div>
              <div className="subtaskStatus">
                <h4>&nbsp;</h4>
                <h3>Pending</h3>
              </div>
            </li>

          </ul>
        </li>

        <li>
          <div className="taskListHeader">
            <div className="taskTitle">
              <h2>Make Potatoes</h2>
            </div>        
          </div>

          <ul className="subtaskList">

            <li className="subtaskListItem">
              <div className="subtaskName">
                <h4>Kelli</h4>
                <h3>Peel Potatoes</h3>
              </div>
              <div className="subtaskTime complete">
                <h4>&nbsp;</h4>
                <h3>Done</h3>
              </div>              
              <div className="subtaskDelOpt">
                <h4>&nbsp;</h4>
                <h3>&times;</h3>
              </div>
              <div className="subtaskFlags">
                <h4>&nbsp;</h4>
                <h3>0</h3>
              </div>
              <div className="subtaskStatus">
                <h4>&nbsp;</h4>
                <h3>Done</h3>
              </div>
            </li>

            <li className="subtaskListItem">
              <div className="subtaskName">
                <h4>Kelli</h4>
                <h3>Bake Potatoes</h3>
              </div>
              <div className="subtaskTime">
                <h4>&nbsp;</h4>
                <h3>3:00</h3>
              </div>              
              <div className="subtaskDelOpt">
                <h4>&nbsp;</h4>
                <h3>&times;</h3>
              </div>
              <div className="subtaskFlags">
                <h4>&nbsp;</h4>
                <h3>0</h3>
              </div>
              <div className="subtaskStatus">
                <h4>&nbsp;</h4>
                <h3>Done</h3>
              </div>
            </li>

            <li className="subtaskListItem">
              <div className="subtaskName">
                <h4>Jon</h4>
                <h3>Transmute Potatoes</h3>
              </div>
              <div className="subtaskTime">
                <h4>&nbsp;</h4>
                <h3>30:00</h3>
              </div>              
              <div className="subtaskDelOpt">
                <h4>&nbsp;</h4>
                <h3>&times;</h3>
              </div>
              <div className="subtaskFlags">
                <h4>&nbsp;</h4>
                <h3>12</h3>
              </div>
              <div className="subtaskStatus">
                <h4>&nbsp;</h4>
                <h3>Pending</h3>
              </div>
            </li>

            <li className="subtaskListItem">
              <div className="subtaskName">
                <h4>Brad</h4>
                <h3>Eat Onions</h3>
              </div>
              <div className="subtaskTime">
                <h4>&nbsp;</h4>
                <h3>3:00</h3>
              </div>              
              <div className="subtaskDelOpt">
                <h4>&nbsp;</h4>
                <h3>&times;</h3>
              </div>
              <div className="subtaskFlags">
                <h4>&nbsp;</h4>
                <h3>0a</h3>
              </div>
              <div className="subtaskStatus">
                <h4>&nbsp;</h4>
                <h3>Pending</h3>
              </div>
            </li>

            <li className="subtaskListItem">
              <div className="subtaskName">
                <h4>Brandon</h4>
                <h3>Wear Onion Armor</h3>
              </div>
              <div className="subtaskTime">
                <h4>&nbsp;</h4>
                <h3>3:12</h3>
              </div>              
              <div className="subtaskDelOpt">
                <h4>&nbsp;</h4>
                <h3>&times;</h3>
              </div>
              <div className="subtaskFlags">
                <h4>&nbsp;</h4>
                <h3>0</h3>
              </div>
              <div className="subtaskStatus">
                <h4>&nbsp;</h4>
                <h3>Pending</h3>
              </div>
            </li>   

          </ul>
        </li>
      </ul>
      
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
