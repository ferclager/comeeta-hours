const puppeteer = require('puppeteer')
const moment = require('moment')
const screenshot = 'cometa.png';
const config = require('config');

const USER = config.get('login.user');
const PASS = config.get('login.pass');
const ID = config.get('login.id');
const DAY = parseInt(moment().format('DD'));
const month = moment().format('MM'); 
const PROJECT = config.get('project');
const ACTIVITY = config.get('activity');
const HOURS =  config.get('hours.' + moment().format('dddd')); 

(async () => {
  let LOGIN_OK = false;
  const browser = await puppeteer.launch({ 
    headless: true,
    slowMo: 100
  })  
  const page = await browser.newPage()
  page.setViewport({ width: 1500, height: 680});

  await page.goto('https://www.cometasoftware.com/COMETA/Login.aspx')
  await page.select('#cmbLingua', 'eng')
  await page.waitForSelector('#txtUser')
  await page.type('#txtUser', USER)
  await page.waitForSelector('#txtPassword')
  await page.type('#txtPassword', PASS)
  await page.waitForSelector('#txtCometaID')
  await page.type('#txtCometaID', ID)
  await page.waitForSelector('#btnLogin')
  await page.click('#btnLogin')
  
  try {
    console.log('Checking login...')
    await page.waitForSelector('#ctl00_topBar_cellAvatar', {visible: true, timeout: 2500 })
    LOGIN_OK = true;
  } catch (e) {
    console.log('LOGIN KO! ', e.message)
  }

  if (LOGIN_OK) {
    console.log('LOGIN OK!')
    await page.click('#ctl00_topBar_mnuPrincipale-menuItem005')
    await page.click('#ctl00_topBar_mnuPrincipale-menuItem005-subMenu-menuItem000')
       
    await page.select('#ctl00_plcPageContent__fkIDCommessa_combo', PROJECT)
    console.log('Filled project: ' + PROJECT)
    await page.select('#ctl00_plcPageContent__fkIDCommessaAttivita_combo', ACTIVITY)
    console.log('Filled activity: ' + ACTIVITY)
    
    await page.waitForSelector('#ctl00_plcPageContent_cmbDalGiorno_autocomplete')
    await page.click('#ctl00_plcPageContent_cmbDalGiorno_autocomplete')
    console.log('Filled "for" day: ' + DAY)
    await page.$eval('input#ctl00_plcPageContent_cmbDalGiorno_autocomplete', (el, day) => {
      el.value = day
    }, DAY);
    await page.waitForSelector('#ctl00_plcPageContent_cmbAlGiorno_autocomplete')
    await page.click('#ctl00_plcPageContent_cmbAlGiorno_autocomplete')
    console.log('Filled "to" day: ' + DAY)
    await page.$eval('input#ctl00_plcPageContent_cmbAlGiorno_autocomplete', (el, day) => {
      el.value = day
    }, DAY);
  
    await page.waitForSelector('#ctl00_plcPageContent_oraOreAutocompilazione')
    await page.type('#ctl00_plcPageContent_oraOreAutocompilazione', HOURS)
    console.log('Filled hours: ' + HOURS)
    await page.waitForSelector('#Anthem_ctl00_plcPageContent_btnAutocompila__')
    await page.click('#Anthem_ctl00_plcPageContent_btnAutocompila__')
    await page.screenshot({ path: 'evidences/' + ID + USER + '_' + month + '_' + DAY + '_' + 1 + screenshot })
    console.log('Created evidences...')
    
    //await page.click('input.btnNo')
    await page.click('input.btnYes')
     
    await page.click('#ctl00_topBar_mnuPrincipale-menuItem000')
    await page.waitForSelector('#ctl00_plcPageContent_btnGoTask', {visible: true, timeout: 1500 })
    await page.click('#ctl00_plcPageContent_btnMenuRiepilogo')
    const table = await page.waitForSelector('#Anthem_ctl00_plcPageContent_calRiepilogo__', {visible: true, timeout: 1500 })
  
    await table.screenshot({ path: 'evidences/' + ID + USER + '_' + month + '_' + DAY + '_' + 2 + screenshot })
  
    console.log('DONE!')
  }
  
  browser.close()
})()