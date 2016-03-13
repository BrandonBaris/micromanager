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
const device_id = "fbc1b926ecad75a3d53a4fad6257ea7d";

var mock_data = JSON.stringify({
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
})

router.get('/test', (req,res)=>{
  res.send({ success : true });
});

// meta-stream is a required non-numeric stream to have since it tracks other streams.
router.get('/meta-stream', (req,res)=>{
  m2x.devices.stream( device_id, "meta-stream", function(response) {
      console.log(response.json);
      res.send(response.json);
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
router.get('/task/:id', (req,res)=>{
  m2x.devices.stream( device_id, req.params.id, function(response) {
    res.send(response.json);
  });
});

// updates value of stream
router.put('/task/:id', (req,res)=>{
  var payload = req.body.value;
  m2x.devices.setStreamValue( device_id, req.params.id, payload, function(response) {
    res.send(response.json);
  });
});

// deletes stream
router.delete('/task/:id', (req,res)=>{
  var res_obj = {
    "status": "success",
    "message": `STREAM ID [${req.params.id}] DELETED.`
  }
  m2x.devices.deleteStream( device_id, req.params.id, function(response) {
    res.send( res_obj );
  });
});

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

module.exports = router;