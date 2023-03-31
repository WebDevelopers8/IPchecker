const {Builder, By} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome')
let proxy = require('selenium-webdriver/proxy');
let ipProxy = ["<62.233.45.173:1906>"]

class DriverController {
    async startDriver(bot, chatId, proxy) {
        let info = ['ip', 'mesto']
        let driver
        switch (proxy) {
            case false:
                await bot.sendMessage(chatId, 'Начинается запуск веб драйвера')
                driver = await new Builder().forBrowser('chrome').build()
                await driver.get("https://2ip.ru/");
                await bot.sendMessage(chatId, "Веб драйвер запущен на сайте: 2ip.ru")
                setTimeout(async () => {
                    info = await this.searchIPText(driver)
                }, 4500, driver)
                setTimeout(this.quitDriver, 5000, driver)
                break
            case true:
                let opts = new chrome.Options().addArguments(`--proxy-server=http://62.233.45.173:1906`)
                driver = await new Builder().forBrowser('chrome').setChromeOptions(opts).build()
                await driver.get("https://2ip.ru/");
                await bot.sendMessage(chatId, "Веб драйвер запущен на сайте: 2ip.ru")
                setTimeout(async () => {
                    info = await this.searchIPText(driver)
                }, 4500, driver)
                setTimeout(this.quitDriver, 5000, driver)
                break
        }
        setTimeout(async () => await bot.sendMessage(chatId, `Веб драйвер закрыт\n\nIp адресс: ${info[0]} \nМесто положение: ${info[1]}\nПрокси: ${proxy ? "Да" : "Нет"}`), 5500)
    }


async searchIPText(driver)
{
    try {
        let info = [await driver.findElement(By.css('.ip span')).getText(), await driver.findElement(By.css('.value a')).getText()]
        return info
    } catch (e) {
        console.log(e)
    }
}
async quitDriver(driver)
{
    await driver.quit()
}
}

module.exports = new DriverController()