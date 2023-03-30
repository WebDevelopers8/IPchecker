
class ButtonList{
    keyboard = {
        reply_markup: {
            keyboard: [
                [{text: "Запустить проверку IP"}],
                [{text: 'Запустить проверку IP с прокси'}]
            ],
        },
    }
}

module.exports = new ButtonList()