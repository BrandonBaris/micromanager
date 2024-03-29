'use strict';
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const M2X = require('m2x');
const m2x = new M2X( process.env.M2X_APIKEY );
const bluebird = require('bluebird');
var TIMESTAMP = Date.now();
// express().use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const STREAM_TYPE = {
  NUMERIC : "numeric",
  ALPHANUMERIC : "alphanumeric"
};
const M2X_KEY = process.env.M2X_APIKEY;
// const device_id = "fbc1b926ecad75a3d53a4fad6257ea7d";
const device_id = "3b0eaa66a0d88ade22a6af2b23378b72";

var raw_data = {
  "jobs": [
    {
      "job_id": "job_name1",
      "start_time": Date.now(),
      "hard_time_limit": 6000,
      "initator": "some boss dude",
      "check_bypass": false,
      "tasks": [
        {
          "node": "some_id1",
          "name": "Task 1: Do something.",
          "time_allocated": 360,
          "completion_time": 0,
          "complete": false,
          "approved": false,
          "contested": false,
          "notes": "NOTES OR CONCERNS FOR MASTER TO READ ON CONTEST FLAG"
        },
        {
          "node": "some_id2",
          "name": "Task 2: Do more stuff",
          "time_allocated": 120,
          "complete": false,
          "approved": false,
          "contested": false,
          "notes": ""
        }
      ],
      "complete": false
    },
    {
      "job_id": "job_name2",
      "start_time": Date.now(),
      "hard_time_limit": 6000,
      "initator": "some boss dude",
      "check_bypass": false,
      "tasks": [
        {
          "node": "some_id3",
          "name": "Task 1: Do something.",
          "time_allocated": 360,
          "completion_time": 0,
          "complete": false,
          "approved": false,
          "contested": false,
          "notes": "NOTES OR CONCERNS FOR MASTER TO READ ON CONTEST FLAG"
        },
        {
          "node": "some_id2",
          "name": "Task 2: Do more stuff",
          "time_allocated": 120,
          "complete": false,
          "approved": false,
          "contested": false,
          "notes": ""
        }
      ],
      "complete": false
    },
    {
      "job_id": "job_name3",
      "start_time": Date.now(),
      "hard_time_limit": 6000,
      "initator": "some boss dude",
      "check_bypass": false,
      "tasks": [
        {
          "node": "some_id1",
          "name": "Task 1: Do something.",
          "time_allocated": 360,
          "completion_time": 0,
          "complete": false,
          "approved": false,
          "contested": false,
          "notes": "NOTES OR CONCERNS FOR MASTER TO READ ON CONTEST FLAG"
        },
        {
          "node": "some_id2",
          "name": "Task 2: Do more stuff",
          "time_allocated": 120,
          "complete": false,
          "approved": false,
          "contested": false,
          "notes": ""
        }
      ],
      "complete": false
    }
  ]
};
var mock_data = JSON.stringify(raw_data);

// meta-stream is a required non-numeric stream to have since it tracks other streams.
router.get('/meta-stream', (req,res)=>{
  m2x.devices.streamValues( device_id, "meta-stream", function(response) {
      // console.log(JSON.parse(respons .json.values[0].value));
      res.send(JSON.parse(response.json.values[0].value));
  });
});

// updates meta streams current values
router.put('/meta-stream', (req,res)=>{
  // var payload = req.body.value;
  var payload = { "value": mock_data };
  m2x.devices.setStreamValue( device_id, "meta-stream", payload, function(response) {
    res.send(response.json);
  });
});

// simulate
setInterval(()=>{
  let jobs = [];
  for(let i=0,l=Math.ceil(Math.random()*4);i<l;i++){
    let tasks = [];
    for(let i=0,l=Math.ceil(Math.random()*4);i<l;i++){
      tasks.push(
        {
          "node": "some_id"+i,
          "name": "Task "+i+": Do something.",
          "time_allocated": 360,
          "completion_time": 0,
          "complete": false,
          "approved": false,
          "contested": false,
          "notes": "NOTES OR CONCERNS FOR MASTER TO READ ON CONTEST FLAG"
        }
      );
    }
    jobs.push({
      "job_id": "job_name"+i,
      "start_time": Date.now(),
      "hard_time_limit": 6000,
      "initator": "some boss dude",
      "check_bypass": false,
      "tasks": tasks,
      "complete": false
    });
  }

  let payload = {value : JSON.stringify({  jobs : jobs })};
  m2x.devices.setStreamValue( device_id, "meta-stream", payload, function(response) {
    console.log("posted",new Date(), response.json);
  });
}, 2130);

// creates or updates a stream with the assigned ID
// router.post('/task/:id', (req,res)=>{
//   var params = {
//     type: STREAM_TYPE.ALPHANUMBERIC
//   };
//   m2x.devices.updateStream( device_id, req.params.id, params, function( response ){
//     res.send(response.json);
//   });
// });

// gets value of task
// router.get('/task/:id', (req,res)=>{
//   m2x.devices.stream( device_id, req.params.id, function(response) {
//     res.send(response.json);
//   });
// });

// updates value of stream
// router.put('/task/:id', (req,res)=>{
//   var payload = req.body.value;
//   m2x.devices.setStreamValue( device_id, req.params.id, payload, function(response) {
//     res.send(response.json);
//   });
// });

// deletes stream
// router.delete('/task/:id', (req,res)=>{
//   var res_obj = {
//     "status": "success",
//     "message": `STREAM ID [${req.params.id}] DELETED.`
//   }
//   m2x.devices.deleteStream( device_id, req.params.id, function(response) {
//     res.send( res_obj );
//   });
// });

// filter jobs by id
router.get('/node/:id', (req,res)=>{
  var node = req.params.id;

  m2x.devices.stream( device_id, 'meta-stream', function(response) {
    var jobs;
    if( response != null ){
      // jobs = mock_data.jobs; // for testing
      console.log(JSON.parse(response.json.value).jobs);
      var jobs = JSON.parse(response.json.value).jobs;
    } else {
      return res.send([]);
    }

    var parsed_res = jobs.filter( function( job ){
      // console.log('job',job);
      var filtered_jobs = job.tasks.filter( function( task ){
        // console.log('task',task);
        if ( task.node == node ){
          return true;
        } else {
          return false;
        }
      });
      // console.log(filtered_jobs);
      if( filtered_jobs.length > 0 ){
        return true;
      } else {
        return false;
      }
    });
    return res.send(parsed_res);
  });
});

router.post('/complete', (req,res)=>{
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var xhr = new XMLHttpRequest();
  // init speaker session
  xhr.open("GET","http://10.0.1.9:8080/api/v1/init_session", false);
  xhr.send();
  xhr.open("GET","http://10.0.1.9:8080/api/v1/play_hub_media?SessionToken=LocalServer-1000&PersistentID=7408958212746443185&DeviceID=60744278816944", false);
  xhr.send();
  res.send('REQUEST SENT');
});

module.exports = router;
