import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: [
    "https://trailexplorer-2a121.web.app",
    "https://trailexplorer-2a121.firebaseapp.com",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema
const trailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  difficulty: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "/img-1.jpg" },
  category: { type: String, default: "Adventure" },
  likes: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: String, required: false },
      rating: { type: Number, required: false, min: 1, max: 5 },
      comment: { type: String, required: false },
    },
  ],
});

const Trail = mongoose.model("Trail", trailSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the TrailExplorer API!");
});

// Test route

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", db: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected" });
});

// Get all trails
app.get("/api/trails", async (req, res) => {
  try {
    const trails = await Trail.find();
    res.json(trails);
  } catch (error) {
    res.status(500).json({ error: "Error fetching trails" });
  }
});

// Add a new trail
app.post("/api/trails", async (req, res) => {
  try {
    const { name, location, difficulty, description, image, category } = req.body;
    const newTrail = new Trail({
      name,
      location,
      difficulty,
      description,
      image: image || "/img-1.jpg",
      category: category || "Adventure"
    });
    await newTrail.save();
    res.status(201).json(newTrail);
  } catch (error) {
    res.status(500).json({ error: "Error adding trail" });
  }
});

// Delete a trail
app.delete("/api/trails/:id", async (req, res) => {
  try {
    const deletedTrail = await Trail.findByIdAndDelete(req.params.id);
    if (!deletedTrail) {
      return res.status(404).json({ error: "Trail not found" });
    }
    res.json({ message: "Trail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting trail" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
