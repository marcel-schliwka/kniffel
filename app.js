// Global Variables
let mainBoard = document.getElementById("main");
let gameInputs = [];
let playerNames = [];
let allFieldsFilled = false;
let playerAmount;

function startGame() {
  getPlayerNames();
  mainBoard.innerHTML = "";
  for (let i = 0; i < playerAmount; i++) {
    mainBoard.innerHTML += htmlSectionTemplate(i);
  }
  positionFooter();
  for (let i = 0; i < playerAmount; i++) {
    gameInputs.push(getInputs(i));
  }
  startEventListeners();
}

function getPlayerNames() {
  let playerName;
  for (let i = 0; i < playerAmount; i++) {
    playerName = document.getElementById(`playerNameInput${i}`).value;
    playerNames.push(playerName);
  }
}

function showPlayerNameScreen() {
  const playerAmountInput = document.getElementById("playerAmountInput");
  playerAmount = +playerAmountInput.value;
  if (playerAmount > 0 && playerAmount < 20) {
    document.getElementById("showPlayerNamesBtn").remove();
    showPlayerNameInputs(playerAmount);
  }
  document
    .querySelector(".startscreen-inputs")
    .setAttribute("onsubmit", "startGame(); return false;");
  positionFooter();
}

function showPlayerNameInputs(playerAmount) {
  let startscreenHeading = document.querySelector(".startscreen-heading");
  let startscreenInputs = document.querySelector(".startscreen-inputs");
  startscreenHeading.innerText = `Bitte die Namen der ${playerAmount} Spieler eingeben:`;
  startscreenInputs.innerHTML = "";
  for (let i = 0; i < playerAmount; i++) {
    startscreenInputs.innerHTML += htmlPlayerNameInputs(i);
  }
  startscreenInputs.innerHTML += `<button id="startGameBtn" class="start-game-btn">Spiel starten!</button>`;
}

