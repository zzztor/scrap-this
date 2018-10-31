# Scrap this

In order to use this script you should create a folder with a `config.js` and `data.json` files inside it. Then run:
`node index.js 'folder_name'`

## Data file
It should be an array wich elements should have the url to scrap (`url` key). Example:

``` json
[
    { "url": "https://github.com/" },
    { "url": "https://github.com/zzztor" }
]
```

## Config file
Here you can define the new keys that you want in the output file. For each key you should define a selector (`selector` key) and a function (`exec` key) that will be executed in the website defined in the data file. If this field is not defined it will return the inner text (`innerText`) of the element. 


``` js
module.exports = {
    title: {
        selector: 'title'
        // exec is not define -> innerText of title node
    },
    'og:description': {
        selector: '[property="og:description"]',
        exec: function( element ){
            return element.getAttribute('content');
        }
    }
};

```

## Output file

``` json
[
    {
        "url":"https://github.com/",
        "title":"The world’s leading software development platform · GitHub",
        "og:description":"GitHub is where people build software. More than 28 million people use GitHub to discover, fork, and contribute to over 85 million projects."
    },
    {
        "url":"https://github.com/zzztor",
        "title":"zzztor (Héctor) · GitHub",
        "og:description":"zzztor has 9 repositories available. Follow their code on GitHub."
    }
]
```