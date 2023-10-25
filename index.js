const scoreAreaEl = document.querySelector('.scoreArea');
const displayAreaEl = document.querySelector('.displayArea');
let scoreBoard = JSON.parse(localStorage.getItem('score'));
if(!scoreBoard){
    scoreBoard = {
        wins : 0,
        ties : 0,
        lose : 0
    };
}
scoreAreaEl.innerHTML = `Wins : ${scoreBoard.wins} Ties : ${scoreBoard.ties} Losses : ${scoreBoard.lose}`;
function computerPick(){
    const randomNum = Math.random();
    if(randomNum >= 0 && randomNum < 1/3)
        return "rock";
    else if(randomNum >= 1/3 && randomNum < 2/3)
        return "paper";
    else
        return "scissor";
}
function findWinner(userChoice , computerChoice){
    if(userChoice === 'rock'){
        if(computerChoice === 'rock')
            return 'tie';
        else if(computerChoice === 'paper')
            return 'computer';
        else
            return 'user';
    }
    else if(userChoice === 'paper'){
        if(computerChoice === 'rock')
            return 'user';
        else if(computerChoice === 'paper')
            return 'tie';
        else
            return 'computer';
    }
    else{
        if(computerChoice === 'rock')
            return 'computer';
        else if(computerChoice === 'paper')
            return 'user';
        else
            return 'tie';
    }
}
function updateScore(winner){
    let scoreBoard = JSON.parse(localStorage.getItem('score'));
    if(scoreBoard === null){
        scoreBoard = {
            wins : 0,
            ties : 0,
            lose : 0
        };
    }
    if(winner === 'user')
        scoreBoard['wins']++;
    else if(winner === 'computer')
        scoreBoard['lose']++;
    else
        scoreBoard['ties']++;
    scoreAreaEl.innerHTML = `Wins : ${scoreBoard.wins} Ties : ${scoreBoard.ties} Losses : ${scoreBoard.lose}`;
    localStorage.removeItem('score');
    localStorage.setItem('score' , JSON.stringify(scoreBoard));
    
}
function restartGame(){
    localStorage.removeItem('score');
    scoreBoard['wins'] = scoreBoard['lose'] = scoreBoard['ties'] = 0;
    scoreAreaEl.innerHTML = `Wins : ${scoreBoard.wins} Ties : ${scoreBoard.ties} Losses : ${scoreBoard.lose}`;
    displayAreaEl.innerText = '';
    localStorage.setItem('score' , JSON.stringify(scoreBoard));
}
function playGame(userChoice){
    const computerChoice = computerPick();
    const userPickImg = userChoice + '-emoji.png';
    const computerPickImg = computerChoice + '-emoji.png';
    displayAreaEl.innerHTML = `<p>You : <img src = '${userPickImg}' class ='showMoves'> Computer : <img src = '${computerPickImg}' class ='showMoves'></p>`;
    const winner = findWinner(userChoice , computerChoice);
    updateScore(winner);
    const scoreBoard = JSON.parse(localStorage.getItem('score'));
    console.log(userChoice , computerChoice , winner , scoreBoard);
}
