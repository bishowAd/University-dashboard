import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import GradeTable from "../components/GradeTable";
import GradeForm from "../components/GradeForm";
import PropTypes from "prop-types";

const EMPTY_FORM = {
  course_name: "",
  credit_hours: "",
  grade: "",
  semester: "",
};

function calculateGPA(grades) {
  if (grades.length === 0) return "0.00";
  const totalPoints = grades.reduce(
    (sum, g) => sum + g.grade * g.credit_hours,
    0,
  );
  const totalCredits = grades.reduce((sum, g) => sum + g.credit_hours, 0);
  return totalCredits > 0
    ? (totalPoints / totalCredits / 25).toFixed(2)
    : "0.00";
}

function calculateAverage(grades) {
  if (grades.length === 0) return "0.0";
  return (grades.reduce((sum, g) => sum + g.grade, 0) / grades.length).toFixed(
    1,
  );
}

function calculateTotalCredits(grades) {
  return grades.reduce((sum, g) => sum + g.credit_hours, 0);
}

export default function Dashboard({ onLogout }) {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchGrades();
  }, []);

  async function fetchGrades() {
    try {
      const res = await api.get("/data/grades");
      setGrades(res.data);
    } catch {
      console.error("Failed to fetch grades");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddGrade() {
    if (
      !form.course_name ||
      !form.credit_hours ||
      !form.grade ||
      !form.semester
    ) {
      setFormError("Please fill in all fields");
      return;
    }

    try {
      await api.post("/data/grades", {
        course_name: form.course_name,
        credit_hours: parseInt(form.credit_hours),
        grade: parseFloat(form.grade),
        semester: form.semester,
      });

      setSuccess("Grade added successfully!");
      setFormError("");
      setForm(EMPTY_FORM);
      setShowForm(false);
      fetchGrades();
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setFormError("Failed to add grade. Please try again.");
    }
  }

  function handleCancelForm() {
    setShowForm(false);
    setForm(EMPTY_FORM);
    setFormError("");
  }

  return (
    <div style={styles.container}>
      <Navbar onLogout={onLogout} />

      <div style={styles.content}>
        {/* Stats row */}
        <div style={styles.statsRow}>
          <StatCard label="Current GPA" value={calculateGPA(grades)} />
          <StatCard
            label="Total Courses"
            value={grades.length}
            color="#6a1b9a"
          />
          <StatCard
            label="Total Credits"
            value={calculateTotalCredits(grades)}
            color="#00695c"
          />
          <StatCard
            label="Average Grade"
            value={calculateAverage(grades)}
            color="#e65100"
          />
        </div>

        {/* Success message */}
        {success && <p style={styles.success}>{success}</p>}

        {/* Grades section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>My Grades</h2>
            <button
              style={styles.addBtn}
              onClick={() => {
                setShowForm(!showForm);
                setFormError("");
              }}
            >
              {showForm ? "Cancel" : "+ Add Grade"}
            </button>
          </div>

          {showForm && (
            <GradeForm
              form={form}
              onChange={setForm}
              onSubmit={handleAddGrade}
              onCancel={handleCancelForm}
              error={formError}
            />
          )}

          <GradeTable grades={grades} loading={loading} />
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f0f2f5",
  },
  content: {
    padding: "32px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  section: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1a237e",
  },
  addBtn: {
    background: "#1a237e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 18px",
    fontSize: "14px",
    cursor: "pointer",
  },
  success: {
    background: "#e8f5e9",
    color: "#2e7d32",
    padding: "10px 16px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
  },
};
