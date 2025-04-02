import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./CreateTrail.css";

export default function CreateTrail() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    difficulty: "easy",
    length: "",
    duration: "",
    image: "/img-default.jpg",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!currentUser) {
      setError("Please log in first!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        "https://trail-explorer-backend-git-main-bogomils-projects-951e1882.vercel.app/api/trails",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            userId: currentUser.uid,
            likes: 0,
            createdAt: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) throw new Error(await response.text());
      navigate("/profile", { state: { success: "Trail created successfully!" } });
    } catch (err) {
      setError(err.message || "Failed to create trail");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-trail-container">
      <h2>Create New Trail</h2>
      <form onSubmit={handleSubmit} className="trail-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>Trail Name*</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Mountain Peak Trail"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="A scenic trail with beautiful views..."
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location*</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Rocky Mountains, CO"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>Difficulty*</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Length (km)*</label>
            <input
              type="number"
              name="length"
              value={formData.length}
              onChange={handleChange}
              placeholder="8.3"
              min="0"
              step="0.1"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>Duration (hours)*</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="3.5"
              min="0"
              step="0.5"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/trail.jpg"
            disabled={isSubmitting}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Trail"}
        </button>
      </form>
    </div>
  );
}
