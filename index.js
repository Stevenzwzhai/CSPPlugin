const path = require('path')
const fs = require('fs')
function CSPPlugin(options){
  this.options = options;
}

CSPPlugin.prototype.apply = function(compiler){
    let metaContent = "";
    Object.keys(this.options).forEach(key => {
        metaContent += `${key} '${this.options[key].join('\' \'')}';`
    })
    let insertHtml = `<meta  http-equiv="Content-Security-Policy" content="${metaContent}"/>`
    console.log(insertHtml);
    compiler.plugin('emit', function(compilation, callback){
        try{
            const htmlPath = path.join(compiler.options.output.path, 'index.html');
            if(fs.statSync(htmlPath)){
                let htmlStr
                try{
                    htmlStr = fs.readFileSync(htmlPath, 'utf-8');
                }catch(e){
                    console.log('读取文件出错')
                }
                htmlStr = htmlStr.replace(/<head>/g, ($1) => $1+insertHtml);
                try{
                    fs.writeFileSync(path.join(compiler.options.output.path, 'test.html'), htmlStr)
                }catch(e){
                    console.log('写入文件出错')
                }
            }
        }catch(e){
            console.log(e)
        }
        callback();
    });
}

module.exports = CSPPlugin;