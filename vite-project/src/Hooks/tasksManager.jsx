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
  const [taskView, setTaskView] = useState("All");

  const [selectedPriority, setSelectedPriority] = useState("");

  //------------------------------states end here--------------------------------------//
  // Handle input value change
  const handleInputChange = (e) => {
    e.preventDefault();
    setTaskName(e.target.value);
  };

  // Add new task
  const addTask = () => {
    if (taskName.trim() !== "") {
      setTasks([
        ...tasks,
        { name: taskName.trim(), priority: "None", isChecked: false, color:"" },
      ]); //--------------------- to change the none to a grey small circle icon
      setTaskName("");
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
    setEditingTaskName(e.target.value);
  };
  const editTaskHandler = (index) => {
    setIsEditing(index);
    setEditingTaskName(tasks[index].name);
  };

  const saveEditedTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].name = editingTaskName.trim();
    setTasks(updatedTasks);
    setIsEditing(null); // Exit edit mode
    setEditingTaskName(""); // Reset input field
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setEditingTaskName("");
  };

  // checkbox implement
  const toggleTaskCompletion = (index) => {
    const updatedCompletedTasks = [...tasks];
    updatedCompletedTasks[index].isChecked =
      !updatedCompletedTasks[index].isChecked;
    setTasks(updatedCompletedTasks);
  };

  // Filtering tasks based on the current view
  const filteredTasks = tasks.filter((task, index) => {
    if (selectedPriority) {
      // Filter by the selected priority
      return task.priority === selectedPriority;
    } else if (taskView === "finished") {
      if (tasks[index].isChecked) {
        return tasks[index];
      }
    } else if (taskView === "notFinished") {
      if (!tasks[index].isChecked) {
        return tasks[index];
      }
    } else if (taskView === "All") {
      return tasks[index];
    } else if (taskView === "deletedList") {
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
  const onPrioritySelect = (index, priority) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].priority = priority;
    assignTaskPriority(updatedTasks);
    setTasks(updatedTasks);
  };

  // handle priority selection for a specific task
  const onPriorityToggle = (priority) => {
    const allTasks = [...tasks];
    let filteredTasks = [];

    if (priority === "High") {
      filteredTasks = allTasks.filter((task) => task.priority === "High");
    } else if (priority === "Medium") {
      filteredTasks = allTasks.filter((task) => task.priority === "Medium");
    } else if (priority === "Low") {
      filteredTasks = allTasks.filter((task) => task.priority === "Low");
    } else if (priority === "None") {
      filteredTasks = allTasks.filter((task) => task.priority === "None");
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
  };
}
export default useTaskManager;
