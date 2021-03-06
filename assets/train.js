  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAFNCLQq5ncrp35_0jDFBstBnb3ShdEm0U",
    authDomain: "trains-trains-trains.firebaseapp.com",
    databaseURL: "https://trains-trains-trains.firebaseio.com",
    // projectId: "trains-trains-trains",
    storageBucket: "trains-trains-trains.appspot.com",
    // messagingSenderId: "57565718942"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrain").on('click', function(event) {
    event.preventDefault();

    var keyName = $('#trainNameInput').val().trim();
    var keyDest = $('#destinationInput').val().trim();
    var keyStart = moment($('#startInput').val().trim(), "HH:mm").format("HH:mm");
    var keyFreq = $('#frequencyInput').val().trim();

    var newTrain = {
      name: keyName,
      dest: keyDest,
      start: keyStart,
      frequency: keyFreq
    }

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.frequency)

    $('#trainNameInput').val('');
    $('#destinationInput').val('');
    $('#startInput').val('');
    $('#frequencyInput').val('');

    return false;

  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    var keyName = childSnapshot.val().name;
    var keyDest = childSnapshot.val().dest;
    var keyStart = childSnapshot.val().start;
    var keyFreq = childSnapshot.val().frequency;

    console.log(keyName);
    console.log(keyDest);
    console.log(keyStart);
    console.log(keyFreq);

    
    // First Train Time (pushed back 1 year to make sure it comes before current time)
    var timeConv = moment(keyStart, "HH:mm").subtract(1, "years");
    console.log(timeConv);

    // Current Time
    var curTime = moment();
    console.log("CURRENT TIME: " + moment(curTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(timeConv), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var trnRem = diffTime % keyFreq;
    console.log(trnRem);

    // Minute Until Train
    var minAway = keyFreq - trnRem;
    console.log("MINUTES TILL TRAIN: " + minAway);

    // Next Train
    var nextArrival = moment().add(minAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));


    $("#trainTable > tbody").append("<tr><td>" + keyName + "</td><td>" + keyDest + "</td><td>" + keyFreq + "</td><td>" + moment(nextArrival).format("HH:mm") + "</td><td>" + minAway + "</td><tr>");



  });



































