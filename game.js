var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ['red','blue','green','yellow'];
var level = 0;
var gameStarted = false;

$(document).keydown(function(){
  if(!gameStarted){
    $('h1').text('Level '+level);
    nextSequence();
    gameStarted=true;
  };
});

function nextSequence() {
  userClickedPattern=[];
  level++;
  $('h1').text('Level '+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

$('.btn').click(function(){
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  var lastIndex = (userClickedPattern.length)-1;
  checkAnswer(lastIndex);
  playSound(userChosenColour);
  //nextSequence();
  animatePress(userChosenColour);
});

function playSound(name) {
  var audio = new Audio('sounds/' +name+ '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $('#'+currentColour).addClass('pressed');
  setTimeout(() => {
    $('#'+currentColour).removeClass('pressed');
  }, 100)
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log('Success');
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(() => {
        nextSequence();
      },1000);
    }
  }
  else{
    $('#level-title').text('Game Over, Press Any Key to Restart');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    },200);
    console.log('Failed');
    startOver();
  }
}

function startOver(){
  //$('#level-title').text('Press A Key to Start');
  level=0;
  gamePattern = [];
  gameStarted=false;
  //userClickedPattern = [];
}
