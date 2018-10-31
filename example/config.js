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