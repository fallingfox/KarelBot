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
            return data.toLowerCase().split(' | ')
        }).catch(error => {
            console.error(error)
        })
    }

    getNormalWord() {
        this.activeWord = this.words[Math.round(Math.random() * this.words.length)].trim()
        return this.activeWord;
    }

    getAsteriskWord() {
        let ca = this.getNormalWord().split('')
        ca[Math.floor(Math.random() * ca.length)] = '_'
        return ca.join('')
    }

    getNumberedWord() {
        let ca = this.getNormalWord().split('')
        for (let i = 0; i < ca.length; i++) {
            switch(ca[i]) {
                case 'i': ca[i] = 1; break;
                case 'z': ca[i] = 2; break;
                case 'e': ca[i] = 3; break;
                case 'a': ca[i] = 4; break;
                case 's': ca[i] = 5; break;
                case 'g': ca[i] = 6; break;
                case 't': ca[i] = 7; break;
                case 'b': ca[i] = 8; break;
                case 'o': ca[i] = 0; break;
            }
        }

        return ca.join('')
    }

    getReversedWord() {
        return this.getNormalWord().split('').reverse().join('')
    }

    nextWord() {
        switch (Math.floor(Math.random() * 4)) {
            case 0: return this.getNormalWord()
            case 1: return this.getAsteriskWord()
            case 2: return this.getReversedWord()
            case 3: return this.getNumberedWord()
        }
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