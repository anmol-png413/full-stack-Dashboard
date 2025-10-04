import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const q = req.query.q || "";
  const filter = { user: req.user._id };
  if (q) filter.title = { $regex: q, $options: "i" };
  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });
  const task = await Task.create({ title, description, user: req.user._id });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });
  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  await task.save();
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });
  await task.remove();
  res.json({ message: "Task removed" });
};
