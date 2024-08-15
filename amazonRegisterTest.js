const { Builder, By, until, Key, Actions } = require('selenium-webdriver');
require('dotenv').config();
const firefox = require('selenium-webdriver/firefox');

// Função para carregar credenciais do arquivo JSON
function loadCredentials() {
    const data = fs.readFileSync('emailsenha.env.json', 'utf8');
    return JSON.parse(data);
}

// Carregar credenciais
const credentials = loadCredentials();
const email = credentials.email;
const senha = credentials.senha;

(async function() {
    let driver = await new Builder().forBrowser('firefox').build();

    async function openAmazonRegisterPage() {
        await driver.get('https://www.amazon.com');
        await driver.findElement(By.id('nav-link-accountList')).click();
        await driver.wait(until.elementLocated(By.id('createAccountSubmit')), 10000);
        await driver.findElement(By.id('createAccountSubmit')).click();
    }

    async function registerTest(email, password) {
        await openAmazonRegisterPage();
        await driver.wait(until.elementLocated(By.id('ap_customer_name')), 10000);
        await driver.findElement(By.id('ap_customer_name')).sendKeys('João Pedro Portela');
        await driver.findElement(By.id('ap_email')).sendKeys(email);
        await driver.findElement(By.id('ap_password')).sendKeys(password);
        await driver.findElement(By.id('ap_password_check')).sendKeys(password);
        await driver.findElement(By.id('continue')).click();
        // Esperar até que o registro seja concluído ou um erro seja exibido
        await driver.wait(until.urlContains('ap/register'), 10000);
    }

    try {
        // Testes de Registro

        //1. Registro com senha simples "esse teste não é para passar de acordo com pedido do cliente. e ele passa logo foi reportado um bug"
        await registerTest(email, '123456');

        //2. Registro com campos vazios
        await registerTest('', '');

        // 3. Registro com credenciais válidas
        await registerTest(email, senha);  
    } 
    finally {
        await driver.quit();
    }
})();