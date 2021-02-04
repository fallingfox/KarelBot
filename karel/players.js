class Players {
    // *** Konstruktor
    constructor() {
        this._players = {}
    }

    // *** Metody
    get(id) {
        return (this.contains(id)) ? this._players[id] : null
    }

    contains(id) {
        return (typeof this._players[id] !== 'undefined')
    }

    add(player) {
        if (this.contains(id)) return
        this._players[player.getID()] = player
    }

    clear() {
        this._players = {}
    }

    top(count) {
        if (!Object.keys(this._players).length) return array()
        return Object.values(this._players).sort((a, b) => b.getScore() - a.getScore()).slice(0, count)
    }
}

module.exports = Players