function startEventListeners() {
  gameInputs.forEach((inputSet) => {
    for (const inputKey in inputSet) {
      if (inputSet.hasOwnProperty(inputKey)) {
        const inputField = inputSet[inputKey];

        // Attach the onchange event listener
        inputField.onchange = function (event) {
          console.log(`Input ${inputKey} changed to: ${event.target.value}`);
          checkMaxValue();
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

function checkMaxValue() {
  for (let i = 0; i < playerAmount; i++) {
    if (gameInputs[i].einerInput.value > 5) {
      gameInputs[i].einerInput.value = 5;
    }
    if (gameInputs[i].zweierInput.value > 10) {
      gameInputs[i].zweierInput.value = 10;
    }
    if (gameInputs[i].dreierInput.value > 15) {
      gameInputs[i].dreierInput.value = 15;
    }
    if (gameInputs[i].viererInput.value > 20) {
      gameInputs[i].viererInput.value = 20;
    }
    if (gameInputs[i].fuenferInput.value > 25) {
      gameInputs[i].fuenferInput.value = 25;
    }
    if (gameInputs[i].sechserInput.value > 30) {
      gameInputs[i].sechserInput.value = 30;
    }
    if (gameInputs[i].viererPaschInput.value > 30) {
      gameInputs[i].viererPaschInput.value = 30;
    }
    if (gameInputs[i].dreierPaschInput.value > 30) {
      gameInputs[i].dreierPaschInput.value = 30;
    }
  }
}

function calculateGesamtInputValue() {
  for (let i = 0; i < playerAmount; i++) {
    gameInputs[i].gesamtOhneBonusInput.value =
      safeValue(gameInputs[i].einerInput) +
      safeValue(gameInputs[i].zweierInput) +
      safeValue(gameInputs[i].dreierInput) +
      safeValue(gameInputs[i].viererInput) +
      safeValue(gameInputs[i].fuenferInput) +
      safeValue(gameInputs[i].sechserInput);
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
      gameInputs[i].sechserInput,
    ];

    const allFieldsGreaterThanZero = inputsToCheck.every(
      (input) => safeValue(input) > 0
    );

    if (gameInputs[i].gesamtOhneBonusInput.value >= 63) {
      gameInputs[i].gesamtOben.value =
        safeValue(gameInputs[i].gesamtOhneBonusInput) +
        safeValue(gameInputs[i].bonusInput);
    } else {
      gameInputs[i].gesamtOben.value = safeValue(
        gameInputs[i].gesamtOhneBonusInput
      );
    }
  }
}

function calculateGesamtUntenInputValue() {
  for (let i = 0; i < playerAmount; i++) {
    let gesamtUnten = 0;
    if (gameInputs[i].fullHouseJaInput.checked) {
      gesamtUnten += 25;
    }
    if (gameInputs[i].kleineStrasseJaInput.checked) {
      gesamtUnten += 30;
    }
    if (gameInputs[i].grosseStrasseJaInput.checked) {
      gesamtUnten += 40;
    }
    if (gameInputs[i].kniffelJaInput.checked) {
      gesamtUnten += 50;
    }
    if (safeValue(gameInputs[i].chanceInput) > 0) {
      gesamtUnten += safeValue(gameInputs[i].chanceInput);
    }
    gameInputs[i].gesamtUntenInput.value = gesamtUnten;
  }
}

function calculateGesamtFinalInputValue() {
  for (let i = 0; i < playerAmount; i++) {
    let finalSum =
      safeValue(gameInputs[i].gesamtOben) +
      safeValue(gameInputs[i].gesamtUntenInput);
    gameInputs[i].gesamtFinalInput.value = finalSum;
  }
}

function areAllFieldsFilled() {
  // Gehe durch jeden Spieler und überprüfe jeden Eingabewert
  for (let i = 0; i < playerAmount; i++) {
    const inputs = gameInputs[i];

    // Überprüfen Sie, ob alle Text- und Zahlenfelder gefüllt sind
    for (const inputKey in inputs) {
      if (inputs.hasOwnProperty(inputKey) && inputKey.endsWith("Input")) {
        const inputField = inputs[inputKey];
        if (inputField.type === "text" || inputField.type === "number") {
          if (!inputField.value) {
            return false; // Ein Feld ist leer, sofort false zurückgeben.
          }
        }
      }
    }

    // Überprüfen Sie die Checkboxen, dass genau eine der Optionen ausgewählt ist
    if (
      !(inputs.fullHouseJaInput.checked ^ inputs.fullHouseNeinInput.checked)
    ) {
      return false; // Nicht genau eine Option ausgewählt.
    }
    if (
      !(
        inputs.kleineStrasseJaInput.checked ^
        inputs.kleineStrasseNeinInput.checked
      )
    ) {
      return false;
    }
    if (
      !(
        inputs.grosseStrasseJaInput.checked ^
        inputs.grosseStrasseNeinInput.checked
      )
    ) {
      return false;
    }
    if (!(inputs.kniffelJaInput.checked ^ inputs.kniffelNeinInput.checked)) {
      return false;
    }
  }

  // Wenn die Schleife vollständig durchläuft, ohne false zurückzugeben, sind alle Felder gefüllt.
  return true;
}

function checkGameOver() {
  if (areAllFieldsFilled()) {
    gameOver();
  }
}

function gameOver() {
  console.log("Game Over!");
  for (let i = 0; i < playerAmount; i++) {
    gameInputs[i]["finalScore"] = gameInputs[i].gesamtFinalInput.value;
  }
  mainBoard.innerHTML = "";
  mainBoard.innerHTML = htmlEndScreen();
  for (let i = 0; i < playerAmount; i++) {
    document.getElementById("scoringTable").innerHTML +=
      htmlPlayerScoreTableRow(i);
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
  };
}

function positionFooter() {
  const footer = document.querySelector("footer");
  const contentHeight = document.body.offsetHeight;
  const viewportHeight = window.innerHeight;

  if (contentHeight > viewportHeight) {
    footer.style.position = "static";
  } else {
    footer.style.position = "absolute";
    footer.style.bottom = "0";
  }
}
window.onload = positionFooter;
