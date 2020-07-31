const fetch = require('node-fetch')

const WORDS_COUNT = 3500

class Game {
    constructor() {
        this.words = []
        this.players = {}
        this.activeWord = null
    }

    async loadWords() {
        this.words = await fetch(`http://slova.cetba.eu/generate.php?number=${WORDS_COUNT}`).then(response => {
            return response.text()
        }).then(data => {
            return data.split(' | ')
        }).catch(error => {
            console.error(error)
        })
    }

    nextWord() {
        this.activeWord = this.words[Math.round(Math.random() * this.words.length)].trim()
        return this.activeWord;
    }

    checkWord(word, player) {
        if (typeof this.players[player] === 'undefined') {
            this.players[player] = {words: 0, correct: 0}
        }

        this.players[player].words++
        if (word === this.activeWord) {
            this.players[player].correct++
            return true
        } else {
            return false
        }
    }

    getScore(player) {
        return this.players[player]
    }
}

module.exports = Game