let JSDOM = require('jsdom'),
    DOM = new JSDOM.JSDOM(`<html><body></body></html>`, {
        url: 'https://localhost'
    });

global.window = DOM.window,
global.document = window.document;