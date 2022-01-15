let randNum;
let nextColour;
let gamePattern = [];
let userPattern = [];
let buttonColours = ["red", "lime", "cyan", "orange"];
let gameStarted = false;
let level = 0;
let playbackCounter = 0;
let animationOn = true;
let highscore = 0;
let repeatPrev = true;

$("#score").append(highscore);

function nextSequence() {
  level++;
  $("#level-title").html("level " + level + "<br>" + "You got this!");
  playback();
}

function playback() {
  setTimeout(function() {
    if (repeatPrev && playbackCounter < gamePattern.length) {
      let currentColour = gamePattern[playbackCounter];
      soundAndAnimation(currentColour);
      playbackCounter++;
      playback();
    } else {
      playbackCounter = 0;
      randNum = Math.floor(Math.random() * 4);
      nextColour = buttonColours[randNum];
      soundAndAnimation(nextColour);

      gamePattern.push(nextColour);
      animationOn = false;
    }
  }, 500)
}

$(".btn").click(function() {
  if (!(animationOn)) {
    let userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    pressAnimation(userChosenColour);
    playSound(userChosenColour);
    let current = userPattern.length - 1;
    if (userPattern[current] !== gamePattern[current]) {
      reset();
    } else if (userPattern.length === gamePattern.length) {
      checkAnswer();
    }
  }
});

function playSound(fileName) {
  let audioFile = "sounds/" + fileName + ".mp3"
  let soundEffect = new Audio(audioFile);
  soundEffect.play();
}

function pressAnimation(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed");
  }, 100);
}

function soundAndAnimation(colour) {
  playSound(colour);
  $("#" + colour).animate({
    opacity: .25
  }).animate({
    opacity: 1
  }, 100);
}

$(document).keydown(function() {
  if (!(gameStarted)) {
    nextSequence();
    gameStarted = true;
  }
});

function checkAnswer() {
  let correct = true;
  for (let i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] !== userPattern[i]) {
      correct = false;
      break;
    }
  }

  if (correct) {
    setTimeout(nextSequence, 1000);
    animationOn = true;
    userPattern = [];
  } else {
    reset();
  }
}

function reset() {
  playSound("wrong");
  if (level <= highscore) {
    $("#level-title").text("You lost on level " + level + ", ");
    $("#level-title").append("<br> Press Any Key to Try Again!");
    }
    else {
      highscore = level;
      $("#level-title").text("New High Score: level " + level + ", ");
      $("#level-title").append("<br> Press Any Key to Try Again!");
      $("#score").text("highscore: " + highscore);
    }
    animationOn = true
    gamePattern = [];
    userPattern = [];
    level = 0;
    playbackCounter = 0;
    gameStarted = false;
  }
