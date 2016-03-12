const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
// const request = require("request");
// const API = "http://api-m2x.att.com/v2";
const M2X = require('m2x');
const m2x = new M2X( process.env.M2X_APIKEY );
var TIMESTAMP = Date.now();
// express().use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
const STREAM_TYPE = {
  NUMERIC : "numeric",
  ALPHANUMERIC : "alphanumeric"
};
const M2X_KEY = process.env.M2X_APIKEY;
const device_id = "fbc1b926ecad75a3d53a4fad6257ea7d";

// function makeStreamsEndpoint(device_id, stream_id, endpoint, action){
//   return `${API}/${endpoint}/${device_id}/streams/${stream_id}/${action}`;
// }

router.get('/test', (req,res)=>{
  res.send({ success : true });
});

router.get('/meta-stream', (req,res)=>{
  m2x.devices.stream( device_id, "meta-stream", function(response) {
      console.log(response.json);
      res.send(response.json);
  });
});

router.put('/meta-stream', (req,res)=>{
  var payload = req.body.value;
  m2x.devices.setStreamValue( device_id, "meta-stream", payload, function(response) {
    res.send(response);
  });
});

router.post('/task/:id', (req,res)=>{
  var params = {
    type: STREAM_TYPE.ALPHANUMBERIC
  };
  m2x.devices.updateStream( device_id, req.params.id, params, function( response ){
    res.send(response.json);
  });
});

router.get('/task/:id', (req,res)=>{
  m2x.devices.stream( device_id, req.params.id, function(response) {
    res.send(response.json);
  });
});

router.put('/task/:id', (req,res)=>{
  var payload = req.body.value;
  m2x.devices.setStreamValue( device_id, req.params.id, payload, function(response) {
    res.send(response.json);
  });
});

router.delete('/task/:id', (req,res)=>{
  var res_obj = {
    "status": "success",
    "message": `STREAM ID [${req.params.id}] DELETED.`
  }
  m2x.devices.deleteStream( device_id, req.params.id, function(response) {
    res.send( res_obj );
  });
});

router.get('/task/:id/node/:node', (req,res)=>{
  var node = req.params.node;
  var payload = {

  };
  m2x.devices.setStreamValue( device_id, req.params.id, payload, function(response) {
    res.send(response.json);
  });
});

module.exports = router;
