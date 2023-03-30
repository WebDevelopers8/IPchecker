const {Builder, By} = require("selenium-webdriver");

class DriverController {
    async startDriver(bot, chatId)
    {
        let ip = 'ip'
        await bot.sendMessage(chatId,'Начинается запуск веб драйвера')
        const driver = await new Builder().forBrowser('chrome').build()
        await driver.get("https://2ip.ru/");
        await bot.sendMessage(chatId, "Веб драйвер запущен на сайте: 2ip.ru")
        setTimeout(async () => {
            ip = await this.searchIPText(driver)
        }, 5000, driver)
        setTimeout(this.quitDriver, 5500, driver)
        setTimeout(async () => await bot.sendMessage(chatId, `Веб драйвер закрыт\n\nIp адресс: ${ip}\nПрокси: no`), 6000)
    }
    async searchIPText(driver)
    {
        try
        {
            let ipAdress = await driver.findElement(By.css('.ip span')).getText()
            return ipAdress
        }catch (e) {
            console.log(e)
        }
    }
    async quitDriver(driver)
    {
        await driver.quit()
    }
}

module.exports = new DriverController()