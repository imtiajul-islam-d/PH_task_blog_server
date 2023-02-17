const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware start
app.use(cors());
app.use(express.json());
// Middleware end

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xbnuhk5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// main part start
async function run() {
  try {
    const blogsCollection = client.db("blog").collection("blogs");
    // post a blog
    app.post("/postBlog", async (req, res) => {
      const blog = req.body;
      const result = await blogsCollection.insertOne(blog);
      res.send(result);
    });
    // get all blogs
    app.get("/getBlog", async (req, res) => {
      const query = {};
      const result = await blogsCollection.find(query).toArray();
      res.send(result);
    });
    // update blog
    app.put("/updateBlog/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBlog = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDocument = {
        $set: {
          blog: updatedBlog,
        },
      };
      const result = await blogsCollection.updateOne(filter, updatedDocument);
      res.send(result);
    });
    // delete a blog
    app.delete("/deleteBlog/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await blogsCollection.deleteOne(filter);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.log);

// main part end

app.get("/", async (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log("Port is running on", port);
});
