const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config(); 

// Imposta il token del tuo bot
const token = process.env.TELEGRAM_TOKEN;
const serverPort = process.env.SERVER_PORT;
const env = process.env.ENV;
const webhookUrl = process.env.WEBHOOK_URL 

const stickers = {
	SOLO_TALENTO : "CAACAgQAAxkBAAMyZJRrtAABkTORkSDPllL5OoTXAAGNgAAClwsAAqQvKFCUOrxyEMuLYC8E",
	MERCATO_FERMENTO : "CAACAgQAAxkBAAIBGWSVV9OflgnWUqCWCiG-TRLFCoy0AAK6CgACmovJUgJJzTmYcuKvLwQ",
	SBO : "CAACAgQAAxkBAAM4ZJRsZFXKonVRtVWMChElalzqSHEAAtELAAL-szFQSGyJavNAr2wvBA",
	MOLTO_ATTIVI : "CAACAgQAAxkBAAIBGmSVWEpHs4zwK6UyvbYoHr--71r8AAJ7CwAC1MHIUl970vf4mOW5LwQ",
	MAGARI : "CAACAgQAAxkBAAIBImSVWVsSNxkAAXQhRAW81ZjCDZwB7gACvw8AAiJAUVHPdRojjP5T4y8E",
	SUCCEDERE : "CAACAgQAAxkBAAIBI2SVWaVq4viyQvRi6SGZKozJ5ihRAALeCwACl8soULYedKJwDc9wLwQ"
}

// Crea una nuova istanza del bot
const bot = new TelegramBot(token);

let counter = {};

let interact = function(messageLower, chatId){
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
}

module.exports = async (request, response) => {
    try {
        // Retrieve the POST request body that gets sent from Telegram
        const { body } = request;

        // Ensure that this is a message being sent
        if (body.message) {
            // Retrieve the ID for this chat
            // and the text that the user sent
            const { chat: { id }, text } = body.message;

			interact(text.toLowerCase(), id);
            
        }
    }
    catch(error) {
        // If there was an error sending our message then we 
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }
    
    // Acknowledge the message with Telegram
    // by sending a 200 HTTP status code
    // The message here doesn't matter.
    response.send('OK');
};