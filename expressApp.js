
import express from 'express';

const app = express();

app.use(express.json());

// Sample employee tasks
let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending",
        priority: "High"
    },
    {
        id: 2,
        taskName: "Create Homepage",
        assignedTo: "Amit Kumar",
        status: "Completed",
        priority: "Medium"
    },
    {
        id: 3,
        taskName: "Design Dashboard",
        assignedTo: "Priya Singh",
        status: "Pending",
        priority: "High"
    }
];

// GET - Display all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// GET - Display task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    res.status(200).json(task);
});

// POST - Add new task
app.post('/tasks', (req, res) => {
    const { id, taskName, assignedTo, status, priority } = req.body;

    if (!id || !taskName || !assignedTo || !status || !priority) {
        return res.status(400).json({
            message: 'All task details are required'
        });
    }

    const newTask = {
        id,
        taskName,
        assignedTo,
        status,
        priority
    };

    tasks.push(newTask);

    res.status(201).json({
        message: 'Task added successfully',
        task: newTask
    });
});

// PUT - Update task
app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    tasks[index] = {
        ...tasks[index],
        ...req.body,
        id: id
    };

    res.status(200).json({
        message: 'Task updated successfully',
        task: tasks[index]
    });
});

// DELETE - Delete task
app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    tasks.splice(index, 1);

    res.status(200).json({
        message: 'Task deleted successfully'
    });
});

// Start server
app.listen(4000, () => {
    console.log('Express Server running at http://localhost:4000');
});
