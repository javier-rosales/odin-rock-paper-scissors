function getRandom(start, end) {
    return Math.round(Math.random() * (end - start)) + start
}

function getComputerChoice() {
    const randomIndex = getRandom(1, 3)

    switch(randomIndex) {
        case 1:
            return "rock"
            break
        case 2:
            return "paper"
            break
        case 3:
            return "scissors"
    }
}

function playRound(playerSelection, computerSelection) {
    if (!(
        playerSelection === "rock" ||
        playerSelection === "paper" ||
        playerSelection === "scissors"
    )) {
        return null
    }

    if (playerSelection === computerSelection) {
        return "draw"
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        return "win"
    }
    return "defeat"
}