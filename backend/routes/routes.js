const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/auth");

// GET /api/data/profile — protected route
// Only logged in users can access this
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
      [req.user.userId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/data/grades — get all grades for logged in student
router.get("/grades", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT g.id, c.course_name, c.credit_hours, g.grade, g.semester
       FROM grades g
       JOIN courses c ON g.course_id = c.id
       WHERE g.user_id = ?
       ORDER BY g.semester DESC`,
      [req.user.userId],
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/data/grades — add a new grade
router.post("/grades", authMiddleware, async (req, res) => {
  const { course_name, credit_hours, grade, semester } = req.body;

  try {
    // 1. Create the course first
    const [course] = await db.query(
      "INSERT INTO courses (user_id, course_name, credit_hours) VALUES (?, ?, ?)",
      [req.user.userId, course_name, credit_hours],
    );

    // 2. Add the grade linked to that course
    await db.query(
      "INSERT INTO grades (user_id, course_id, grade, semester) VALUES (?, ?, ?, ?)",
      [req.user.userId, course.insertId, grade, semester],
    );

    res.json({ message: "Grade added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/data/study — log a study session
router.post("/study", authMiddleware, async (req, res) => {
  const { date, hours, course_id } = req.body;

  try {
    await db.query(
      "INSERT INTO study_sessions (user_id, date, hours, course_id) VALUES (?, ?, ?, ?)",
      [req.user.userId, date, hours, course_id],
    );

    res.json({ message: "Study session logged" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
