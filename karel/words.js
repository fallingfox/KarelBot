class Words {
    // *** Konstruktor
    constructor() {
        this.clear()
    }

    // *** Metody
    load(words = []) {
        this.clear()
        words.forEach(word => this._words.push(word.trim().toLowerCase()))
    }

    clear() {
        this._words = array()
        this._lastWord = ""
    }

    getLastWord() {
        return this._lastWord
    }

    getNextWord() {
        if (!this._words.length) return null
        let word = this._words[Math.floor(Math.random() * this._words.length)]
        this._lastWord = word

        return word
    }
}

module.exports = Words