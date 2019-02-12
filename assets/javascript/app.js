
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

    // variable for referencing database
  var database = firebase.database();

  	// 2. Button for adding Trains
	$("#addTrain").on("click", function(){

		// Grabs user input and assign to variables
		var train = $("#train").val().trim();
        var destination = $("#destination").val().trim();
        var trainFrequency = $("#trainFrequency").val().trim();
        var nextArrival = $("#nextArrival").val().trim();
		var minutesAway = moment($("#minutesAway").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        
        // Testing for variables entered
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
        trainData.push(newTrain);

        // Append train info to table on page
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextArrival + "</td><td>" + minutes + "</td></tr>");

	});