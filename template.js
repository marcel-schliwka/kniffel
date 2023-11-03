function htmlSectionTemplate(i) {
  return `
    <section id="section${i}">
    <h1>Kniffel</h1>
    <h2 id="playerName${i}">Spieler #${i + 1}: ${playerNames[i]}</h2>
    <form class="section-form">
                
    <label for="name">1er</label>
    <input type="number" placeholder="1er" id="einer${i}" max="5">

    <label for="name">2er</label>
    <input type="number" placeholder="2er" id="zweier${i}" max="10">

    <label for="name">3er</label>
    <input type="number" placeholder="3er" id="dreier${i}" max="15">

    <label for="name">4er</label>
    <input type="number" placeholder="4er" id="vierer${i}" max="20">

    <label for="name">5er</label>
    <input type="number" placeholder="5er" id="fuenfer${i}" max="25">

    <label for="name">6er</label>
    <input type="number" placeholder="6er" id="sechser${i}" max="30">

    <label for="name">Gesamt</label>
    <input type="number" placeholder="Gesamt" id="gesamtOhneBonus${i}">

    <label for="name">Bonus (bei 63 oder mehr)</label>
    <input type="number" placeholder="Bonus" value="35" id="bonus${i}">

    <label for="name">Gesamt oben</label>
    <input type="number" placeholder="Gesamt oben" id="gesamtOben${i}">

    <label for="name">3er Pasch</label>
    <input type="number" placeholder="3er Pasch (alle Augen zählen)" id="dreierPasch${i}">

    <label for="name">4er Pasch</label>
    <input type="number" placeholder="4er Pasch (alle Augen zählen)" id="viererPasch${i}">
    
    <label for="name">Full House (25 Punkte)</label>
    <div class="checkbox-wrapper">
        <div>
            <input type="radio" id="fullHouseJa${i}" name="fullHouse">
            <span>gewürfelt</span>
        </div>
        <div>
            <input type="radio" id="fullHouseNein${i}" name="fullHouse">
            <span>gestrichen</span>
        </div>
    </div>

    <label for="name">kleine Strasse (30 Punkte)</label>
    <div class="checkbox-wrapper">
        <div>
            <input type="radio" id="kleineStrasseJa${i}" name="kleineStrasse">
            <span>gewürfelt</span>
        </div>
        <div>
            <input type="radio" id="kleineStrasseNein${i}" name="kleineStrasse">
            <span>gestrichen</span>
        </div>
    </div>

    <label for="name">grosse Strasse (40 Punkte)</label>
    <div class="checkbox-wrapper">
        <div>
            <input type="radio" id="grosseStrasseJa${i}" name="grosseStrasse">
            <span>gewürfelt</span>
        </div>
        <div>
            <input type="radio" id="grosseStrasseNein${i}" name="grosseStrasse">
            <span>gestrichen</span>
        </div>
    </div>

    <label for="name">Kniffel (50 Punkte)</label>
    <div class="checkbox-wrapper">
        <div>
            <input type="radio" id="kniffelJa${i}" name="kniffel">
            <span>gewürfelt</span>
        </div>
        <div>
            <input type="radio" id="kniffelNein${i}" name="kniffel">
            <span>gestrichen</span>
        </div>
    </div>

    <label for="name">Chance (alle Augen zählen)</label>
    <input type="number" placeholder="Chance (alle Augen zählen)" id="chance${i}">

    <label for="name">Gesamt unten</label>
    <input type="number" placeholder="Gesamt unten" id="gesamtUnten${i}">

    <label for="name">Gesamt</label>
    <input type="number" placeholder="Gesamt Punktzahl" id="gesamtFinal${i}">

</form>
</section>
    `;
}

function htmlPlayerNameInputs(i) {
  return `
    <input id="playerNameInput${i}" type="text" maxlength="20" class="player-amount" placeholder="Name Spieler ${
    i + 1
  }" required>
    `;
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
    `;
}

function htmlPlayerScoreTableRow(i) {
  return `
    <tr>
        <td>Spieler ${i + 1} (${gameInputs[i].playerName}):</td>
        <td>${gameInputs[i].finalScore} Punkte</td>
    </tr>
    `;
}
