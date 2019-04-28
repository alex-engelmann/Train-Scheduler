//First are listed all the functions that the program will use later:

//This does all the math and updates train time variables for any given train
var calculateTrain = function (train) {

  var tFrequency = train.Frequency;
  var firstTime = train.FirstTime;
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  var currentTime = moment(); //TODO display the current time for the user
  // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - tRemainder;
  // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  // console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  var arrivalTime = moment(nextTrain).format("HH:mm")

  train.NextArrival = arrivalTime;
  train.MinutesAway = tMinutesTillTrain;
}

//Adds the user's train to the local array
var addTrain = function () {
  var newTrain = new Object();
  newTrain = {
    Name: $("#train-name").val(),
    Destination: $("#train-destination").val(),
    FirstTime: $("#train-time").val(),
    Frequency: $("#train-frequency").val(), //This is in minutes
  }
  myTrains.push(newTrain);
  console.log(myTrains);
}

//Clears table and input fields
var clearInterface = function () {
  //First clear the table
  $("tbody").empty()

  //Clear input fields
  $(".form-control").val("");
}

var displayTrains = function () {
  for (let i = 0; i < myTrains.length; i++) {

    //Send elsewhere for calculations
    calculateTrain(myTrains[i]);

    // console.log("Current Train: " + myTrains[i]);

    $("tbody").add("<tr>" +
      "<th scope='row'>" + myTrains[i].Name + "</th>" +
      "<td>" + myTrains[i].Destination + "</td>" +
      "<td>" + myTrains[i].Frequency + "</td>" +
      "<td>" + myTrains[i].NextArrival + "</td>" +
      "<td>" + myTrains[i].MinutesAway + "</td>" +
      "</tr>"
    ).appendTo("tbody");
  }
}

//Configure some starter object trains for the database.  
//Was run once and then retired

// var myTrains = [
//   {
//     Name: "Trenton Express",
//     Destination: "Trenton",
//     FirstTime: "00:00",
//     Frequency: 30
//   },
//   {
//     Name: "Orient Express",
//     Destination: "Bucarest",
//     FirstTime: "06:00",
//     Frequency: 120
//   },
//   {
//     Name: "Ave",
//     Destination: "Madrid",
//     FirstTime: "08:00",
//     Frequency: 45
//   }
// ]


// Initialize Firebase
var config = {
  apiKey: "AIzaSyCXxldGAVNAACb0keZBzM20oFi8eJo40Uw",
  authDomain: "trains-59774.firebaseapp.com",
  databaseURL: "https://trains-59774.firebaseio.com",
  projectId: "trains-59774",
  storageBucket: "trains-59774.appspot.com",
  messagingSenderId: "514516399802"
};
firebase.initializeApp(config);

var database = firebase.database();

var myTrains = [];

// //Sends trains to the cloud
// database.ref().set({
//   cloudTrains : myTrains
// })


// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function (snapshot) {

  // Log everything that's coming out of snapshot
  console.log(snapshot.val().cloudTrains);
  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


$(document).on("click", "#submit", function () {
  addTrain();
  clearInterface();
  displayTrains();
}
)