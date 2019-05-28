
## Uso

### Usando o bash

```bash
$ git clone git@github.com:JohnVictor2017/start-tm-webapp.git
$ cd start-tm-webapp
$ cp .env.example .env
$ npm install
$ npm start         # visit http://localhost:3000
```

### Usando Docker

```bash
# previsualização
$ docker pull antdesign/ant-design-pro
$ docker run -p 80:80 antdesign/ant-design-pro
# open http://localhost

# dev
$ npm run docker:dev
# npm run docker:bash

# build
$ npm run docker:build


# production dev
$ npm run docker-prod:dev

# production build
$ npm run docker-prod:build
```
