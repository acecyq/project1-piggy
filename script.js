var dice = {
	0:1,
	1:1
};
var score = {
	0:0,
	1:0
};
var mainScore = {
	0:0,
	1:0
};
var player = ["", ""];
var playing = 0;
var name0 = document.getElementById("name0");
var name1 = document.getElementById("name1");
var dice0 = document.getElementById("dice0");
var dice1 = document.getElementById("dice1");
var roll = document.getElementById("roll");
var score0 = document.getElementById("score0");
var score1 = document.getElementById("score1");
var arrow = document.getElementsByClassName("arrow");
var scoreBox = document.getElementsByClassName("score");
var hold = document.getElementById("hold");
var mainScore0 = document.getElementById("mainScore0");
var mainScore1 = document.getElementById("mainScore1");
var restart = document.getElementsByClassName("restart")[0];


// set players' names

do {
	player[0] = prompt("Enter Player 1's name:");
}
while (player[0] === "");
do {
	player[1] = prompt("Enter Player 2's name:");	
}
while (player[1] === "");
do {
	var endScore = prompt("Enter final score to reach:");
	endScore = parseInt(endScore);
}
while (isNaN(endScore) === true || endScore === "");
// player[0] = "MATTHEW";
// player[1] = "GOLIATH";
// var endScore = 100;
name0.textContent = player[0].toUpperCase();
name1.textContent = player[1].toUpperCase();


// change player

var changePlayer = function() {
	if (playing === 0) {
		playing = 1;
	} else {
		playing = 0;
	}
	for (var i = 0; i < arrow.length; i++) {
		arrow[i].classList.toggle("show");
	}
	for (var j = 0; j < scoreBox.length; j++) {
		scoreBox[j].classList.toggle("border");
	}
}


// update the score board

var updateScore = function() {
	score0.textContent = score[0];
	score1.textContent = score[1];
	mainScore0.textContent = mainScore[0];
	mainScore1.textContent = mainScore[1];
}


// check if die are the same or any of the die is 6

var checkDice = function(a, b) {
	if (a === b) {
		score[playing] = 0;
		updateScore();
		changePlayer();
	} else {
		var sum = a + b;
		score[playing] += sum;
		updateScore();
	}
}


// check if any player has won

var checkWin = function() {
	for (var i = 0; i < 2; i++) {
		if (mainScore[i] >= endScore) {
			alert(player[playing] + " has won!");
			roll.removeEventListener("click", rollDice);
			hold.removeEventListener("click", holdScore);
		}
	}
}


// hold score and push current to main score

var holdScore = function() {
	mainScore[playing] += score[playing];
	score[playing] = 0;
	updateScore();
	checkWin();
	changePlayer();
}


// roll dice

var rollDice = function() {

	// generate random numbers for dice values

	dice[0] = Math.floor(Math.random() * 6 + 1);
	dice[1] = Math.floor(Math.random() * 6 + 1);

	// change images to show dice values

	dice0.style.backgroundImage = "url('images/" + dice[0] + ".png')";
	dice1.style.backgroundImage = "url('images/" + dice[1] + ".png')";

	checkDice(dice[0], dice[1]);
}


// reset game

var startGame = function() {
	roll.addEventListener("click", rollDice);
	hold.addEventListener("click", holdScore);
	score[0] = 0;
	score[1] = 0;
	mainScore[0] = 0;
	mainScore[1] = 0;
	updateScore();
}

startGame();
restart.addEventListener("click", startGame);





