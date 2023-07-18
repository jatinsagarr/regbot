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
        if(request.url() == "https://cumsdtu.in/registration_student/login/login.jsp?courseRegistration"){
            fs.readFile("./registration_student/login/login.jsp",async (err,data)=>{
                 if(err){
                    request.continue();
                    console.log(err);
                    return;
                 }

                 await request.respond({
                    ok: true,
                    status: 200,
                    url: request.url(),
                    contentType: 'text/html; charset=utf-8',
                    body: data
                });
            });
            return;
        }else if(request.url().includes("https://cumsdtu.in/registration_student/")){
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
        }

        if (request.url().includes("https://cumsdtu.in/LSARegistration/api/getStuRegistration")) {

            try {
                const res = await axios.get(request.url(), { headers: request.headers() });
                console.log(res.data);
                var resdata = res.data;
                resdata.data.extraInfo = "Set Compulsory [1 more courses], Group GEC4 [1 more Set(s)]";
                resdata.data.extraValueMap["IS_VIEW_ONLY"] = true;

                await request.respond({
                    ok: true,
                    status: 200,
                    url: request.url(),
                    contentType: 'application/json;charset=UTF-8',
                    body: JSON.stringify(resdata)
                });
            } catch (error) {
                console.log(error);
                request.continue();
            }

        }
    });

    await page.goto("https://cumsdtu.in/registration_student/login/login.jsp?courseRegistration");

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