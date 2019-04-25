
"use strict";

//All the trains are kept in an array

var train = new Array();

//Each train is stored as a hash map, here are a few samples
train[0] = new Map();
train[0].set("Name", "Trenton Express");
train[0].set("Destination", "Trenton");
train[0].set("Frequency", 30); //This is in minutes
train[0].set("FirstTime", "00:00");

train[1] = new Map();
train[1].set("Name", "Orient Express");
train[1].set("Destination", "Bucarest");
train[1].set("Frequency", 120); //This is in minutes
train[1].set("FirstTime", "06:00");

train[2] = new Map();
train[2].set("Name", "Chocolate Choo Choo");
train[2].set("Destination", "Zurich");
train[2].set("Frequency", 45); //This is in minutes
train[2].set("FirstTime", "08:00");

//This does all the math and updates train time variables for any given train
var calculateTrain = function (train) {

  var tFrequency = train.get("Frequency");
  var firstTime = train.get("FirstTime");

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;

  // Minutes Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  var arrivalTime = moment(nextTrain).format("HH:mm")

  train.set("MinutesAway", tMinutesTillTrain);
  train.set("NextArrival", arrivalTime);

}

calculateTrain(train[0]);
console.log(train[0]);

calculateTrain(train[1]);
console.log(train[1]);







//TODO Get new train from user
//TODO Add new train to the existing trains
//TODO Update the table with new train


