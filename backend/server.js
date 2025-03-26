import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema
const trailSchema = new mongoose.Schema({
  name: String,
  location: String,
  difficulty: String,
  description: String,
});

const Trail = mongoose.model("Trail", trailSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the TrailExplorer API!");
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
    const { name, location, difficulty, description } = req.body;
    const newTrail = new Trail({ name, location, difficulty, description });
    await newTrail.save();
    res.status(201).json(newTrail);
  } catch (error) {
    res.status(500).json({ error: "Error adding trail" });
  }
});

// Delete a trail
app.delete("/api/trails/:id", async (req, res) => {
  try {
    await Trail.findByIdAndDelete(req.params.id);
    res.json({ message: "Trail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting trail" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
