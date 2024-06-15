import 'dotenv/config'; // Load environment variables from .env file
import express from 'express';
import next from 'next';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import requestIp from 'request-ip';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Exit the process if unable to connect to MongoDB
});

const GuessSchema = new mongoose.Schema({
  postId: String,
  guesses: [Number],
  circleData: Array,
  redCircleValues: [Number],
  blueCircleValues: [Number],
  timestamp: { type: Date, default: Date.now },
  ip: String,
  browser: String,
});

const Guess = mongoose.model('Guess', GuessSchema);

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use(cors());

  server.post('/api/save-guesses', async (req, res) => {
    try {
      const ip = requestIp.getClientIp(req);
      const browser = req.headers['user-agent'];
      const { postId, guesses, circleData, redCircleValues, blueCircleValues } = req.body;

      const guess = new Guess({ postId, guesses, circleData, redCircleValues, blueCircleValues, ip, browser });
      await guess.save();
      console.log('Guess saved:', guess);

      // Limit to the most recent 10 guesses per IP/browser
      const count = await Guess.countDocuments({ ip, browser });
      console.log('Count of guesses:', count);
      if (count > 10) {
        const oldest = await Guess.find({ ip, browser }).sort({ timestamp: 1 }).limit(1);
        console.log('Deleting oldest guess:', oldest);
        await Guess.deleteOne({ _id: oldest[0]._id });
      }

      res.json({ message: 'Guesses saved successfully' });
    } catch (error) {
      console.error('Error saving guesses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  server.get('/api/check-db', async (req, res) => {
    try {
      await mongoose.connection.db.admin().ping();
      res.json({ message: 'Database connection is healthy' });
    } catch (error) {
      res.status(500).json({ message: 'Database connection failed', error });
    }
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${port}`);
  });
});