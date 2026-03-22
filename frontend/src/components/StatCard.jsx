import PropTypes from "prop-types";

export default function StatCard({ label, value, color }) {
  return (
    <div style={styles.card}>
      <p style={styles.label}>{label}</p>
      <p style={{ ...styles.value, color: color || "#1a237e" }}>{value}</p>
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string,
};

StatCard.defaultProps = {
  color: "#1a237e",
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px 24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.2s",
    cursor: "default",
  },
  label: {
    fontSize: "13px",
    color: "#888",
    marginBottom: "8px",
    fontWeight: "500",
  },
  value: {
    fontSize: "28px",
    fontWeight: "700",
  },
};
