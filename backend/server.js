const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session'); 
const passport = require('passport'); 
const axios = require('axios'); 

dotenv.config();
const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');
const authMiddleware = require('./middleware/authMiddleware');
const profileRouter = require('./routes/profile');
const coursesRouter = require('./routes/courses');
const forgotPasswordRouter = require('./routes/forgotPassword');
const resetPasswordRouter = require('./routes/resetPassword');
const app = express();

const PORT = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


app.use(
  session({
    secret: 'fRwD8ZcX#k5H*J!yN&2G@pQbS9v6E$tA',
    resave: false,
    saveUninitialized: false,
    // Add other session configuration options as needed
  })
);

app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = [
'https://eduxcel.vercel.app',
  'http://localhost:5173',
  // Add more domains if needed
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(__dirname, 'client/build')));

// Connect to MongoDB using the MONGODB_URI_MYDB environment variable
mongoose.connect(process.env.MONGODB_URI_MYDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Define your MongoDB collections (models)
const Course = require('./models/Course');
const User = require('./models/User');
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const UserProfile = require('./models/UserProfile');

const Feedback = mongoose.model('feedback', {
  name: String,
  email: String,
  feedback: String,
});
const Query = mongoose.model('query', { name: String, email: String, query: String });
const Tools = mongoose.model('tools', {
  title: String,
  overview: [String],
  description: [String],
  keypoints: [String],
  imageURL: [String],
  videoURL: [String],
});

const Working = mongoose.model('working', {
  title: String,
  overview: [String],
  description: [String],
  keypoints: [String],
  imageURL: [String],
  videoURL: [String],
});

// Define your routes and APIs here
app.use('/api/signup', signupRouter);
app.use('/api/signin', signinRouter);
app.use('/api/profile', authMiddleware);
app.use('/api/profile', profileRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/forgotpassword', forgotPasswordRouter);
app.use('/api/reset-password', resetPasswordRouter);
app.put('/api/profile', authMiddleware, async (req, res) => {
  try {
    console.log('Received a request to update user profile');

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    // Fetch the user profile based on the user ID
    let userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      console.log('User profile not found');
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Update the user profile fields with the request body data
    userProfile = Object.assign(userProfile, req.body);

    // Save the updated user profile
    await userProfile.save();

    // Send the updated user profile as the response
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});
// Serve profile images with caching disabled
app.get('/uploads/:filename', (req, res) => {
  res.setHeader('Cache-Control', 'no-store'); // Disable caching
  res.sendFile(path.join(__dirname, 'uploads', req.params.filename));
});



app.get('/api/:collection', async (req, res) => {
  const collection = req.params.collection;
  try {
    let data;
    switch (collection) {
     
      case 'tools':
        data = await Tools.find().lean();
        break;
      case 'working':
        data = await Working.find().lean();
        break;
      default:
        return res.status(404).json({ error: 'Collection not found' });
    }
    console.log('Data fetched successfully from', collection, 'collection:', data);
    res.json(data);
  } catch (error) {
    console.error(`Error fetching data from ${collection} collection:`, error);
    res.status(500).json({ error: `Error fetching data from ${collection} collection` });
  }
});

// ChatGPT API endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `You are a helpful assistant: ${message}`,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ reply: response.data.choices[0].text });
  } catch (error) {
    console.error('Error generating chat response:', error);
    res.status(500).json({ error: 'Error generating chat response' });
  }
});
app.get('/api/courses/:title', async (req, res) => {
  try {
    const courseTitle = req.params.title;
    const course = await Course.findOne({ title: courseTitle });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/submit-feedback', async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting feedback' });
  }
});

app.post('/api/submit-query', async (req, res) => {
  try {
    const { name, email, query } = req.body;
    const newQuery = new Query({ name, email, query });
    await newQuery.save();
    res.status(201).json({ message: 'Query submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting query' });
  }
});

app.post('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ error: 'Error logging out' });
    }
    req.session.destroy();
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

app.get('/api/protected', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'This route is protected' });
});

app.get('/api/courses/:title/:module', async (req, res) => {
  try {
    const courseTitle = req.params.title;
    const moduleTitle = req.params.module;
    const course = await Course.findOne({ title: courseTitle });

    if (!course) {
      console.log('Course not found:', courseTitle);
      return res.status(404).json({ error: 'Course not found' });
    }

    if (!course.modules || !Array.isArray(course.modules)) {
      console.log('Modules not found or not an array:', courseTitle);
      return res.status(404).json({ error: 'Modules not found' });
    }

    const module = course.modules.find(
      (module) => module.title === moduleTitle
    );

    if (!module) {
      console.log('Module not found:', moduleTitle);
      return res.status(404).json({ error: 'Module not found' });
    }

    res.json(module);
  } catch (error) {
    console.error('Error fetching module details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.get('/', (req, res) => {
  res.send('Welcome to My API');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Listen for MongoDB collection events
mongoose.connection.on('collection', (collectionName) => {
  console.log(`Collection ${collectionName} changed.`);
})
