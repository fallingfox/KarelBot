const Players = require('./players')
const Words = require('./words')
const WordMods = require('./word_mods')

class Game {
    // *** Konstruktor
    constructor() {
        this._words = new Words()
        this._players = new Players()
    }

    // *** Metody
    getWords() {
        return this._words
    }

    getPlayers() {
        return this._players
    }
}

module.exports = Game