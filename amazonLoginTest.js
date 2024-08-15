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
(async function() {
    let driver = await new Builder().forBrowser('firefox').build();

    async function openAmazon() {
        await driver.get('https://www.amazon.com.br');
        await driver.findElement(By.id('nav-link-accountList')).click();
        await driver.wait(until.elementLocated(By.id('ap_email')), 10000);
    }

    async function testLogin(email, password) {
        await openAmazon();
        await driver.findElement(By.id('ap_email')).clear();
        await driver.findElement(By.id('ap_email')).sendKeys(email);
        await driver.findElement(By.id('continue')).click();
        if (password) {
            await driver.wait(until.elementLocated(By.id('ap_password')), 10000);
            await driver.findElement(By.id('ap_password')).clear();
            await driver.findElement(By.id('ap_password')).sendKeys(password);
            await driver.findElement(By.id('signInSubmit')).click();
        }
        await driver.wait(until.titleContains('Amazon'), 10000); // Ajuste conforme necessário
    }

    try {
        // Teste 1: Login com e-mail correto e senha incorreta
        await testLogin(email, 'senhaincorreta');

        // Na Amazon quando erra email ele não passa para pagina da senha então devo deixa apenas 1 passo pro teste prosseguir

        // Teste 2: Login com e-mail incorreto
        await testLogin('errado@gmail.com',);

        // Teste 3: Login com e-mail vazio
        await testLogin('',);

        // Teste 4: Login com e-mail correto com espaço e senha correta
        await testLogin(email + ' ', senha);

        // Teste 5: Login com e-mail correto e senha com espaço
        await testLogin(email, senha + ' ');

        // Teste 6: Login com formato de e-mail inválido
        await testLogin('zghardx@.com',);

        // Teste 7: Sensibilidade a maiúsculas e minúsculas da senha
        await testLogin(email, 'SENHA@2024');
        await testLogin(email, 'senha@2024');
        await testLogin(email, senha);
    }
    finally {
        await driver.quit();
    }
})();