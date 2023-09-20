// Global Variables
let mainBoard = document.getElementById("main");
let gameInputs = [];
let playerNames = [];
let allFieldsFilled = false;
let playerAmount;

function startGame() {
    getPlayerNames();
    mainBoard.innerHTML = "";
    for(let i = 0; i < playerAmount; i++) {
        mainBoard.innerHTML += htmlSectionTemplate(i);
    }
    positionFooter();
    for(let i = 0; i < playerAmount; i++) {
        gameInputs.push(getInputs(i));
    }
    startEventListeners();
}

function getPlayerNames() {
    let playerName;
    for(let i = 0; i < playerAmount; i++) {
        playerName = document.getElementById(`playerNameInput${i}`).value;
        playerNames.push(playerName); 
    }
}

function showPlayerNameScreen() {
    const playerAmountInput = document.getElementById("playerAmountInput");
    playerAmount = +playerAmountInput.value;
    if(playerAmount > 0 && playerAmount < 20) {
        document.getElementById("showPlayerNamesBtn").remove();
        showPlayerNameInputs(playerAmount);
    }
    document.querySelector(".startscreen-inputs").setAttribute("onsubmit", "startGame(); return false;");
    positionFooter();
}

function showPlayerNameInputs(playerAmount) {
    let startscreenHeading = document.querySelector(".startscreen-heading");
    let startscreenInputs = document.querySelector(".startscreen-inputs");
    startscreenHeading.innerText = `Bitte die Namen der ${playerAmount} Spieler eingeben:`
    startscreenInputs.innerHTML = '';
    for(let i = 0; i < playerAmount; i++) {
        startscreenInputs.innerHTML += htmlPlayerNameInputs(i)
    }
    startscreenInputs.innerHTML += `<button id="startGameBtn" class="start-game-btn">Spiel starten!</button>`
}

function startEventListeners() {
    gameInputs.forEach(inputSet => {
        for (const inputKey in inputSet) {
            if (inputSet.hasOwnProperty(inputKey)) {
                const inputField = inputSet[inputKey];
                
                // Attach the onchange event listener
                inputField.onchange = function(event) {
                    console.log(`Input ${inputKey} changed to: ${event.target.value}`);
                    calculateGesamtInputValue();
                    calculateGesamtObenInputValue();
                    calculateGesamtUntenInputValue();
                    calculateGesamtFinalInputValue();
                    checkGameOver();
                };
            }
        }
    });
}

function safeValue(input) {
    return Number(input.value) || 0;
}

function calculateGesamtInputValue() {
    for (let i = 0; i < playerAmount; i++) {
        gameInputs[i].gesamtOhneBonusInput.value = safeValue(gameInputs[i].einerInput) + safeValue(gameInputs[i].zweierInput) + safeValue(gameInputs[i].dreierInput) + safeValue(gameInputs[i].viererInput) + safeValue(gameInputs[i].fuenferInput) + safeValue(gameInputs[i].sechserInput);
    }
}

function calculateGesamtObenInputValue() {
    for (let i = 0; i < playerAmount; i++) {
        const inputsToCheck = [
            gameInputs[i].einerInput,
            gameInputs[i].zweierInput,
            gameInputs[i].dreierInput,
            gameInputs[i].viererInput,
            gameInputs[i].fuenferInput,
            gameInputs[i].sechserInput
        ];

        const allFieldsGreaterThanZero = inputsToCheck.every(input => safeValue(input) > 0);

        if (allFieldsGreaterThanZero) {
            gameInputs[i].gesamtOben.value = safeValue(gameInputs[i].gesamtOhneBonusInput) + safeValue(gameInputs[i].bonusInput);
        } else {
            gameInputs[i].gesamtOben.value = safeValue(gameInputs[i].gesamtOhneBonusInput);
        }
    }
}

function calculateGesamtUntenInputValue() {
    for (let i = 0; i < playerAmount; i++) {
        let gesamtUnten = 0;
        if(gameInputs[i].fullHouseJaInput.checked) {
            gesamtUnten += 30;
        }
        if(gameInputs[i].kleineStrasseJaInput.checked) {
            gesamtUnten += 35;
        }
        if(gameInputs[i].grosseStrasseJaInput.checked) {
            gesamtUnten += 45;
        }
        if(gameInputs[i].kniffelJaInput.checked) {
            gesamtUnten += 50;
        }
        if(safeValue(gameInputs[i].chanceInput) > 0) {
            gesamtUnten += safeValue(gameInputs[i].chanceInput);
        }
        gameInputs[i].gesamtUntenInput.value = gesamtUnten;

    }
}

