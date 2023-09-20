function htmlSectionTemplate(i) {
    return `
    <section id="section${i}">
    <h1>Kniffel</h1>
    <h2 id="playerName${i}">Spieler #${i+1}: ${playerNames[i]}</h2>
    <form class="section-form">
                
    <label for="name">1er</label>
    <input type="number" placeholder="1er" id="einer${i}">

    <label for="name">2er</label>
    <input type="number" placeholder="2er" id="zweier${i}">

    <label for="name">3er</label>
    <input type="number" placeholder="3er" id="dreier${i}">

    <label for="name">4er</label>
    <input type="number" placeholder="4er" id="vierer${i}">

    <label for="name">5er</label>
    <input type="number" placeholder="5er" id="fuenfer${i}">

    <label for="name">6er</label>
    <input type="number" placeholder="6er" id="sechser${i}">

    <label for="name">Gesamt</label>
    <input type="number" placeholder="Gesamt" id="gesamtOhneBonus${i}">

    <label for="name">Bonus</label>
    <input type="number" placeholder="Bonus" value="35" id="bonus${i}">

    <label for="name">Gesamt oben</label>
    <input type="number" placeholder="Gesamt oben" id="gesamtOben${i}">

    <label for="name">3er Pasch</label>
    <input type="number" placeholder="3er Pasch" id="dreierPasch${i}">

    <label for="name">4er Pasch</label>
    <input type="number" placeholder="4er Pasch" id="viererPasch${i}">
    
    <label for="name">Full House</label>
    <div class="checkbox-wrapper">
        <div>
            <input type="checkbox" id="fullHouseJa${i}">
            <span>gewürfelt</span>
        </div>
        <div>
            <input type="checkbox" id="fullHouseNein${i}">
            <span>gestrichen</span>
        </div>
    </div>

    <label for="name">kleine Strasse</label>
    <div class="checkbox-wrapper">
        <div>
            <input type="checkbox" id="kleineStrasseJa${i}">
            <span>gewürfelt</span>
        </div>
        <div>
            <input type="checkbox" id="kleineStrasseNein${i}">
            <span>gestrichen</span>
        </div>
    </div>

    <label for="name">grosse Strasse</label>
    <div class="checkbox-wrapper">
        <div>
            <input type="checkbox" id="grosseStrasseJa${i}">
            <span>gewürfelt</span>
        </div>
        <div>
            <input type="checkbox" id="grosseStrasseNein${i}">
            <span>gestrichen</span>
        </div>
    </div>

    <label for="name">Kniffel</label>
    <div class="checkbox-wrapper">
        <div>
            <input type="checkbox" id="kniffelJa${i}">
            <span>gewürfelt</span>
        </div>
        <div>
            <input type="checkbox" id="kniffelNein${i}">
            <span>gestrichen</span>
        </div>
    </div>

    <label for="name">Chance</label>
    <input type="number" placeholder="Chance" id="chance${i}">

    <label for="name">Gesamt unten</label>
    <input type="number" placeholder="Gesamt unten" id="gesamtUnten${i}">

    <label for="name">Gesamt</label>
    <input type="number" placeholder="Gesamt Punktzahl" id="gesamtFinal${i}">

</form>
</section>
    `
}

function htmlPlayerNameInputs(i) {
    return `
    <input id="playerNameInput${i}" type="text" maxlength="20" class="player-amount" placeholder="Name Spieler ${i+1}" required>
    `
}

function htmlEndScreen() {
    return `
    <div class="startscreen">
    <h1>Kniffel</h1>
    <h2>Game Over!</h2>
    <h2>Score</h2>
    <table class="right-align-table" id="scoringTable">
    </table>
    </div>
    `
}

function htmlPlayerScoreTableRow(i) {
    return `
    <tr>
        <td>Spieler ${i+1} (${gameInputs[i].playerName}):</td>
        <td>${gameInputs[i].finalScore} Punkte</td>
    </tr>
    `
}