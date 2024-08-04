var buttonColours = ["red","blue","green","yellow"];
var button = $(".btn")
var userClickedButton=[];
var gamePattern =[];
var gameStarted =false;
var level = 0;

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+gamePattern.at(-1)).fadeOut(100).fadeIn(100);
  playSound(gamePattern.at(-1));
  level = level +1;
  $("h1").text("level "+level)
}

function handleClick(){
  var userChosenColour= this.id;
  animation(userChosenColour);
  userClickedButton.push(userChosenColour);
  playSound(this.id);
  checkAnswer(userClickedButton.length);
}

function animation(id){
  var activeButton =  document.querySelector("."+id);
  activeButton.classList.add("pressed");
  setTimeout(function(){
    activeButton.classList.remove("pressed");
  },100)
}

for (var i = 0; i <button.length; i++ ){
  button[i].addEventListener("click", handleClick);
}

function playSound(key){
  switch (key) {
    case "yellow":
        var yellow = new Audio("sounds/yellow.mp3");
        yellow.play();
      break;
    case "green":
        var green = new Audio("sounds/green.mp3");
        green.play();
      break;
    case "blue":
          var blue = new Audio("sounds/blue.mp3");
          blue.play();
      break;
    case "red":
          var red = new Audio("sounds/red.mp3");
          red.play();
        break;
    default:
      console.log(key);
  }
}

function startGame(){
  if (!gameStarted){
    nextSequence();
    gameStarted = true;
  }else{
    console.log("Game has started");
  }
}

function checkAnswer(currentLevel){
  console.log(gamePattern);
  if(userClickedButton[currentLevel-1]==gamePattern[currentLevel-1]){
    console.log("Success");
  }else{
    console.log("Fail");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart")
    userClickedButton = [];
    startOver();
  }
  if (currentLevel == gamePattern.length ){
    userClickedButton = [];
    setTimeout(nextSequence, 1000);
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
document.addEventListener("keydown", startGame);
