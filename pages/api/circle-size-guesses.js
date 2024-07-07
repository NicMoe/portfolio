import mongoose from 'mongoose'
import requestIp from 'request-ip'

const mongoURI = process.env.MONGODB_URI

/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1) // Exit the process if unable to connect to MongoDB
  })

const GuessSchema = new mongoose.Schema({
  postId: String,
  guesses: [Number],
  circleData: Array,
  redCircleValues: [Number],
  blueCircleValues: [Number],
  timestamp: { type: Date, default: Date.now },
  ip: String,
  browser: String,
})

const Guess = mongoose.model('Guess', GuessSchema)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const ip = requestIp.getClientIp(req)
      const browser = req.headers['user-agent']
      const { postId, guesses, circleData, redCircleValues, blueCircleValues } =
        req.body

      const guess = new Guess({
        postId,
        guesses,
        circleData,
        redCircleValues,
        blueCircleValues,
        ip,
        browser,
      })
      await guess.save()
      console.log('Guess saved:', guess)

      // Limit to the most recent 10 guesses per IP/browser
      const count = await Guess.countDocuments({ ip, browser })
      console.log('Count of guesses:', count)
      if (count > 10) {
        const oldest = await Guess.find({ ip, browser })
          .sort({ timestamp: 1 })
          .limit(1)
        console.log('Deleting oldest guess:', oldest)
        // eslint-disable-next-line no-underscore-dangle
        await Guess.deleteOne({ _id: oldest[0]._id })
      }

      res.json({ message: 'Guesses saved successfully' })
    } catch (error) {
      console.error('Error saving guesses:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.json({ message: 'This is not a POST request' })
  }
}
