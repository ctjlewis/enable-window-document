# Enable `window` and `document`
This package enables the `window` and `document` globals for executing most browser JS.  For fully simulating the browser, see the `enable-browser-mode` plugin.

## Usage
```
/* [CommonJS] */
require('enable-window-document');
```
*- or -*
```
/* [ES6] */
import 'enable-window-document'
```

No variable assignment required, just call it!  The variables are stored on the `global` object so you can refer to them as you normally would in browser JS.

## Example
Won't work:

```
console.log(document.createElement('a'));

>   ReferenceError: document is not defined
```

Works like a charm:
```
require('enable-window-document');
console.log(document.createElement('a'));

>   HTMLAnchorElement {Symbol(impl): HTMLAnchorElementImpl}
```

## Implementation
This package simply creates a blank JSDOM with a few lines of code, and stores the global `window` and `document` variables, which point to the empty DOM:

```
let JSDOM = require('jsdom'),
    DOM = new JSDOM.JSDOM(`<html><body></body></html>`, {
        url: 'https://localhost',
        resources: 'usable',
        runScripts: 'dangerously'
    });

global.window = DOM.window,
global.document = window.document;
```

The `url` param is set for compatibility reasons related to `localStorage`, and `resources` and `runScripts` are set by default so that external scripts work as expected.