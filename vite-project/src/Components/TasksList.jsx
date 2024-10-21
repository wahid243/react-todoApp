import React from "react";
import "./TasksList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEraser,
  faFilePen,
  faStar,
  faRightFromBracket,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import PriorityListRender from "./PriorityList";

function TasksListRender({
  tasks,
  isEditing,
  editingTaskName,
  deleteSingleTask,
  handleEditingInputChange,
  editTaskHandler,
  saveEditedTask,
  cancelEditing,
  toggleTaskCompletion,
  filteredTasks,
  onPrioritySelect,
}) {
  const handleEditingKeyPress = (event) => {
    if (event.key === "Enter") {
      saveEditedTask(isEditing);
    }
  };

  return (
    <>
      {/* Render the list of tasks */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => {
          return (
            <ul key={index}>
              {/*to change to icon later --------------------------> */}
              <ol>
                {isEditing === index ? (
                  <div className="editingBar">
                    <input
                      className="editingBarInputField"
                      onKeyPress={handleEditingKeyPress}
                      type="text"
                      value={editingTaskName}
                      onChange={handleEditingInputChange}
                    />
                    <div className="saveEditButton">
                      <Button
                        eventHandler={() => saveEditedTask(index)}
                        name={<FontAwesomeIcon icon={faFloppyDisk} />}
                        //
                      />
                    </div>
                    <div className="cancelEditButton">
                      <Button
                        eventHandler={cancelEditing}
                        name={<FontAwesomeIcon icon={faXmark} />}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="singleTaskLine-container">
                    {/* to add here the priority icon */}
                    <input
                      className="checkBoxInput"
                      type="checkbox"
                      checked={tasks[index].isChecked}
                      onChange={() => toggleTaskCompletion(index)}
                    />
                    <div className="priorityButton">
                      <PriorityListRender
                        name={<FontAwesomeIcon icon={faStar} />}
                        onPrioritySelect={(priority) =>
                          onPrioritySelect(index, priority)
                        }
                      />
                    </div>

                    {/*to change the name to icon */}
                    <p className="taskPriorityText">{task.priority} </p>
                    <span
                      className="taskText"
                      style={{
                        textDecoration: tasks[index].isChecked
                          ? "line-through"
                          : "none",
                        color: "black",
                      }}
                    >
                      {task.name}
                      {/* to change later the task.priority to an icon*/}
                    </span>
                    <div className="editButton">
                      <Button
                        eventHandler={() => editTaskHandler(index)}
                        name={<FontAwesomeIcon icon={faFilePen} />}
                      />
                    </div>

                    <div className={"trashButton"}>
                      <Button
                        eventHandler={() => deleteSingleTask(index)}
                        name={<FontAwesomeIcon icon={faTrash} />}
                      />
                    </div>
                  </div>
                )}
              </ol>
            </ul>
          );
        })
      ) : (
        <div className="noTasksText">
          <p>No Tasks Available </p>
          {/* <img src={noTasksImage} alt="No Tasks available" /> */}
        </div>
        // to change to a background photo later-------->
      )}
    </>
  );
}

function DeletedTasksRender({
  deletedTasks,
  deletedListVisible,
  vanishTask,
  restoreDeletedTask,
}) {
  return (
    <div style={{ display: deletedListVisible ? "inline" : "none" }}>
      <ul>
        {deletedTasks.length > 0 ? (
          deletedTasks.map((task, index) => (
            <div className="deletedList" key={index}>
              <div className="restoreButton">
                <Button
                  eventHandler={() => restoreDeletedTask(index)}
                  name={<FontAwesomeIcon icon={faRightFromBracket} />}
                />
              </div>
              <ol className="trashNameText">{task.name}</ol>
              <div className="vanishButton">
                <Button
                  eventHandler={() => vanishTask(index)}
                  name={<FontAwesomeIcon icon={faEraser} />}
                />
              </div>
            </div>
          ))
        ) : (
          <ol style={{ listStyle: "none" }}>No deleted tasks</ol>
        )}
      </ul>
    </div>
  );
}

export { TasksListRender, DeletedTasksRender };
