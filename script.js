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
    // Make sure the user choose a valid option
    if (!(
        playerSelection === "rock" ||
        playerSelection === "paper" ||
        playerSelection === "scissors"
    )) {
        return null
    }

    // Get result
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

function game() {
    // Set rounds
    let rounds = 5

    // Start counters
    let winCounter = 0
    let loseCounter = 0
    let drawCounter = 0

    // Loop defined rounds
    for (let i = 1; i <= rounds; i++) {
        const playerSelection = prompt(`Round ${i}\n\nPlease choose one of the following options\n- rock\n-paper\n-scissors`).toLowerCase()
        const computerSelection = getComputerChoice()

        // Compare player and computer selections
        const result = playRound(playerSelection, computerSelection)

        console.log(`Round ${i}:`)

        switch(result) {
            case "winner":
                winCounter++
                console.log(`You win! ${playerSelection} beats ${computerSelection}`)
                break
            case "defeat":
                loseCounter++
                console.log(`You lose! ${playerSelection} is beaten by ${computerSelection}`)
                break
            case "draw":
                drawCounter++
                console.log(`Draw! You both chose ${playerSelection}`)
                break
            default:
                console.log("ERROR. You probably misspelled your choice")
        }
    }

    // Print result and final score
    if (winCounter === loseCounter) {
        console.log("DRAW!")
    } else if (winCounter > loseCounter) {
        console.log("VICTORY!")
    } else {
        console.log("DEFEAT!")
    }

    console.log(`FINAL SCORE:\n- You: ${winCounter}\n- Computer: ${loseCounter}\n* Draw: ${drawCounter}`)
}

// Start game
game()