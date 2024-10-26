import { useState, useEffect } from "react";

function useTaskManager() {
  // tasks array state
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // input field temporary state
  const [taskName, setTaskName] = useState("");

  // checkbox state
  // const [checked, setChecked] = useState(false);

  // deleting states
  const [deletedTasks, setDeletedTasks] = useState(() => {
    const savedDeletedTasks = localStorage.getItem("deletedTasks");
    return savedDeletedTasks ? JSON.parse(savedDeletedTasks) : [];
  });
  const [deletedListVisible, setDeletedListVisible] = useState(false);

  // Save deleted tasks to localStorage whenever deletedTasks state changes
  useEffect(() => {
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
  }, [deletedTasks]);

  // editing state
  const [isEditing, setIsEditing] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");

  // Task view state: 'all', 'finished', 'notFinished'
  const [taskView, setTaskView] = useState("All Tasks");

  const [selectedPriority, setSelectedPriority] = useState("");

  const [deletingConfirmationIndex, setDeletingConfirmationIndex] =
    useState(null);
  // const [deletingConfirmation, setDeletingConfirmation] = useState(false);
  const [tasksHeaderText, setTasksHeaderText] = useState("All Tasks");
  //------------------------------states end here--------------------------------------//
  // Handle input value change
  const handleInputChange = (e) => {
    e.preventDefault();
    setTaskName(e.target.value);
  };

  // Add new task
  const addTask = () => {
    // checking existing name
    const taskExists = tasks.some((task) => task.name === taskName.trim());

    if (taskName.trim() !== "" && !taskExists) {
      setTasks([
        ...tasks,
        {
          name: taskName.trim(),
          priority: { priorityText: "None Priority", color: "rgb(82, 81, 81)" },
          isChecked: false,
        },
      ]); //--------------------- to change the none to a grey small circle icon
      setTaskName("");
    } else if (taskExists) {
      alert("Same task already exists!");
    } else {
      alert("Please Enter A Task Name");
    }
  };

  // Delete a single task and move it to the deleted tasks list
  const deleteSingleTask = (index) => {
    const taskToDelete = tasks[index];
    const updatedTasks = [...tasks];
    // Add the deleted task to the deleted list
    setDeletedTasks([...deletedTasks, taskToDelete]);

    // Remove the task from the task list
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Vanish a task from the deleted list
  const vanishTask = (index) => {
    const updatedDeletedTasks = [...deletedTasks];
    updatedDeletedTasks.splice(index, 1);
    setDeletedTasks(updatedDeletedTasks);
  };
  // vanishing all tasks
  const deleteAllDeletedTasks = () => {
    setDeletedTasks([]);
  };

  // Toggle visibility of deleted tasks
  const renderListVisible = () => {
    setDeletedListVisible(true);
  };

  const restoreDeletedTask = (index) => {
    const taskToRestore = deletedTasks[index];
    const updatedDeletedTasks = [...deletedTasks];

    // Remove the task from the deleted list
    updatedDeletedTasks.splice(index, 1);
    setDeletedTasks(updatedDeletedTasks);

    // Add the deleted task to the main list
    setTasks([...tasks, taskToRestore]);
  };

  // editing handler
  const handleEditingInputChange = (e) => {
    e.preventDefault();
    setEditingTaskName(e.target.value.trim());
  };
  const editTaskHandler = (index) => {
    setIsEditing(index);
    setEditingTaskName(tasks[index].name.trim());
  };

  const saveEditedTask = (index) => {
    const updatedTasks = [...tasks];
    if (editingTaskName.trim() === "") {
      alert(`The input field is empty Please write something`);
    } else {
      updatedTasks[index].name = editingTaskName.trim();
      setTasks(updatedTasks);
      setIsEditing(null); // Exit edit mode
      setEditingTaskName(""); // Reset input field
    }
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setEditingTaskName("");
  };

  // checkbox implement
  const toggleTaskCompletion = (index) => {
    const updatedCompletedTasks = [...tasks];
    // setChecked (!checked)
    updatedCompletedTasks[index].isChecked =
      !updatedCompletedTasks[index].isChecked;
    setTasks(updatedCompletedTasks);
  };

  // Filtering tasks based on the current view

  const filteredTasks = tasks.filter((task, index) => {
    if (selectedPriority) {
      // Filter by the selected priority
      // setTasksHeaderText(`${task.priority.priorityText} List`);
      return task.priority.priorityText === selectedPriority;
    } else if (taskView === "Finished Tasks") {
      if (task.isChecked) {
        // setTasksHeaderText("Finished Tasks")
        return task;
      }
    } else if (taskView === "Not Finished Tasks") {
      if (!task.isChecked) {
        // setTasksHeaderText ("Not Finished Tasks")
        return task;
      }
    } else if (taskView === "All Tasks") {
      // setTasksHeaderText ("All Tasks")
      return tasks[index];
    } else if (taskView === "Deleted List") {
      return tasks[index];
    }
  });
  const toggleTaskView = (view) => {
    setTaskView(view);
    setDeletedListVisible(false);
  };

  const assignTaskPriority = (updatedTasks) => {
    setTasks(updatedTasks);
  };
  // handle priority selection for a specific task
  const onPrioritySelect = (index, priority, color) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].priority.priorityText = priority;
    updatedTasks[index].priority.color = color;
    assignTaskPriority(updatedTasks);
    setTasks(updatedTasks);
  };

  // handle priority selection for a specific task
  const onPriorityToggle = (priority) => {
    const allTasks = [...tasks];
    let filteredTasks = [];

    if (priority === "High Priority") {
      filteredTasks = allTasks.filter((task) => {
        task.priority.priorityText === "High Priority";
        task.priority.color === "rgba(177, 5, 5, 0.836)";
      });
    } else if (priority === "Medium Priority") {
      filteredTasks = allTasks.filter((task) => {
        task.priority.color = "rgb(214, 202, 32)";
        task.priority.priorityText === "Medium Priority";
      });
    } else if (priority === "Low Priority") {
      filteredTasks = allTasks.filter((task) => {
        task.priority.text = "rgba(6, 87, 6, 0.772)";
        task.priority.priorityText === "Low Priority";
      });
    } else if (priority === "None Priority") {
      filteredTasks = allTasks.filter((task) => {
        task.priority.color = "rgb(82, 81, 81)";
        task.priority.priorityText === "None Priority";
      });
    }
    setSelectedPriority(priority);
    setTaskView(null);
    return filteredTasks;
  };

  return {
    tasks,
    taskName,
    deletedTasks,
    deletedListVisible,
    handleInputChange,
    addTask,
    deleteSingleTask,
    vanishTask,
    deleteAllDeletedTasks,
    setDeletedListVisible,
    renderListVisible,
    restoreDeletedTask,
    isEditing,
    editingTaskName,
    handleEditingInputChange,
    editTaskHandler,
    saveEditedTask,
    cancelEditing,
    toggleTaskCompletion,
    filteredTasks,
    toggleTaskView,
    onPrioritySelect,
    onPriorityToggle,
    setTaskView,
    setSelectedPriority,
    deletingConfirmationIndex,
    setDeletingConfirmationIndex,
    tasksHeaderText,
    setTasksHeaderText,
    // checked,
  };
}
export default useTaskManager;
