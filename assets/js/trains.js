
// "use strict";

//All the trains are kept in an array

var train = new Array();

//Each train is stored as a hash map, here are a few samples
train[0] = new Map();
train[0].set("Name", "Trenton Express");
train[0].set("Destination", "Trenton");
train[0].set("FirstTime", "00:00");
train[0].set("Frequency", 30); //This is in minutes


train[1] = new Map();
train[1].set("Name", "Orient Express");
train[1].set("Destination", "Bucarest");
train[1].set("FirstTime", "06:00");
train[1].set("Frequency", 120); //This is in minutes


train[2] = new Map();
train[2].set("Name", "Chocolate Choo Choo");
train[2].set("Destination", "Zurich");
train[2].set("FirstTime", "08:00");
train[2].set("Frequency", 45); //This is in minutes


//This does all the math and updates train time variables for any given train
var calculateTrain = function (train) {

  var tFrequency = train.get("Frequency");
  var firstTime = train.get("FirstTime");
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - tRemainder;
  // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  // console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  var arrivalTime = moment(nextTrain).format("HH:mm")

  train.set("NextArrival", arrivalTime);
  train.set("MinutesAway", tMinutesTillTrain);

}

var addTrain = function () {
  var newTrain = new Map();
  newTrain.set("Name", $("#train-name").val());
  newTrain.set("Destination", $("#train-destination").val());
  newTrain.set("FirstTime", $("#train-time").val());
  newTrain.set("Frequency", $("#train-frequency").val()); //This is in minutes

  train.push(newTrain);
}

var clearInterface = function () {
  //First clear the table
  $("tbody").empty()

  //Clear input fields
  $(".form-control").val("");
}

$(document).on("click", "#submit", function () {
  addTrain();
  clearInterface();
  for (let i = 0; i < train.length; i++) {
    calculateTrain(train[i]);
    console.log(train[i]);
    $("tbody").add("<tr>" +
      "<th scope='row'>" + train[i].get("Name") + "</th>" +
      "<td>" + train[i].get("Destination") + "</td>" +
      "<td>" + train[i].get("Frequency") + "</td>" +
      "<td>" + train[i].get("NextArrival") + "</td>" +
      "<td>" + train[i].get("MinutesAway") + "</td>" +
      "</tr>"
    ).appendTo("tbody");
  }
})