function calculateGesamtFinalInputValue() {
    for (let i = 0; i < playerAmount; i++) {
        let finalSum = safeValue(gameInputs[i].gesamtOben) + safeValue(gameInputs[i].gesamtUntenInput);
        gameInputs[i].gesamtFinalInput.value = finalSum;
    }
}

function areAllFieldsFilled() {
    for (let i = 0; i < playerAmount; i++) {
        const inputs = gameInputs[i];
        let playerFieldsFilled = true; // Initially assume all fields for this player are correctly filled.
        
        // Überprüfen Sie, ob alle Textfelder gefüllt sind
        for (const inputKey in inputs) {
            if (inputs.hasOwnProperty(inputKey) && inputKey.indexOf('Input') !== -1 && !inputs[inputKey].value) {
                playerFieldsFilled = false; // A field is empty.
                break;  // Exit the inner loop since we've found a field that isn't filled.
            }
        }

        // If any input field was empty, move on to the next player without checking checkboxes
        if (!playerFieldsFilled) continue;

        // Überprüfen Sie die Checkboxen
        if (!(inputs.fullHouseJaInput.checked ^ inputs.fullHouseNeinInput.checked)) {
            playerFieldsFilled = false;
        }
        if (!(inputs.kleineStrasseJaInput.checked ^ inputs.kleineStrasseNeinInput.checked)) {
            playerFieldsFilled = false;
        }
        if (!(inputs.grosseStrasseJaInput.checked ^ inputs.grosseStrasseNeinInput.checked)) {
            playerFieldsFilled = false;
        }
        if (!(inputs.kniffelJaInput.checked ^ inputs.kniffelNeinInput.checked)) {
            playerFieldsFilled = false;
        }

        // If after all checks, the playerFieldsFilled remains true, we can assume all fields for this player are filled.
        if (playerFieldsFilled) {
            gameInputs[i].allFieldsFilled = true;
            return true; // At least one player has all fields filled correctly.
        }
    }

    return false; // No players have all fields filled correctly.
}


function checkGameOver() {
    if (areAllFieldsFilled()) {
        gameOver();
    }
}

function gameOver() {
    console.log("Game Over!");
    for(let i = 0; i < playerAmount; i++) {
        gameInputs[i]["finalScore"] = gameInputs[i].gesamtFinalInput.value;
    }
    mainBoard.innerHTML = "";
    mainBoard.innerHTML = htmlEndScreen();
    for(let i = 0; i < playerAmount; i++) {
        document.getElementById("scoringTable").innerHTML += htmlPlayerScoreTableRow(i);
    }

}




function getInputs(i) {
    return {
        playerName: playerNames[i],
        einerInput: document.getElementById(`einer${i}`),
        zweierInput: document.getElementById(`zweier${i}`),
        dreierInput: document.getElementById(`dreier${i}`),
        viererInput: document.getElementById(`vierer${i}`),
        fuenferInput: document.getElementById(`fuenfer${i}`),
        sechserInput: document.getElementById(`sechser${i}`),
        gesamtOhneBonusInput: document.getElementById(`gesamtOhneBonus${i}`),
        bonusInput: document.getElementById(`bonus${i}`),
        gesamtOben: document.getElementById(`gesamtOben${i}`),
        dreierPaschInput: document.getElementById(`dreierPasch${i}`),
        viererPaschInput: document.getElementById(`viererPasch${i}`),
        fullHouseJaInput: document.getElementById(`fullHouseJa${i}`),
        fullHouseNeinInput: document.getElementById(`fullHouseNein${i}`),
        kleineStrasseJaInput: document.getElementById(`kleineStrasseJa${i}`),
        kleineStrasseNeinInput: document.getElementById(`kleineStrasseNein${i}`),
        grosseStrasseJaInput: document.getElementById(`grosseStrasseJa${i}`),
        grosseStrasseNeinInput: document.getElementById(`grosseStrasseNein${i}`),
        kniffelJaInput: document.getElementById(`kniffelJa${i}`),
        kniffelNeinInput: document.getElementById(`kniffelNein${i}`),
        chanceInput: document.getElementById(`chance${i}`),
        gesamtUntenInput: document.getElementById(`gesamtUnten${i}`),
        gesamtFinalInput: document.getElementById(`gesamtFinal${i}`),
        allFieldsFilled: false,
    }
}

function positionFooter() {
    const footer = document.querySelector('footer');
    const contentHeight = document.body.offsetHeight;
    const viewportHeight = window.innerHeight;
  
    if (contentHeight > viewportHeight) {
      footer.style.position = 'static';
    } else {
      footer.style.position = 'absolute';
      footer.style.bottom = '0';
    }
  }
  window.onload = positionFooter;
  