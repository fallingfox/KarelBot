require('dotenv').config()
const fetch = require('node-fetch')
const Discord = require('discord.js');
const client = new Discord.Client();

let activeWord
let active = false
let score = {}

async function getWord() {
    return await fetch('http://slova.cetba.eu/generate.php?number=1').then(response => {
        return response.text()
    }).then(data => {
        return data.trim()
    }).catch(error => {
        console.error(error)
    })
}

function sendMessage(msg) {
    client.channels.cache.get('737375048335360132').send(msg)
}

async function newWord() {
    activeWord = await getWord()
    sendMessage(activeWord.toUpperCase().split('').join(' '))
    console.log(activeWord)
}


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await newWord()
    active = true
});

client.on('message', async msg => {
    if (msg.channel.name !== 'karel' || msg.author.id == client.user.id) return
    if (typeof score[msg.author.id] === 'undefined')
        score[msg.author.id] = {wordCounter: 0, score: 0}

    if (msg.content === activeWord && active) {
        active = false
        msg.reply('Good Job')
        await newWord()
        active = true
        score[msg.author.id].score++
        score[msg.author.id].wordCounter++
    } else if (msg.content === '!scr') {
        let s = score[msg.author.id]
        if (s.wordCounter > 0) msg.reply(`Tvoje score: ${s.score / s.wordCounter * 100}`)
    } else {
        score[msg.author.id].wordCounter++
        msg.delete()
    }
});

client.login(process.env.BOT_TOKEN);