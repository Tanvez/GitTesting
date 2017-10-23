function generateWinningNumber(){
    var result =  Math.floor(Math.random()*(100) );
     return result+1;
}

function shuffle(arr){
var len = arr.length,
    i ,
    swap;
    while(len){
        i = Math.floor(Math.random()*len--);
        swap = arr[len];
        arr[len]= arr[i]; // kinda like bubble sorting 
        arr[i] = swap;
    }       

    return arr;
}

function Game(){
    this.playersGuess= null;
    this.pastGuesses = [];
    this.winningNumber =  generateWinningNumber.call(this);
        
}

Game.prototype.difference = function(){
return Math.abs(this.playersGuess-this.winningNumber);
}

Game.prototype.isLower = function(){
if(this.playersGuess < this.winningNumber){
    return true
} return false;
}

Game.prototype.playersGuessSubmission = function (num){

if(num<1 || num >100|| typeof num !=='number' || String(num) === 'NaN') {
    throw 'That is an invalid guess.'
}
this.playersGuess = num;
return Game.prototype.checkGuess.call(this);
}

Game.prototype.checkGuess = function(){
var diff = Game.prototype.difference.apply(this);
if(this.playersGuess === this.winningNumber){   
    $('#hint, #submit, #player-input').prop("disabled",true);
    $('h1').text("Press the Reset button to play again!")
    return 'You Win!'
} else {
    if(this.pastGuesses.includes(this.playersGuess))return 'You have already guessed that number.'
    else{
        this.pastGuesses.push(this.playersGuess);
        $('#guesses li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess); // pushing guesses into li
        if(this.pastGuesses.length===5){
            $('#hint, #submit, #player-input').prop("disabled",true);
            $('h1').text("Press the Reset button to play again!");
            return 'You Lose. The correct number was '+ this.winningNumber
        } else{
        if(diff<10) {return "You're burning up!"}
        else if(diff<25){return "You're lukewarm."}
        else if(diff<50){return "You're a bit chilly."}
        else return "You're ice cold!"}
        }
    }
}
Game.prototype.provideHint = function (){
var hint = [];
hint.push(this.winningNumber);
for(var i=0; i<2; i++){
  hint.push( generateWinningNumber());
}
return shuffle(hint);   
}

function newGame(){
return new Game;
}

function makeAGuess(n){ // callback function
    var guess = +$('#player-input').val();
    $('#player-input').val('');
    var output = n.playersGuessSubmission(parseInt(guess,10));
    $('h1').text(output);
    
}

$(document).ready (function(){
var n = new Game;

$('#submit').on('click', function(){ // also enters numbers through click
   makeAGuess(n); //uses call back function
});
$('#player-input').keypress(function(event) {
    if ( event.which === 13 ) { // 13 is the enter key
       makeAGuess(n);
    }
})
$('#hint').click(function(){
    var hints = n.provideHint();
    $('h1').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
});
$('#reset').click(function() {
    n = newGame();
    $('h1').text('Play the Guessing Game!');
    $('h2').text('Guess a number between 1-100!')
    $('.guess').text('-');
    $('#hint, #submit, #player-input').prop("disabled",false);
})

});