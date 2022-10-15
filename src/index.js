import app from './app';
import './database';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} with nodejs version ${process.version}`);
  console.log('Press Ctrl+C to quit.');
});
