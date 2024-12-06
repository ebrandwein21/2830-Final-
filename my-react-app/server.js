const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');

//Configuration
const PORT = 5000;
const MONGO_URI = `mongodb+srv://iesp7f:iesp7fpassword@cluster0.n2huo.mongodb.net/?retryWrites=true&w=majority`;
const DATABASE_NAME = '2830Youtube';
const COLLECTION_NAME = 'links';

const videosJsonPath = path.join(__dirname, 'public', 'videos.json');

//MongoDB Client Setup
const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//Initialize Express App
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Update videos.json with found data
async function findVideos() {
  try {
    await client.connect();
    const database = client.db(DATABASE_NAME);
    const videoCollection = database.collection(COLLECTION_NAME);

    //Fetch videos from MongoDB
    const videos = await videoCollection.find().toArray();

    /*  FOR TESTING
    console.log('Fetched data from MongoDB:');
    console.log(videos);*/

    if (videos.length > 0) {
      const formattedVideos = videos.map(video => ({
        title: video.title, 
        link: video.link,  
      }));

      //Write formatted data to videos.json
      fs.writeFileSync(videosJsonPath, JSON.stringify(formattedVideos, null, 2));
      console.log('videos.json updated successfully!');
    } else {
      console.warn('No data found in MongoDB collection. videos.json not updated.');
    }
  } catch (error) {
    console.error('Error fetching videos from MongoDB:', error);

    //Default to nothing
    if (!fs.existsSync(videosJsonPath)) {
      fs.writeFileSync(videosJsonPath, '[]'); // Default to an empty array
    }
  }
}

//Watch for changes in MongoDB collection and update videos.json
async function watchForChanges() {
  try {
    const database = client.db(DATABASE_NAME);
    const videoCollection = database.collection(COLLECTION_NAME);

    //Set up the change stream
    const changeStream = videoCollection.watch();

    console.log('Watching for changes in MongoDB...');

    //Listen for change
    changeStream.on('change', async (change) => {
      //console.log('Detected change in MongoDB:', change);
      await findVideos();
    });
  } catch (error) {
    console.error('Error setting up change stream:', error);
  }
}

//Server Shutdown
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB client disconnected');
  process.exit(0);
});

//Start the Server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await findVideos(); // Fetch data and update videos.json when the server starts
  await watchForChanges(); // Start watching for changes after server startup
});
