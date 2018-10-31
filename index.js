const puppeteer = require('puppeteer');
const fs = require('fs');
const utils = require('./utils');

const project_name = utils.getArguments(2);

if (!project_name) return console.log('Err: You need to use an argument as the name of the project folder.');

const dirs = {
  data: './' + project_name + '/data.json',
  config: './' + project_name + '/config',
  output: './' + project_name + '/output.json'
}
const data = require(dirs.data);
let config = require(dirs.config);
config = utils.serialize(config);

(async () => {
  
  console.log( 'Starting...' );
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const keys = Object.keys(config)

  for (let i = 0, data_length = data.length; i < data_length; i++){
    console.log( `${i+1}/${data_length}` );
    const item = data[i];
    await page.goto(item.url);


    for (let j = 0, keys_length = keys.length; j < keys_length; j++) {
      const key = keys[j];
      const field = config[key];

      item[key] = await page.$eval(field.selector, ( element, field ) => {
        if (field.exec) return new Function('element', field.exec )( element );
        return element.innerText;
      }, field);

    }
  }

  await browser.close();
  console.log('Writing data in ' + dirs.output)
  fs.writeFile(dirs.output, JSON.stringify(data), 'utf8', (err) => {
    if (err) return console.log(err);
    console.log('Done');
  });

})();