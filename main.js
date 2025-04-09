var buttonColor = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// Start the game on keypress
$(document).on("keypress", function () {
  if (!started) {
    nextsequence();
    $("#level-title").html("Level " + level);
    started = true;
  }
});

// Generate the next sequence
function nextsequence() {
  userClickedPattern = []; // Reset user pattern for the new level
  level++;
  $("#level-title").html("Level " + level);

  var randomNum = Math.floor(4*Math.random());
  var randomChosenColor = buttonColor[randomNum];
  gamepattern.push(randomChosenColor);

  // Animate the button and play sound
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// Handle button clicks
$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1); // Check the user's input
});

$(".btn").on("keypress", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1); // Check the user's input
});

// Play sound for a given color
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// Animate the button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 150);
}

// Check the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamepattern[currentLevel]) {
    // Check if the user has finished the sequence
    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(function () {
        nextsequence(); // Go to the next level
      }, 1000);
    }
  } else {
    playSound("wrong"); // Play wrong sound
    $("body").addClass("game-over");
    $("#level-title").html("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver(); // Reset the game
  }
}

// Restart the game
function startOver() {
  level = 0;
  gamepattern = [];
  started = false;
}
