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

const options = document.querySelectorAll(".choice")
const playerScore = document.querySelector(".score__player")
const computerScore = document.querySelector(".score__computer")
const playerImage = document.querySelector(".player__img")
const computerImage = document.querySelector(".computer__img")

let playerScoreCount = 0
let computerScoreCount = 0

options.forEach(option => {
    option.addEventListener("click", e => {
        const playerChoice = e.currentTarget.getAttribute("data-choice")
        const computerChoice = getComputerChoice()

        playerImage.setAttribute("src", `assets/images/${playerChoice}.png`)
        computerImage.setAttribute("src", `assets/images/${computerChoice}.png`)

        const result = playRound(playerChoice, computerChoice)
        let feedback = ""

        switch(result) {
            case "win":
                playerScoreCount ++
                playerScore.textContent = playerScoreCount
                feedback = `${playerChoice} beats ${computerChoice}`
                break
            case "defeat":
                computerScoreCount ++
                computerScore.textContent = computerScoreCount
                feedback = `${computerChoice} beats ${playerChoice}`
                break
            case "draw":
                feedback = `you both chose ${playerChoice}`
        }


        const resultContent = document.querySelector(".result")
        if (resultContent) {
            updateRoundResultMessage(result, feedback)
        } else {
            addRoundResultMessage(result, feedback)
        }

        if (playerScoreCount === 5) {
            showModal(result)
        } else if (computerScoreCount === 5) {
            showModal(result)
        }
    })
})

function restartGame() {
    removeRoundResultMessage()

    playerScoreCount = 0
    computerScoreCount = 0
    playerScore.textContent = playerScoreCount
    computerScore.textContent = computerScoreCount

    playerImage.setAttribute("src", "assets/images/player.png")
    computerImage.setAttribute("src", "assets/images/computer.png")
}

function addRoundResultMessage(result, feedback) {
    const resultContent = document.createElement("div")
    resultContent.classList.add("result")

    const resultMessage = document.createElement("div")
    resultMessage.classList.add("text")
    resultMessage.classList.add("text--center")
    resultMessage.classList.add("text--semibold")

    switch(result) {
        case "win":
            resultMessage.classList.add("text--green")
            resultMessage.textContent = "You win!"
            break
        case "defeat":
            resultMessage.classList.add("text--red")
            resultMessage.textContent = "You lose!"
            break
        case "draw":
            resultMessage.textContent = "Draw!"
    }

    const feedbackMessage = document.createElement("div")
    feedbackMessage.classList.add("text")
    feedbackMessage.classList.add("text--center")
    feedbackMessage.classList.add("text--grey")
    feedbackMessage.classList.add("subtext")
    feedbackMessage.textContent = feedback

    resultContent.appendChild(resultMessage)
    resultContent.appendChild(feedbackMessage)

    const main = document.querySelector("main")
    const score = document.querySelector(".score")
    main.insertBefore(resultContent, score)
}

function updateRoundResultMessage(result, feedback) {
    const resultContent = document.querySelector(".result")
    if (resultContent) {
        const resultMessage = document.querySelector(".result :first-child")
        const feedbackMessage = document.querySelector(".result :last-child")

        resultMessage.classList.remove("text--green")
        resultMessage.classList.remove("text--red")

        switch(result) {
            case "win":
                resultMessage.classList.add("text--green")
                resultMessage.textContent = "You win!"
                break
            case "defeat":
                resultMessage.classList.add("text--red")
                resultMessage.textContent = "You lose!"
                break
            case "draw":
                resultMessage.textContent = "Draw!"
        }

        feedbackMessage.textContent = feedback
    }
}

function removeRoundResultMessage() {
    const resultContent = document.querySelector(".result")
    if (resultContent) {
        resultContent.parentNode.removeChild(resultContent)
    }
}

const modal = document.querySelector(".modal")
const modalTitle = document.querySelector(".modal-title")
const restartGameButton = document.querySelector(".restart")
const overlay = document.querySelector(".overlay")

restartGameButton.addEventListener("click", () => {
    restartGame()
    closeModal()
})

function showModal(result) {
    modalTitle.classList.remove("text--green")
    modalTitle.classList.remove("text--red")

    if (result === "win") {
        modalTitle.classList.add("text--green")
        modalTitle.textContent = "VICTORY!"
    } else {
        modalTitle.classList.add("text--red")
        modalTitle.textContent = "DEFEAT!"
    }

    modal.classList.remove("disable")
    overlay.classList.remove("disable")
    
    modal.classList.add("active")
    overlay.classList.add("active")
}

function closeModal() {
    modal.classList.remove("active")
    overlay.classList.remove("active")
    
    modal.classList.add("disable")
    overlay.classList.add("disable")
}