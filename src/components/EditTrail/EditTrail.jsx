import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./EditTrail.css";

export default function EditTrail() {
  const { state: locationState } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    difficulty: "easy",
    length: "",
    duration: "",
    image: "/img-default.jpg",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (locationState) {
      setFormData({
        name: locationState.title || "",
        description: locationState.description || "",
        location: locationState.location || "",
        difficulty: locationState.difficulty || "easy",
        length: locationState.length || "",
        duration: locationState.duration || "",
        image:
          locationState.imageUrl || locationState.image || "/img-default.jpg",
      });
    }
  }, [locationState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `https://trail-explorer-backend-git-main-bogomils-projects-951e1882.vercel.app/api/trails?id=${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            userId: currentUser.uid,
          }),
        }
      );

      if (!response.ok) throw new Error(await response.text());
      navigate("/profile", {
        state: { success: "Trail updated successfully!" },
      });
    } catch (err) {
      setError(err.message || "Failed to update trail");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-trail-container">
      <h2>Edit Trail</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="trail-form">
        <div className="form-group">
          <label>Trail Name*</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            disabled={isSubmitting}
          />
        </div>

        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cancel-button"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Trail"}
          </button>
        </div>
      </form>
    </div>
  );
}
