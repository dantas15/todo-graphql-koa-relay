import http from 'http';

import { config } from '@/config';
import { app } from '@/server/app';

const server = http.createServer(app.callback());

server.listen(config.PORT, () => {
  console.log(`Server running on port: ${config.PORT}`);
});
