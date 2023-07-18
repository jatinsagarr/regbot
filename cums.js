const app = require('express')();
const axios = require("axios").default;
const puppeteer = require('puppeteer-extra').default;
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const fs = require("fs");

var browser = null;
async function run() {
    puppeteer.use(pluginStealth());

    browser = await puppeteer.launch({
        headless: false,
        executablePath: executablePath(),
        args: ['--window-position=000,000', '--no-sandbox', '--disable-dev-shm-usage', '--disable-web-security', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials']
    });



    const page = await browser.newPage();
    
    await page.setRequestInterception(true);

    page.on('request', async (request) => {
        if(request.url().includes("https://cumsdtu.in/LSARegistration/LSARegistration?regId=")){
            fs.readFile("./LSARegistration/LSARegistration.txt",async (err,data)=>{
                if(err){
                   request.continue();
                   console.log(err);
                   return;
                }

                await request.respond({
                   ok: true,
                   status: 200,
                   url: request.url(),
                 //  contentType: 'text/html; charset=utf-8',
                   body: data
               });
           });
           return;
        }else if(request.url().includes("https://cumsdtu.in/LSARegistration/api/")){
            request.continue();
        }else if(request.url().includes("https://cumsdtu.in/LSARegistration/getInstitute")){
            request.continue();
        }else if(request.url().includes("https://cumsdtu.in/LSARegistration/getStudent")){
            request.continue();
        }else if(request.url().includes("https://cumsdtu.in/LSARegistration/")){
            const uri = new URL(request.url());
            console.log(uri.pathname);

            fs.readFile("." + uri.pathname,async (err,data)=>{
                if(err){
                   request.continue();
                   console.log(err);
                   return;
                }
               
                await request.respond({
                   ok: true,
                   status: 200,
                   url: request.url(),
                 //  contentType: 'text/html; charset=utf-8',
                   body: data
               });
           });
           return;
        }else{
            request.continue();
        }
    });
    //103.145.249.11:443

   // await page.goto("https://cumsdtu.in/registration_student/login/login.jsp?courseRegistration");
    await page.goto("https://cumsdtu.in/LSARegistration/LSARegistration?regId=bNng90WyKUWceN0Fpf/lDA==");

}
app.get("/", (req, res) => {
    res.send("What are you doing here");
});

process.on('SIGINT', () => {
    console.log('bye!');
    browser.close();
    process.exit()
});

app.listen(8000, async (err) => {
    if (err) return;
    console.log('Server Running onPOrt : ', 8000);
    await run();
});