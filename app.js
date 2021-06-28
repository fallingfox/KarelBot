/**
 * TODO
 * Persistentní uložení výsledků hráčů (Mongo, SQLite)
 * Lepší výpis výsledků
 * Modifikace slov
 */

// *** Moduly
require('dotenv').config()
const Game = require('./game')
const Discord = require('discord.js');

// const CHANNEL_ID = '737375048335360132'
const client = new Discord.Client();
let _game = new Game()

function sendMessage(msg) {
    client.channels.cache.get(CHANNEL_ID).send(msg)
}

function sendWord(word) {
    sendMessage(word.toUpperCase().split('').join(' '))
}

client.on('ready', async () => {
    await _game.loadWords()
    sendWord(_game.nextWord())
});

client.on('message', async msg => {
    if (msg.channel.name !== 'karel' || msg.author.id == client.user.id) return

    if (msg.content === '!scr') {
        let s = _game.getScore(msg.author.id)
        if (typeof s !== 'undefined' && s.words > 0) msg.reply(`Tvoje score: ${Math.round(s.correct / s.words * 100)}`)
    } else if (_game.checkWord(msg.content, msg.author.id)) {
        let word = _game.nextWord()
        msg.reply('Good Job')
        sendWord(word)
    } else {
        msg.delete()
    }
});

client.login(process.env.BOT_TOKEN);
