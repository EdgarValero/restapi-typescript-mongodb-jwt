import { connect, connection } from 'mongoose';
import config from './config/config'

connect(config.DB.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

connection.once('open', () => {
  console.log('MongoDB Connection Stablished');
});

connection.once('error', error => {
  console.log(error);
  process.exit(0);
});