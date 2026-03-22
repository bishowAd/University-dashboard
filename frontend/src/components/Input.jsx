import PropTypes from "prop-types";

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={styles.input}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  onKeyDown: () => {},
};

const styles = {
  input: {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    display: "block",
    boxSizing: "border-box",
    fontFamily: "Segoe UI, sans-serif",
  },
};
