import app from './app.js';
import http from 'http';
import * as config from './utils/config.js';
import * as logger from './utils/logger.js';

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

// const PORT = env.PORT || 3001;
// app.listen(PORT, () => {
//   logger.info(`Server running on port ${PORT}`);
// });
