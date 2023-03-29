const {Builder, By} = require("selenium-webdriver")


async function startDriver()
{
    const driver = await new Builder().forBrowser('chrome').build()
    await driver.get("https://2ip.ru/");
    setTimeout(async () => console.log(await driver.getTitle()), 5000)

    setTimeout(searchIPText, 5500, driver)
    setTimeout(quitDriver, 6000, driver)

}
async function searchIPText(driver)
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