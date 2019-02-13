
    // initialzing firebase
    var config = {
    apiKey: "AIzaSyAbKA2j805AGbQJwbEaFNpFcdWWCzJjrVI",
    authDomain: "tgv-scheduler.firebaseapp.com",
    databaseURL: "https://tgv-scheduler.firebaseio.com",
    projectId: "tgv-scheduler",
    storageBucket: "tgv-scheduler.appspot.com",
    messagingSenderId: "651961236200"
  };

  firebase.initializeApp(config);

  //Displays current time
  (function () {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
        document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
        t = setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();
    })();

    // Variable for referencing database
     var database = firebase.database();

  	// 2. Button for adding Trains
	    $("#addTrain").on("click", function(){

        //Prevents the page from being refreshed
        event.preventDefault();

		// Grabs user input and assign to variables
		var train = $("#trainInput").val().trim();
        var destination  = $("#destinationInput").val().trim();
        var trainFrequency = $("#trainFrequencyInput").val().trim();
        var nextArrival = $("#nextArrivalInput").val().trim();
		var minutesAway = moment($("#minutesAway").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        
        
		console.log(train);
		console.log(destination);
        console.log(trainFrequency);
        console.log(nextArrival);
		console.log(minutesAway);

        //temporary data that will be pushed to firebase later
		var newTrain = {
			name:  train,
			destination: destination,
			trainFrequency: trainFrequency,
            nextArrival: nextArrival,
            minutesAway: minutesAway,
		}

		// pushing new train data into firebase
        database.push(newTrain);

        // Clears all of the text-boxes
         $("#trainInput").val("");
         $("#destinationInput").val("");
         $("#trainFrequencyInput").val("");
         $("#nextArrivalInput").val("");
         $("#minutesAway").val("");

    });

    //code that i got from time telling example- still need to figure out how to incorporate this into my train app
//     // Firebase watcher + initial loader 
//   database.ref().on("child_added", function(childSnapshot, prevChildKey) {  

//   var train = childSnapshot.val().name;
//   var destination = childSnapshot.val().destination;
//   var frequency = childSnapshot.val().trainfrequency;
//   var firstTime = childSnapshot.val().nextArrival;

//   // First Time (pushed back 1 year to make sure it comes before current time)
//   var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
//   console.log(firstTimeConverted);

//   //determine Current Time
//   var currentTime = moment();
//   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));

//   //get timer functioning
//   $("#timer").text(currentTime.format("hh:mm a"));

//   // Difference between the times
//   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//   console.log("DIFFERENCE IN TIME: " + diffTime);

//   // Time apart (remainder)
//   var tRemainder = diffTime % frequency;
//   console.log("Remainder: " + tRemainder);

//   //determine Minutes Away
//   var minutesAway = frequency - tRemainder;
//   console.log("MINUTES TILL TRAIN: " + minutesAway);

//   //determine Next Train Arrival
//   var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
//   console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm a"));

//   // Append train info to table on page
//   $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination  + "</td><td>" + trainFrequency + " mins" + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

});