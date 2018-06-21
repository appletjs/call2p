## call2p

将函数执行结果装换成 promise 形式。


## 安装

```bash
$ npm install call2p
```


## API

#### call2p(executor)

- `{Function} executor`

```js
const call2p = require('call2p');
const fs = require('fs');

// 执行一个函数，结使用 Promise 包装其果，该函数
// 只接受的参数 cb 是一个符合 error-first 规范的回调函数
call2p(function(cb) {
  fs.readFile(__filename, cb);
}).then(function(content) {
  console.log(content.toString('utf8'));
}).catch(function(err) {
  console.log(err.stack || err.message || err);
});
```

#### call2p.wrap(handle)

- `{Function} handle`

```js
const call2p = require('call2p');
const fs = require('fs');

// 将函数包装成新的函数，新函数内部使用 call2p 执行就函数，所以执行新函数会返回一个 Promise 实例；
// 该函数接受的最后一个参数 cb 是一个符合 error-first 规范的回调函数
const readFile = call2cb.wrap(function(file, cb) {
  fs.readFile(file, cb);
});

readFile(__filename).then(function(content) {
  console.log(content.toString('utf8'));
}).catch(function(err) {
  console.log(err.stack || err.message || err);
});
```


## Todo

- [ ] 添加测试用例
- [ ] 重写开发文档


## License

MIT © 2018, [Maofeng Zhang](mailto:japplet@163.com "mailto:japplet@163.com")