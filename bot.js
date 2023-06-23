const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Imposta il token del tuo bot
const token = process.env.TELEGRAM_TOKEN;
const serverPort = process.env.SERVER_PORT;

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

// Gestisce il comando /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Ciao! Sono un bot di esempio.');
});

bot.onText(/(.+)/, (msg, match) => {
	console.log("ontext", msg);
  const chatId = msg.chat.id;
  const message = match[1];
  if(message.indexOf("culo")!==-1){
	  bot.sendSticker(chatId, "CAACAgQAAxkBAAMyZJRrtAABkTORkSDPllL5OoTXAAGNgAAClwsAAqQvKFCUOrxyEMuLYC8E");
	  return;
  }
  if(message.indexOf("confermi?")!==-1){
	  bot.sendMessage(chatId, 'confermo!');
	  return;  
  }
  if(message.indexOf("linkedin.com")!==-1){
	  bot.sendSticker(chatId, "CAACAgQAAxkBAAM4ZJRsZFXKonVRtVWMChElalzqSHEAAtELAAL-szFQSGyJavNAr2wvBA");
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
