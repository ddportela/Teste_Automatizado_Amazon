const { Builder, By, until, Key, Actions } = require('selenium-webdriver');
require('dotenv').config();
const firefox = require('selenium-webdriver/firefox');

// Função para acessar as variáveis de ambiente
function loadCredentials() {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    if (!email || !password) {
        throw new Error('Missing environment variables EMAIL or PASSWORD');
    }

    return { email, password };
}


// Carregar credenciais
const credentials = loadCredentials();
const email = credentials.email;
const senha = credentials.password;


(async function Login() {

    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Abrindo site da Amazon
        await driver.get('https://www.amazon.com.br');
        await driver.findElement(By.id('nav-link-accountList')).click();
        await driver.wait(until.elementLocated(By.id('ap_email')), 10000); // Espera o item estar localizado

        // Procurando local para por email e clicando em continuar
        await driver.findElement(By.id('ap_email')).sendKeys(email);
        await driver.findElement(By.id('continue')).click();

        // Procurando local para por a senha e clicando em continuar
        await driver.wait(until.elementLocated(By.id('ap_password')), 10000); // Espera o item estar localizado
        await driver.findElement(By.id('ap_password')).sendKeys(senha);
        await driver.findElement(By.id('signInSubmit')).click();

        // Função de atraso
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        // Clicar no menu "Todos"
        let toDos = await driver.wait(until.elementLocated(By.xpath("//span[@class='hm-icon-label']")), 10000);
        await driver.wait(until.elementIsVisible(toDos), 10000);
        await toDos.click();
        await sleep(1000)

        // Rolar e clicar em "Ver tudo"
        let verTudo = await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div[2]/div/ul[1]/li[20]/a[1]")), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", verTudo);
        await driver.wait(until.elementIsVisible(verTudo), 10000);
        await verTudo.click();
        await sleep(1000)

        // Esperar e clicar na seção "Computadores e Informática"
        let compInfo = await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div[2]/div/ul[1]/ul[1]/li[6]/a")), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", compInfo);
        await driver.wait(until.elementIsVisible(compInfo), 10000);
        await compInfo.click();
        await sleep(1000)

        // Clicar em monitores
        let monitores = await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div[2]/div/ul[45]/li[7]/a")), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", monitores);
        await driver.wait(until.elementIsVisible(monitores), 10000);
        await monitores.click();
        await sleep(1000)

        // Clicar em "Mais de R$500"
        let maisDe500 = await driver.wait(until.elementLocated(By.xpath("//span[contains(text(),'Mais de R$500')]")), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", maisDe500);
        await driver.wait(until.elementIsVisible(maisDe500), 10000);
        await maisDe500.click();
        await sleep(1000)

        // Localiza o elemento lowPrice
        const lowPriceInput = await driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[1]/div[2]/div/div[3]/span/div[1]/div/div/div[5]/div[1]/div[2]/div[1]/form/input[8]"));
        await driver.executeScript("arguments[0].value = '600';", lowPriceInput);
        console.log('Mudando preço baixo');

        // Localiza o elemento highPrice
        const highPriceInput = await driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[1]/div[2]/div/div[3]/span/div[1]/div/div/div[5]/div[1]/div[2]/div[1]/form/input[9]"));
        await driver.executeScript("arguments[0].value = '800';", highPriceInput);
        console.log('Mudando preço alto');

        // Aguarda até que o botão seja localizado
        let irButton = await driver.wait(until.elementLocated(By.xpath( '/html/body/div[1]/div[1]/div[1]/div[2]/div/div[3]/span/div[1]/div/div/div[5]/div[1]/div[2]/div[1]/form/div[2]/div[2]/span/span')), 10000); 
        await driver.wait(until.elementIsVisible(irButton), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", irButton);

        // Clique no botão
        await irButton.click();
        console.log('Clicou no botão');

    } finally {
        // Fecha o navegador
        // await driver.quit();
    }
})();