import PropTypes from "prop-types";

function getGradeColor(grade) {
  if (grade >= 90) return "#2e7d32";
  if (grade >= 80) return "#1565c0";
  if (grade >= 70) return "#f57f17";
  return "#c62828";
}

function getLetterGrade(grade) {
  if (grade >= 90) return "A";
  if (grade >= 80) return "B";
  if (grade >= 70) return "C";
  if (grade >= 60) return "D";
  return "F";
}

export default function GradeTable({ grades, loading }) {
  if (loading) {
    return <p style={styles.empty}>Loading grades...</p>;
  }

  if (grades.length === 0) {
    return (
      <p style={styles.empty}>No grades yet. Add your first course above!</p>
    );
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Course</th>
          <th style={{ ...styles.th, textAlign: "center" }}>Credits</th>
          <th style={{ ...styles.th, textAlign: "center" }}>Grade</th>
          <th style={{ ...styles.th, textAlign: "center" }}>Letter</th>
          <th style={styles.th}>Semester</th>
        </tr>
      </thead>
      <tbody>
        {grades.map((g, i) => (
          <tr
            key={g.id}
            style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}
          >
            <td style={styles.td}>{g.course_name}</td>
            <td style={{ ...styles.td, textAlign: "center" }}>
              {g.credit_hours}
            </td>
            <td
              style={{
                ...styles.td,
                textAlign: "center",
                fontWeight: "600",
                color: getGradeColor(g.grade),
              }}
            >
              {g.grade}
            </td>
            <td
              style={{
                ...styles.td,
                textAlign: "center",
                fontWeight: "700",
                color: getGradeColor(g.grade),
              }}
            >
              {getLetterGrade(g.grade)}
            </td>
            <td style={styles.td}>{g.semester}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

GradeTable.propTypes = {
  grades: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      course_name: PropTypes.string.isRequired,
      credit_hours: PropTypes.number.isRequired,
      grade: PropTypes.number.isRequired,
      semester: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#555",
    borderBottom: "2px solid #eee",
  },
  td: {
    padding: "12px 16px",
    fontSize: "14px",
    borderBottom: "1px solid #f0f0f0",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    padding: "40px",
    fontSize: "14px",
  },
};
