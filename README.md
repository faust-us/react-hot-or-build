react-hot-or-build boilerplate
=====================

Минимальная среда разработки для вариативного использования "горячей" перезагрузки либо сборки React компонентов.

Базирован на https://github.com/gaearon/react-hot-boilerplate/tree/next

### Использование

```
npm install
npm run dev   # Запустить в режиме "горячей" загрузки
npm run build # Собрать проект
```

### TODO

Вынести конфигурации для режима "горячей" перезагрузки и сборки проекта в webpack.config.dev.js и webpack.config.prod.js соответственно  

### [Прочие boilerplate]((https://github.com/gaearon/react-hot-loader/blob/master/docs/README.md#starter-kits))

### WebStorm

Поскольку WebStorm IDE использует так называемые "безопасные" операции записи по умолчанию, файл-наблюдатель WebPack не распознает изменения файлов, поэтому горячяя загрузка не будет работать. Чтобы устранить эту проблему, отключите "safe write" в WebStorm.

### Зависимости

* [React](https://github.com/facebook/react)
* [Webpack](https://github.com/webpack/webpack)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
