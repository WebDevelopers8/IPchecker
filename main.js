const TelegramBot = require('node-telegram-bot-api');
const token = "5729919373:AAF4fcQGENUlHnKPzV-m48d5xyejZeFvD5o";
const bot = new TelegramBot(token, {polling: true});

const ButtonList = require('./buttons/button-list')
const DriverController = require('./controllers/DriverController')

bot.setMyCommands([
    {command: "/start", description: "Вернуться в начало"},
])

const start = async () => {
    bot.on('message', async (msg) =>{
        const chatId = msg.chat.id
        const text = msg.text;

        if(text === '/start'){
            await bot.sendMessage(chatId, "Вас приветствует бот по проверке ip адреса через веб драйвера", ButtonList.keyboard)
        }
        if(text === "Запустить проверку IP")
        {
            await DriverController.startDriver(bot,chatId, false)
        }
        if(text === "Запустить проверку IP с прокси")
        {
            await DriverController.startDriver(bot,chatId, true)
        }
    })
}

start()