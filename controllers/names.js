
const Names = () => {
    //returns Promise and resolve(<name string arr>) or reject({ error: '' }); 
    async function load(groupUrl) {
        return new Promise((resolve, reject) => {

            if(!groupUrl || !groupUrl.trim()){
                reject({ error: 'group url invalid' });
                return
            } 

            const puppeteer = require('puppeteer');

            (async () => {
                let browser = null;
                try {
                    browser = await puppeteer.launch({
                        args: [
                            '--no-sandbox',
                            '--disable-web-security',
                            '--disable-features=IsolateOrigins',
                            '--disable-site-isolation-trials'
                        ]
                    })

                    const page = await browser.newPage();

                    //fb login process
                    await page.goto('https://www.facebook.com/');
                    await page.type("#email", process.env.EMAIL);
                    await page.type("#pass", process.env.PASS);
                    await page.click("button[data-testid='royal_login_button']");
                    await page.waitFor(4000);

                    //fb group post
                    await page.goto(groupUrl);
                    await page.waitFor(2000);
                    const groupPageContent = await page.content();

                    //If "View all comments"-like link exists ----
                    const start = groupPageContent.indexOf('View ');
                    if (start < 0) {
                        console.log('The key word "View" for all comments not found')
                    } else {
                        //try to get the classes of the button here ---
                        const beforeViewLink = groupPageContent.substring(start - 500, start)
                        const searchForButton = beforeViewLink.indexOf('role=')
                        const classes = beforeViewLink.substring(searchForButton - 50, searchForButton).split(' ');
                        const buttonClasses = classes.reduce((acc, v) => {
                            return v.length === 8 ? [...acc, v] : acc
                        }, []).map(v => `.${v}`)
                        //--------
                        await page.click(buttonClasses.join(''));
                        await page.waitFor(2000);
                    }
                    // -----

                    const commentsContent = await page.content();
                    let names = commentsContent.split("Comment by ").splice(1)

                    if (names.length > 0) {
                        names = names.map(c => {
                            const arr = c.substring(0, c.indexOf('"')).split(' ')
                            return `${arr[0]} ${arr[1]}`
                        })

                        resolve(names);
                    }
                } catch (e) {
                    reject({ error: e.message });
                }
                if (browser) {
                    await browser.close();
                }
            })();
        })
    }

    return {
        load,
    }
}

module.exports = Names();