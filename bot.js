const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Imposta il token del tuo bot
const token = process.env.TELEGRAM_TOKEN;
let serverPort = process.env.SERVER_PORT;
const stickers = {
	SOLO_TALENTO : "CAACAgQAAxkBAAMyZJRrtAABkTORkSDPllL5OoTXAAGNgAAClwsAAqQvKFCUOrxyEMuLYC8E",
	MERCATO_FERMENTO : "CAACAgQAAxkBAAIBGWSVV9OflgnWUqCWCiG-TRLFCoy0AAK6CgACmovJUgJJzTmYcuKvLwQ",
	SBO : "CAACAgQAAxkBAAM4ZJRsZFXKonVRtVWMChElalzqSHEAAtELAAL-szFQSGyJavNAr2wvBA",
	MOLTO_ATTIVI : "CAACAgQAAxkBAAIBGmSVWEpHs4zwK6UyvbYoHr--71r8AAJ7CwAC1MHIUl970vf4mOW5LwQ",
	MAGARI : "CAACAgQAAxkBAAIBImSVWVsSNxkAAXQhRAW81ZjCDZwB7gACvw8AAiJAUVHPdRojjP5T4y8E",
	SUCCEDERE : "CAACAgQAAxkBAAIBI2SVWaVq4viyQvRi6SGZKozJ5ihRAALeCwACl8soULYedKJwDc9wLwQ"
}

// Crea una nuova istanza del bot
const bot = new TelegramBot(token, { polling: true });

const http = require('http'); 

http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  if (request.method === 'GET' && request.url === '/ping') {
    response.statusCode = 200;
    response.write("pong");
    response.end();
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(serverPort);

let counter = {};

bot.onText(/(.+)/, (msg, match) => {
	console.log("ontext", msg);
  const chatId = msg.chat.id;
  const message = match[1];
  const messageLower = message.toLowerCase();
  if(messageLower.indexOf("culo")!==-1){
	  bot.sendSticker(chatId, stickers.SOLO_TALENTO);
	  return;
  }
  if(messageLower.indexOf("confermi?")!==-1){
	  bot.sendMessage(chatId, 'confermo!');
	  return;  
  }
  if(messageLower.indexOf("apply")!==-1){
	  bot.sendSticker(chatId, stickers.MERCATO_FERMENTO);
	  return;  
  }
  if(messageLower.indexOf("colloqui")!==-1){
	  bot.sendSticker(chatId, stickers.MOLTO_ATTIVI);
	  return;  
  }
  if(messageLower.indexOf("piacerebbe")!==-1){
	  bot.sendSticker(chatId, stickers.MAGARI);
	  return;  
  }
  if(messageLower.indexOf("speriamo")!==-1){
	  bot.sendSticker(chatId, stickers.SUCCEDERE);
	  return;  
  }
  
  // ogni tot
  if(!chatId in counter){
	  counter[chatId] = 0;
  }
  counter[chatId]++;
  if(counter[chatId] >= 30){
	  bot.sendSticker(chatId, stickers.SBO);
	  counter[chatId] = 0;
	  return;
  }
  
  
});

bot.on('sticker', (msg) => {
  console.log(msg.sticker.file_id);
});

// Avvia il bot
bot.on('polling_error', (error) => {
  console.log(error);
});
