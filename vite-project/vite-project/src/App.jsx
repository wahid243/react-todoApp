import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import DropdownToggle from "./Components/DropdownList";
import InputFieldAddingButton from "./Components/InputField&addingButton";
import { TasksListRender, DeletedTasksRender } from "./Components/TasksList";
import useTaskManager from "./Hooks/tasksManager";

function App() {
  const taskManager = useTaskManager();
  return (
    <div className="outerContainer">
      {/* Dropdown menu for task management */}
      <div className="header">
        <div className="headerText">Easy Note</div>
        <div className="inputArea">
          <DropdownToggle
            renderListVisible={taskManager.renderListVisible}
            setDeletedListVisible={taskManager.setDeletedListVisible}
            toggleTaskView={taskManager.toggleTaskView}
            onPriorityToggle={taskManager.onPriorityToggle}
            setTaskView={taskManager.setTaskView}
            setSelectedPriority={taskManager.setSelectedPriority}
            setTasksHeaderText= {taskManager.setTasksHeaderText}
          />
          <InputFieldAddingButton
            taskName={taskManager.taskName}
            handleInputChange={taskManager.handleInputChange}
            addTask={taskManager.addTask}
          />
        </div>
      </div>
      <div>
        {!taskManager.deletedListVisible ? (
          <TasksListRender
            tasks={taskManager.tasks}
            deleteSingleTask={taskManager.deleteSingleTask}
            isEditing={taskManager.isEditing}
            editingTaskName={taskManager.editingTaskName}
            handleEditingInputChange={taskManager.handleEditingInputChange}
            editTaskHandler={taskManager.editTaskHandler}
            saveEditedTask={taskManager.saveEditedTask}
            cancelEditing={taskManager.cancelEditing}
            toggleTaskCompletion={taskManager.toggleTaskCompletion}
            filteredTasks={taskManager.filteredTasks}
            onPrioritySelect={taskManager.onPrioritySelect}
            deletingConfirmationIndex={taskManager.deletingConfirmationIndex}
            setDeletingConfirmationIndex={taskManager.setDeletingConfirmationIndex}
            tasksHeaderText ={taskManager.tasksHeaderText}
            // checked = {taskManager.checked}
          />
        ) : (
          <DeletedTasksRender
            deletedTasks={taskManager.deletedTasks}
            deletedListVisible={taskManager.deletedListVisible}
            vanishTask={taskManager.vanishTask}
            restoreDeletedTask={taskManager.restoreDeletedTask}
            deletingConfirmationIndex={taskManager.deletingConfirmationIndex}
            setDeletingConfirmationIndex={taskManager.setDeletingConfirmationIndex}
            deleteAllDeletedTasks = {taskManager.deleteAllDeletedTasks}
          />
        )}
      </div>
    </div>
  );
}

export default App;
