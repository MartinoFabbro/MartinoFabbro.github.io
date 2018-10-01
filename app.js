/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activeplayer, gamePlaying;

document.querySelector(".dice").style.display = "none";
document.querySelector(".message").style.display = "none";
document.querySelector(".message1").style.display = "none";

var init=function(){
scores = [0,0];
roundScore = 0;
activeplayer = 0;
gamePlaying = true;

document.querySelector(".dice").style.display = "none";
document.getElementById("score-0").textContent="0";
document.getElementById("score-1").textContent="0";

document.getElementById("current-0").textContent="0";
document.getElementById("current-1").textContent="0";

document.getElementById("name-0").textContent="Player 1";
document.getElementById("name-1").textContent="Player 2";

document.querySelector(".player-0-panel").classList.remove("winner");
document.querySelector(".player-1-panel").classList.remove("winner");
document.querySelector(".player-0-panel").classList.remove("active");
document.querySelector(".player-0-panel").classList.add("active");
document.querySelector(".player-1-panel").classList.remove("active");


};

init();

var lastDice;

document.querySelector(".btn-roll").addEventListener("click" , function() {
    if (gamePlaying) {
    var dice = Math.floor(Math.random()*6) +1;
    var diceDom = document.querySelector(".dice");
    diceDom.style.display="block";
    diceDom.src ="dice-"+ dice + ".png";

    if (dice === 6 && lastDice === 6) {
        
        document.querySelector(".message1").style.display = "block";
        scores[activeplayer] = 0;
        document.querySelector("#score-" + activeplayer).textContent=0;
        nextPlayer();




    } else if (dice !== 1) {
        document.querySelector(".message").style.display = "none";
        document.querySelector(".message1").style.display = "none";
        roundScore += dice;
        document.querySelector("#current-" + activeplayer).textContent = roundScore;   
    } else {
        // next player
        nextPlayer();
        
        document.querySelector(".message").style.display = "block";
        var music = document.getElementById("audio");
        music.volume = 0.1;
        // $('#audio')[0].play();
        setTimeout(function(){$("#message").fadeOut("slow")},500);
        
    }
    lastDice=dice;
}
});


var input = document.querySelector(".counter").value;
var winningScore;

if (input) {
    winningScore=input;
} else {
    winningScore= 100 ;
}

document.querySelector(".btn-hold").addEventListener("click",function() {
    if (gamePlaying) {
    scores[activeplayer] += roundScore;
    document.querySelector("#score-" + activeplayer).textContent=scores[activeplayer];

    if (scores[activeplayer] >= winningScore) {
        document.querySelector("#name-"+[activeplayer]).textContent="Winner!";
        document.querySelector(".dice").style.display="none";
        document.querySelector(".player-"+activeplayer+"-panel").classList.add("winner");
        document.querySelector(".player-"+activeplayer+"-panel").classList.remove("active");
        gamePlaying = false;



    } else {
    nextPlayer();
    };  
    }
});

function nextPlayer() {
    
    activeplayer === 0 ? activeplayer = 1 : activeplayer = 0;
    lastDice === 0;
    roundScore = 0;
    
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display="none";
    

};

document.querySelector(".btn-new").addEventListener("click", init);

// dice = Math.floor(Math.random()*6) +1; 
// console.log(dice);

//document.querySelector("#current-" + activeplayer).textContent = dice;

// var  x = document.querySelector("#score-0").textContent;    
// console.log(x);

















