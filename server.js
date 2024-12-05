const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 5000;

//Database Setup
const { MongoClient, ServerApiVersion } = require('mongodb');
var dbpassword = "iesp7fpassword"
var dbusername = "iesp7f"
const uri = `mongodb+srv://${dbusername}:${dbpassword}@cluster0.n2huo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

//Server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('ourServer.html', function(error,data){
     if(error){
        res.writeHead(404);
        res.write("Error: file not found")
     }else{
        res.write(data);
     
     }
        res.end();
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);


});
