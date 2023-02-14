const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware start
app.use(cors());
app.use(express.json());
// Middleware end

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ibovumw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// main part start
async function run() {
  try {
    const blogsCollection = client.db("blog").collection("blogs");
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
