import http from 'http';

import cors from 'kcors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaLogger from 'koa-logger';
import Router from 'koa-router';
import { config } from './config';

const app = new Koa();

app.use(cors({ origin: '*' }));
app.use(KoaLogger());
app.use(
  bodyParser({
    onerror(err, ctx) {
      ctx.throw(err, 422);
    },
  })
);

const routes = new Router();

routes.all('/', (ctx) => {
  ctx.body = 'hello world!';
});

app.use(routes.routes());
app.use(routes.allowedMethods());

const server = http.createServer(app.callback());

server.listen(config.PORT, () => {
  console.log(`Server running on port: ${config.PORT}`);
});
