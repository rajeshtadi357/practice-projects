import express from 'express'
import cors from 'cors'
import { compressImage, uploadImage } from './controllers/controllers.js'
import { cleanUp } from './handlers/handler.js'
import multerConfig from './config/multerConfig.js'
import { configDotenv } from 'dotenv'

configDotenv()



const port = process.env.PORT || 3000
const upload = multerConfig('./uploads')
const app = express()

// middlewarewsss====>

app.use(cors({
  origin:process.env.FRONTEND_URL || "https://compres-my-image.vercel.app"
}))
app.use(express.json())



/// rooutes =====>>>
app.get('/', (req, res) => {
  res.json({ msg: "file handler backend" })
})
app.post('/uploads', upload.single('image'), uploadImage)
app.get('/compress/:filename', compressImage)

app.listen(port, () => { console.log('your server is running on port 3000') })




// cleanup schedulars

// Start the cleanup scheduler - every 10 minutes, delete files older than 1 hour
setInterval(() => {
  cleanUp('./uploads'); // 1 hour in ms
  cleanUp('./compress');
}, 1000 * 60 * 30); // every 5 minutes