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

        // Clicar no monitor especificado
        let monitor = await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[2]/div/div/span/div/div/div[1]/span/a/div/img")), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", monitor);
        await driver.wait(until.elementIsVisible(monitor), 10000);
        await monitor.click();
        await sleep(3000)

        // Clicar no botão "Adicionar ao carrinho"
        let addToCartButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="add-to-cart-button"]')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", addToCartButton);
        await addToCartButton.click();
        await sleep(1000)

        // Na parte da garantia clicar no botão "Não, obrigado"
        let noThanksButton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div[3]/div[1]/div/div/div[2]/div[2]/div/div/div[3]/div/span[2]/span')), 10000);
        await driver.wait(until.elementIsVisible(noThanksButton), 10000); // Certifique-se de que o botão está visível
        await noThanksButton.click();
        await sleep(2000);

        // Clicar no botão "Carrinho"
        let cartButton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div[3]/div[3]/div/div[1]/div[3]/div[1]/div[2]/div[3]/form/span/span')), 10000);
        await cartButton.click();
        await sleep(1000)

        // Clicar no botão "Fechar pedido"
        let proceedToCheckoutButton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div[1]/div[4]/div[5]/div/div[1]/div[1]/div/form/div/div[3]/span/span/span/input')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", proceedToCheckoutButton);
        await proceedToCheckoutButton.click();
        await sleep(1000)

        // Clicar no botão "Enviar para este endereço"
        let sendToAddressButton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[5]/div[1]/div/div[2]/div/div/div[1]/div[1]/div/div[1]/div/div[3]/div/div[2]/div/div[2]/div/form/div/div[2]/div/span/span/input')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", sendToAddressButton);
        await sendToAddressButton.click();
        await sleep(1000)

        // Clicar no método de pagamento Pix
        let pixButton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[5]/div[1]/div/div[2]/div/div/div[1]/div[1]/div/div[5]/div/div[3]/div/div/div[2]/div/div[2]/div/div/form/div/div[1]/div/div[4]/div[2]/div')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", pixButton);
        await driver.wait(until.elementIsVisible(pixButton), 10000); // Certifica-se de que o elemento está visível
        await pixButton.click();
        await sleep(1000)

        // Clicar em "Usar esta forma de pagamento"
        let usePagamento = await driver.wait(until.elementLocated(By.xpath('/html/body/div[5]/div[1]/div/div[2]/div/div/div[1]/div[1]/div/div[5]/div/div[3]/div/div/div[2]/div/div[2]/div/div/form/div/div[2]/div/span/span/input')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", usePagamento);
        await usePagamento.click();
        await sleep(5000)

        // Clicar no botão "Finaliza Pedido"
        let finalizeOrderButton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[5]/div[1]/div/div[2]/div/div/div[2]/div/div[1]/div/div[1]/div[1]/div/span/span/input')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", finalizeOrderButton);
        await driver.wait(until.elementIsVisible(finalizeOrderButton), 10000); // Certifica-se de que o elemento está visível
        await finalizeOrderButton.click();

    } finally {
        // Fecha o navegador
        // await driver.quit();
    }
})();
