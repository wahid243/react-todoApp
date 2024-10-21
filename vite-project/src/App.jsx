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
        <p
          className="headerText"
        >
          Easy Note
        </p>
        <div className="inputArea">
          <DropdownToggle
            renderListVisible={taskManager.renderListVisible}
            setDeletedListVisible={taskManager.setDeletedListVisible}
            toggleTaskView={taskManager.toggleTaskView}
            onPriorityToggle={taskManager.onPriorityToggle}
            setTaskView={taskManager.setTaskView}
            setSelectedPriority={taskManager.setSelectedPriority}
          />
          <div className="inputFieldAndButton"></div>
          <InputFieldAddingButton
            taskName={taskManager.taskName}
            handleInputChange={taskManager.handleInputChange}
            addTask={taskManager.addTask}
          />
        </div>
      </div>
      <div className="renderingArea">
        {!taskManager.deletedListVisible ? (
          <div className="renderedElement">
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
            />
          </div>
        ) : (
          <div className="renderedElement">
            <DeletedTasksRender
              deletedTasks={taskManager.deletedTasks}
              deletedListVisible={taskManager.deletedListVisible}
              vanishTask={taskManager.vanishTask}
              restoreDeletedTask={taskManager.restoreDeletedTask}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
