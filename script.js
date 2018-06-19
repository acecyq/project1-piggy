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
var static = 1;
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
var attack = document.getElementById("attack");
var multiplier = 1;
var escape = 0;
var bonus = document.getElementsByClassName("bonus");
var popup = document.getElementById("popup");
var pic = document.getElementsByClassName("pic");
var messageText = document.getElementById("messageText");


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
// var endScore = 50;
name0.textContent = player[0].toUpperCase();
name1.textContent = player[1].toUpperCase();


// generate random number

var mr = function(a) {
	var result = Math.floor(Math.random() * a + 1);
	return result;
}


// display element

var show = function(el) {
	el.style.visibility = "visible";
}


// make element invisible

var hide = function(el) {
	el.style.visibility = "hidden";
}


// show change player

var showChange = function(a, b, c, url) {
	popup.style.display = "block";
	for (var i = 0; i < pic.length; i++) {
		pic[i].children[0].src = url;
	}
	setTimeout(function() {
		show(pic[a])
	}, 200);
	setTimeout(function() {
		show(pic[b])
	}, 400);
	setTimeout(function() {
		show(pic[c])
	}, 600);
	setTimeout(function() {
		popup.style.display="none";
	}, 800);
	setTimeout(function() {
		for (var i = 0; i < pic.length; i++) {
			hide(pic[i]);
		}
	}, 800);

	
}


// hide alert

var hideAlert = function() {
	popup.style.display = "none";
	messageText.style.display = "none";
}


// show alert

var showAlert = function(text) {
	popup.style.display = "block";
	messageText.textContent = text;
	messageText.style.display = "block";
	popup.addEventListener("click", hideAlert);
}


// change player

var changePlayer = function() {
	bonus[playing].style.backgroundImage = "url('images/bonus.png')";
	if (playing === 0) {
		showChange(0,1,2,"images/arrowR.png");
		playing = 1;
		static = 0;
	} else {
		showChange(2,1,0,"images/arrowL.png");
		playing = 0;
		static = 1;
	}
	for (var i = 0; i < arrow.length; i++) {
		arrow[i].classList.toggle("show");
	}
	for (var j = 0; j < scoreBox.length; j++) {
		scoreBox[j].classList.toggle("border");
	}
	multiplier = 1;
}


// show the scores rolling

var updateNumber = function(scoreDisplay, score) {
	var num = parseInt(scoreDisplay.textContent);
	// var timer = Math.abs((score - num) * 100);
	var timer = Math.abs(1000 / (score-num));
	var roll = setInterval(function() {
		if (score > num) {
			num += 1;
		} else if (score < num) {
			num -= 1;
		}
		scoreDisplay.textContent = num;
	}, timer);
	setTimeout(function() {
		clearInterval(roll);
	}, 1000);
}


// update the score board

var updateScore = function() {
	
	updateNumber(score0, score[0]);
	updateNumber(score1, score[1]);
	updateNumber(mainScore0, mainScore[0]);
	updateNumber(mainScore1, mainScore[1]);
}


// check if die are the same or any of the die is 6

var checkDice = function(a, b) {
	if (a === b) {
		if (escape > 0) {
			escape -= 1;
		} else {
			score[playing] = 0;
			updateScore();
			changePlayer();
		}
	} else {
		var sum = a + b;
		score[playing] += sum * multiplier;
		updateScore();
	}
}


// check if any player has won

var checkWin = function() {
	for (var i = 0; i < 2; i++) {
		if (mainScore[i] >= endScore) {
			showAlert(player[i] + " has won! Final score is " + mainScore[0] + " and " + mainScore[1] + "!");
			roll.removeEventListener("click", rollDice);
			hold.removeEventListener("click", holdScore);
			attack.removeEventListener("click", dealDamage);
			return true;
		} else {
			return false;
		}
	}
}


// hold score and push current to main score

var holdScore = function() {
	mainScore[playing] += score[playing];
	score[playing] = 0;
	updateScore();
	if (checkWin() === false) {
		changePlayer();	
	}
}


// roll dice

var rollDice = function() {


	// generate random numbers for dice values

	dice[0] = mr(6);
	dice[1] = mr(6);


	// animate rolling dice

	var rolling = setInterval(function() {
		dice0.style.backgroundImage = "url('images/" + mr(6) + ".png')";
		dice1.style.backgroundImage = "url('images/" + mr(6) + ".png')";
	}, 200);

	setTimeout(function() {
		clearInterval(rolling);
	}, 1000);


	// change images to show dice values
	
	setTimeout(function() {
		dice0.style.backgroundImage = "url('images/" + dice[0] + ".png')";
		dice1.style.backgroundImage = "url('images/" + dice[1] + ".png')";
	}, 1000);

	giveBonus();
	checkDice(dice[0], dice[1]);
}


// deal damage to opponent main score

var dealDamage = function() {
	mainScore[static] -= score[playing];
	if (mainScore[static] < 0) {
		mainScore[static] = 0;
	}
	score[playing] = 0;
	updateScore();
	changePlayer();
}


// give bonus to player

var giveBonus = function() {
	var bonusType = mr(20);
	// var bonusType = 20;
	if (dice[0] !== dice[1]) {
		switch(bonusType) {
			case 5:
				multiplier *= 2;
				bonus[playing].style.backgroundImage = "url('images/multiply.png')";
				showAlert("Dice roll X " + multiplier + "!");
				checkWin();
				break;
			case 10:
				mainScore[static] = parseInt(mainScore[static] * 0.5);
				bonus[playing].style.backgroundImage = "url('images/decrease.png')";
				showAlert("Opponent score - 50%!");
				break;
			case 15:
				escape += 1;
				bonus[playing].style.backgroundImage = "url('images/shield.png')";
				showAlert("Escape the next player change X " + escape + " time(s)!");
				break;
			case 20:
				mainScore[playing] = parseInt(mainScore[playing] * 1.5);
				bonus[playing].style.backgroundImage = "url('images/plus.png')";
				showAlert("Main score + 50%!");
				checkWin();
				break;
			default:
				bonus[playing].style.backgroundImage = "url('images/bonus.png')";
				break;
		}
	}
}


// reset game

var startGame = function() {
	roll.addEventListener("click", rollDice);
	hold.addEventListener("click", holdScore);
	attack.addEventListener("click", dealDamage);
	restart.addEventListener("click", startGame);	
	score[0] = 0;
	score[1] = 0;
	mainScore[0] = 0;
	mainScore[1] = 0;
	multiplier = 1;
	updateScore();
}

window.onload = startGame();






