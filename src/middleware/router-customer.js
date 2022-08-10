const fs = require('fs');

function render(page) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./src/view/${page}.html`, 'binary', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = function () {
  return async function (ctx, next) {
    const url = ctx.url;
    let page = '404';
    switch (url) {
      case '/':
        page = 'index';
        break;

      case '/index':
        page = 'index';
        break;

      case '/todo':
        page = 'todo';
        break;

      default:
        break;
    }
    const html = await render(page);
    ctx.body = html;
    await next();
  };
};
