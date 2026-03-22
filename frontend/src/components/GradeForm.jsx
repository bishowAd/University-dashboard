import PropTypes from "prop-types";
import Input from "./Input";

export default function GradeForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  error,
}) {
  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <Input
          type="text"
          placeholder="Course name (e.g. Data Structures)"
          value={form.course_name}
          onChange={(e) => onChange({ ...form, course_name: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Credit hours (e.g. 3)"
          value={form.credit_hours}
          onChange={(e) => onChange({ ...form, credit_hours: e.target.value })}
        />
      </div>
      <div style={styles.row}>
        <Input
          type="number"
          placeholder="Grade (0-100)"
          value={form.grade}
          onChange={(e) => onChange({ ...form, grade: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Semester (e.g. Spring 2025)"
          value={form.semester}
          onChange={(e) => onChange({ ...form, semester: e.target.value })}
        />
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.buttons}>
        <button style={styles.submitBtn} onClick={onSubmit}>
          Save Grade
        </button>
        <button style={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

GradeForm.propTypes = {
  form: PropTypes.shape({
    course_name: PropTypes.string.isRequired,
    credit_hours: PropTypes.string.isRequired,
    grade: PropTypes.string.isRequired,
    semester: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  error: PropTypes.string,
};

GradeForm.defaultProps = {
  error: "",
};

const styles = {
  container: {
    background: "#f5f7ff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  buttons: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  submitBtn: {
    background: "#1a237e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 24px",
    fontSize: "14px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "transparent",
    color: "#1a237e",
    border: "1px solid #1a237e",
    borderRadius: "8px",
    padding: "10px 24px",
    fontSize: "14px",
    cursor: "pointer",
  },
  error: {
    background: "#ffebee",
    color: "#c62828",
    padding: "10px 16px",
    borderRadius: "8px",
    marginBottom: "8px",
    fontSize: "14px",
  },
};
