const Task = require('../models/tasks');

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks })
};

exports.createTask = async (req, res) => {
  console.log('📥 req.body:', req.body);
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send("Task not found");
  res.json(task);
};

exports.updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ msg: error.message }); // ✅ مهم
  }
};


exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).send("Task not found");
  res.json(task);
};
