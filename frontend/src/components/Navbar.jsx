import PropTypes from "prop-types";

export default function Navbar({ onLogout }) {
  const name = localStorage.getItem("name");

  return (
    <div style={styles.navbar}>
      <div style={styles.left}>
        <h1 style={styles.title}>University Dashboard</h1>
      </div>
      <div style={styles.right}>
        <span style={styles.name}>Welcome, {name}</span>
        <button style={styles.logoutBtn} onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    background: "#1a237e",
    padding: "0 32px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "700",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  name: {
    color: "#c5cae9",
    fontSize: "14px",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #c5cae9",
    color: "#c5cae9",
    padding: "6px 16px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
  },
};

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
