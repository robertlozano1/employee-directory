import express from "express";
import employees from "#db/employees";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// GET / - sends string ("Hello employees!")
app.get("/", (req, res) => {
  res.status(200).send("Hello employees!");
});

// GET /employees - sends the array of employees (Return all employees)
app.get("/employees", (req, res) => {
  res.status(200).json(employees);
});

// GET /employees/random - Return a random employee from the array.
app.get("/employees/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  const randomEmployee = employees[randomIndex];
  res.status(200).json(randomEmployee);
});

// GET /employees/:id - Sends employee with the given id. Add 404 message if no employee found with that id.
app.get("/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === employeeId);

  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).json({ error: "Employee not found" });
  }
});

export default app;
