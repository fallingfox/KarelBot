class WordMods {
    static asterisk(word = '') {
        let ca = word.split('')
        ca[Math.floor(Math.random() * ca.length)] = '*'
        return ca.join('')
    }

    static numbered(word = '') {
        let ca = word.split('')
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

    static reversed(word = '') {
        return word.split('').reverse().join('')
    }

    static lowerUpper(word = '') {
        let ca = word.split('')
        for (let i = 0; i < ca.length; i++) {
            if (Math.round(Math.random()))
                ca[i] = ca[i].toUpperCase();
        }
    }

    static randomMod(word = '') {
        switch (Math.floor(Math.random() * 5)) {
            case 0: return word
            case 1: return this.asterisk(word)
            case 2: return this.numbered(word)
            case 3: return this.reversed(word)
            case 4: return this.lowerUpper(word)
        }
    }
}

module.exports = WordMods