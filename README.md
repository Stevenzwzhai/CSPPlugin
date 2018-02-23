# CSPPlugin
csp secure as a webpack plugin

#### how to use
1.first ```npm install CSPPlugin```

2.then in webpack.config.js
```
const CSPPlugin = require('CSPPlugin');
//other code
plugins: [
        new CSPPlugin({
            'defualt-src': ['self', 'https://www.qq.com']
        })
    ]
```

---this plugin can only used in product env---
## License

[MIT](http://opensource.org/licenses/MIT)
