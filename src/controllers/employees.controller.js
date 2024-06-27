import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al conectar la base de datos" });
  }
};
export const getEmployeesById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length != 1) {
      return res.status(404).json({ message: "No se encontro el empleado" });
    }

    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al conectar la base de datos" });
  }
};
export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?,?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al conectar la base de datos" });
  }
};
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;
    const [result] = await pool.query(
      "UPDATE employee SET name=IFNULL(?,name), salary=IFNULL(?,salary) WHERE id= ?",
      [name, salary, id]
    );

    if (result.affectedRows == 0) {
      return res
        .status(404)
        .json({ message: "No se actualizo ningun empleado" });
    }

    const [rows] = await pool.query("SELECT * FROM employee WHERE id= ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al conectar la base de datos" });
  }
};

export const deleteEmployee = async (req, res) => {
  const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
    req.params.id,
  ]);
  if (result.affectedRows == 0) {
    return res.status(404).json({ message: "No se encontro el empleado" });
  }
  res.json({ message: "El empleado se elimino correctamente" });
};
