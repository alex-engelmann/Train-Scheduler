
//TODO set up a few default trains
//TODO each train needs to have 
// static variables NAME, DESTINATION, FREQUENCY, FIRST TRAIN TIME
// dynamic variable - NEXT ARRIVAL, MINUTES AWAY

var train1 = new Map();

train1.set("Name", "Trenton Express");
train1.set("Destination", "Trenton");
train1.set("Frequency", 30); //This is in minutes
train1.set("FirstTime", "00:00");
train1.set("MinutesAway", 0);
train1.set("NextArrival", "");



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

calculateTrain(train1);
console.log(train1);







//TODO Get new train from user
//TODO Add new train to the existing trains
//TODO Update the table with new train


