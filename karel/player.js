class Player {
    // *** Konstruktor
    constructor(id, nickname) {
        this._id = id
        this._nickname = nickname
        this._totalWords = 0
        this._correctWords = 0
    }

    // *** Metody
    toString() {
        return `${this._nickname} :: ${this.getScore()} (${this._correctWords}/${this._totalWords}, ${this.getAccuracy()}%)`
    }

    correct() {
        this._totalWords++
        this._correctWords++
    }

    mistake() {
        this._totalWords++
    }

    getID() {
        return this._id
    }

    getNickname() {
        return this._nickname
    }

    getScore() {
        return (10 * this._correctWords) - (5 * (this._totalWords - this._correctWords))
    }

    getAccuracy() {
        return (this._totalWords) ? Math.round((this._correctWords / this._totalWords) * 100) : 0
    }
}