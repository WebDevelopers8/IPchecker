const {Builder, By} = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")



async function startDriver()
{
    const driver = await new Builder().forBrowser('chrome').build()
    await driver.get("https://2ip.ru/");
    setTimeout(async () => console.log(await driver.getTitle()), 5000)

    setTimeout(seachIPText, 7000, driver)
    setTimeout(quitDriver, 10000, driver)

}
async function seachIPText(driver)
{
    try
    {
        let ipAdress = await driver.findElement(By.css('.ip span')).getText()
        console.log(ipAdress)
    }catch (e) {
        console.log(e)
    }
}
async function quitDriver(driver)
{
    await driver.quit()
}

startDriver();