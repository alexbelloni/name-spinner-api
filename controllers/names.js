
const Names = () => {
    function fromDatabase({ res, error, user }) {
        const { _id, type, date, quantity } = res || {};
        return { id: _id, type, date, quantity, error };
    }
    function toDatabase(req) {
        const { id, type, date, quantity } = req;
        return { id, type, date, quantity };
    }
    async function read(group) {
        return new Promise((resolve, reject) => {
            const puppeteer = require('puppeteer');

            function saveFile(filename, data) {
                const fs = require('fs')
                fs.writeFile(filename, data, (err) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log("File written successfully\n");
                    }
                });
            }

            (async () => {
                const postUrl = group

                try {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto('https://www.facebook.com/');
                    await page.type("#email", process.env.EMAIL);
                    await page.type("#pass", process.env.PASS);
                    await page.click("button[data-testid='royal_login_button']");
                    console.log('login')
                    await page.waitFor(4000);
                    await page.goto(postUrl);
                    console.log('group post')
                    await page.waitFor(2000);

                    const data = await page.content();
                    //saveFile("fbgroup.txt", data);

                    //If it has previous comments link ----
                    const start = data.indexOf('View ');
                    if (start < 0) {
                        console.log('previous comments not found')
                    } else {
                        const x = data.substring(start - 500, start)
                        const searchForButton = x.indexOf('role=')
                        const classes = x.substring(searchForButton - 50, searchForButton).split(' ');
                        const selector = classes.reduce((acc, v) => {
                            return v.length === 8 ? [...acc, v] : acc
                        }, []).map(v => `.${v}`)
                        await page.click(selector.join(''));
                        await page.waitFor(2000);
                    }

                    // -----
                    //await page.screenshot({ path: 'example.png', fullPage: true });

                    const data1 = await page.content();
                    let names = data1.split("Comment by ").splice(1)

                    if (names.length > 0) {
                        names = names.map(c => {
                            const arr = c.substring(0, c.indexOf('"')).split(' ')
                            return `${arr[0]} ${arr[1]}`
                        })
                        console.log(names, names.length)

                        resolve(names)

                        //saveFile("names.txt", names.join(','));
                    }
                } catch (e) {
                    reject({ error: '-> '+e.message });
                }
                await browser.close();
            })();

        })
    }

    return {
        read,
    }
}

module.exports = Names();