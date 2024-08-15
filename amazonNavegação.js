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
// Função para atualizar a página pressionando F5
async function refreshPage(driver) {
    await driver.executeScript('window.location.reload();');
    await sleep(3000); // Espera para garantir que a página foi recarregada
}

const sections = [
    "/html/body/div[3]/div[2]/div/ul[45]/li[3]/a",  // Tudo em Computadores e Informática
    "/html/body/div[3]/div[2]/div/ul[45]/li[4]/a",  // Notebooks
    "/html/body/div[3]/div[2]/div/ul[45]/li[5]/a",  // Desktops
    "/html/body/div[3]/div[2]/div/ul[45]/li[6]/a",  // PC Gaming
    "/html/body/div[3]/div[2]/div/ul[45]/li[7]/a",  // Monitores
    "/html/body/div[3]/div[2]/div/ul[45]/li[8]/a",  // Tablets
    "/html/body/div[3]/div[2]/div/ul[45]/li[9]/a",  // Memória e armazenamento
    "/html/body/div[3]/div[2]/div/ul[45]/li[10]/a", // Peças e componentes para PC
    "/html/body/div[3]/div[2]/div/ul[45]/li[11]/a", // Dispositivos de conexão em rede
    "/html/body/div[3]/div[2]/div/ul[45]/li[12]/a", // Impressoras
    "/html/body/div[3]/div[2]/div/ul[45]/li[13]/a", // Acessórios
    "/html/body/div[3]/div[2]/div/ul[45]/li[14]/a", // Fones de ouvido
    "/html/body/div[3]/div[2]/div/ul[45]/li[15]/a"  // Guias de compras de computadores
];

for (let section of sections) {
    // Voltar à página inicial para acessar o menu novamente
    await driver.get('https://www.amazon.com.br');

    // Clicar no menu "Todos"
    let toDos = await driver.wait(until.elementLocated(By.xpath("//span[@class='hm-icon-label']")), 10000);
    await driver.wait(until.elementIsVisible(toDos), 10000);
    await toDos.click();

    // Rolar e clicar em "Ver tudo"
    let verTudo = await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div[2]/div/ul[1]/li[20]/a[1]")), 10000);
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", verTudo);
    await driver.wait(until.elementIsVisible(verTudo), 10000);
    await verTudo.click();

    // Esperar e clicar na seção "Computadores e Informática"
    let compInfo = await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div[2]/div/ul[1]/ul[1]/li[6]/a")), 10000);
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", compInfo);
    await driver.wait(until.elementIsVisible(compInfo), 10000);
    await compInfo.click();

    // Clicar na seção específica
    let sectionElement = await driver.wait(until.elementLocated(By.xpath(section)), 10000);
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", sectionElement);
    await driver.wait(until.elementIsVisible(sectionElement), 10000);
    await sectionElement.click();

    
    await refreshPage(driver); // Atualiza a página pressionando F5
    // Esperar alguns segundos antes de continuar
    
     await sleep(1000);
     
}

} finally {
// Fecha o navegador
await driver.quit();
}
})();