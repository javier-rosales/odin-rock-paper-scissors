// Get random number between a range (both parameters included)
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
    // Make the player selection case insentitive
    playerSelection = playerSelection.toLowerCase()

    // Make sure the user choose a valid option
    if (!(
        playerSelection === "rock" ||
        playerSelection === "paper" ||
        playerSelection === "scissors"
    )) {
        return "Please choose a valid option"
    }

    // Get result
    if (playerSelection === computerSelection) {
        return [`Draw! You both chose ${playerSelection}`, "draw"]
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        return [`You win! ${playerSelection} beats ${computerSelection}`, "winner"]
    }
    return [`You lose! ${computerSelection} beats ${playerSelection}`, "loser"]
}

function game() {
    let winCounter = 0
    let loseCounter = 0
    let drawCounter = 0

    for (let i = 1; i <= 5; i++) {
        const playerSelection = prompt(`Round ${i}:\n(Please enter one of the following options: rock, paper, scissors)`)
        const computerSelection = getComputerChoice()

        const result = playRound(playerSelection, computerSelection)

        if (typeof result === "object") {
            if (result[1] === "winner") {
                winCounter++
            } else if (result[1] === "loser") {
                loseCounter++
            } else {
                drawCounter++
            }
    
            console.log(`Round ${i} result: ${result[0]}`)
        }
    }

    if (winCounter === loseCounter) {
        console.log("DRAW!")
    } else if (winCounter > loseCounter) {
        console.log("YOU WIN!")
    } else {
        console.log("YOU LOSE!")
    }

    console.log(`FINAL SCORE:\n- You: ${winCounter}\n- Computer: ${loseCounter}\n* Draw: ${drawCounter}`)
}

game()