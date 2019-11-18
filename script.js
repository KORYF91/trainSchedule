console.log("testing tezting;");

// Link to firebase server. 
var firebaseConfig = {
    apiKey: "AIzaSyC79ZDjB6SXBs2Yrqn_If093uSpB3SEbKU",
    authDomain: "trainschedule-e5c46.firebaseapp.com",
    databaseURL: "https://trainschedule-e5c46.firebaseio.com",
    projectId: "trainschedule-e5c46",
    storageBucket: "trainschedule-e5c46.appspot.com",
    messagingSenderId: "1094894311164",
    appId: "1:1094894311164:web:7ab3e2cce2fa89bcade979",
    measurementId: "G-0E24JW2JPL"
};

// initalization for firebase
firebase.initializeApp(firebaseConfig);

// variable to call data passed to the server
var database = firebase.database();

// function calls on the submitt button to take input data to firbase and then display on the Dom
$("#add-train-btn").on("click", function (event) {
    // prevent the default
    event.preventDefault();
    // how we are collection our input from the user
    var trainName = $("#trainName").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    //   var nextArrival = $("#nextArrival").val().trim();
    //   var minutesAwy = $("#minutesAwy").val().trim();

    // variable to hold all input data transfered to the firbase database.
    var trainInfo = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        first: trainTime

    }
    // this method is pushing the information from the user input then clearing the fields. 
    database.ref().push(trainInfo);
    $("#trainName").val("");
    $("#trainTime").val("");
    $("#destination").val("");
    $("#frequency").val("");
})

// This function is using the user input stored on the firbase database
database.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var firstTrainTime = childSnapshot.val().first;
// moment method to make calulations from the user input.
    // 
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "day");
    var trainDiff = moment().diff(moment(firstTimeConverted), "minutes");
    var trainRemainder = trainDiff % frequency;
    var minutesTillArrival = frequency - trainRemainder;
    var nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");
    // This variable takes all the data inputted and calculated to display.
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrainTime),
        $("<td>").text(minutesTillArrival),
    );
// short had to select table call the table body and append in the information from the newRow Variable created. 
    $(".table > tbody").append(newRow);


})