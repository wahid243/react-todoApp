import React, { useState } from "react";
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
import DeleteConfirmation from "./DeletingMessage";

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
  deletingConfirmationIndex,
  setDeletingConfirmationIndex,
  tasksHeaderText,
  // checked,
}) {
  const [deletingConfirmation, setDeletingConfirmation] = useState(false);
  const handleEditingKeyPress = (event) => {
    if (event.key === "Enter") {
      saveEditedTask(isEditing);
    }
  };
  const cancelDeletingMessage = () => {
    setDeletingConfirmation(false);
  };
  const deletingMessageFunction = (index) => {
    setDeletingConfirmationIndex(index);
    setDeletingConfirmation(!deletingConfirmation);
  };
  // const isStrike = (index)=> {
  //   tasks[index].isChecked = !tasks[index].isChecked
  // }
  return (
    <>
      <p className="allTasksHeader">{tasksHeaderText}</p>
      {/* Render the list of tasks */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => {
          return (
            <ul key={index} style={{ border: "none" }}>
              <ol className="allListsContainer">
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
                        title="Save Edit"
                        eventHandler={() => saveEditedTask(index)}
                        name={<FontAwesomeIcon icon={faFloppyDisk} />}
                        //
                      />
                    </div>
                    <div className="cancelEditButton">
                      <Button
                        title="Cancel Edit"
                        eventHandler={cancelEditing}
                        name={<FontAwesomeIcon icon={faXmark} />}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="singleTaskLine-container">
                    <input
                      className="checkBoxInput"
                      type="checkbox"
                      title="Finished"
                      checked={task.isChecked}
                      onChange={() => toggleTaskCompletion(index)}
                    />
                    <div className="priorityButton">
                      <PriorityListRender
                        tasksColor={task.priority.color}
                        name={<FontAwesomeIcon icon={faStar} />}
                        onPrioritySelect={(priority, color) =>
                          onPrioritySelect(index, priority, color)
                        }
                      />
                    </div>

                    <span
                      className="taskText"
                      style={{
                        textDecoration: task.isChecked
                          ? "line-through"
                          : "none",
                        textDecorationColor: task.isChecked ? "black" : "none",
                        textDecorationThickness: task.isChecked
                          ? "2px"
                          : "none",
                        textDecorationStyle: task.isChecked ? "double" : "none",
                      }}
                    >
                      {task.name}
                    </span>
                    <div className="editButton">
                      <Button
                        title="Edit"
                        eventHandler={() => editTaskHandler(index)}
                        name={<FontAwesomeIcon icon={faFilePen} />}
                      />
                    </div>

                    <div className={"trashButton"}>
                      <Button
                        title="Delete"
                        eventHandler={() => deletingMessageFunction(index)}
                        name={<FontAwesomeIcon icon={faTrash} />}
                      />
                    </div>

                    <DeleteConfirmation
                      eventHandler={() => {
                        {
                          deleteSingleTask(index),
                            setDeletingConfirmation(false);
                        }
                      }}
                      styles={{
                        display:
                          deletingConfirmationIndex === index &&
                          deletingConfirmation
                            ? "inline"
                            : "none",
                      }}
                      para="Move to the trash ?"
                      styles2={cancelDeletingMessage}
                      onMouseLeaves={() => setDeletingConfirmation(false)}
                    />
                  </div>
                )}
              </ol>
            </ul>
          );
        })
      ) : (
        <div className="noTasksText">
          <p>No Tasks Available </p>
        </div>
      )}
    </>
  );
}

function DeletedTasksRender({
  deletedTasks,
  deletedListVisible,
  vanishTask,
  restoreDeletedTask,
  deletingConfirmationIndex,
  setDeletingConfirmationIndex,
  deleteAllDeletedTasks,
}) {
  const [deletingConfirmation, setDeletingConfirmation] = useState(false);
  const [deletingConfirmation2, setDeletingConfirmation2] = useState(false);
  const cancelDeletingMessage = () => {
    setDeletingConfirmation(false);
    setDeletingConfirmation2(false);
  };
  const deletingMessageFunction = (index) => {
    setDeletingConfirmationIndex(index);
    setDeletingConfirmation(!deletingConfirmation);
  };
  const deletingMessageFunction2 = () => {
    setDeletingConfirmationIndex();
    setDeletingConfirmation2(!deletingConfirmation2);
  };
  return (
    <div>
      <p className="allTasksHeader">Trash List</p>
      <div className="deleteAllDeletedTask">
        {deletedTasks.length > 0 ? (
          <Button
            eventHandler={() => deletingMessageFunction2()}
            title="Empty the trash"
            name="Empty Trash"
          />
        ) : (
          ""
        )}
      </div>

      <DeleteConfirmation
        eventHandler={() => {
          deleteAllDeletedTasks(), cancelDeletingMessage();
        }}
        styles={{
          display: deletingConfirmation2 ? "inline" : "none",
        }}
        para="Are you sure you want to empty the Trash permanently ?"
        styles2={cancelDeletingMessage}
        onMouseLeaves={() => setDeletingConfirmation2(false)}
      />

      <ul className="deleteListContainer">
        {deletedTasks.length > 0 ? (
          deletedTasks.map((task, index) => (
            <div
              className="deletedList"
              key={index}
              style={{ display: deletedListVisible ? "flex" : "none" }}
            >
              <div className="restoreButton">
                <Button
                  title="Restore task"
                  eventHandler={() => {
                    restoreDeletedTask(index), cancelDeletingMessage();
                  }}
                  name={<FontAwesomeIcon icon={faRightFromBracket} />}
                />
              </div>
              <ol className="trashNameText">{task.name}</ol>
              <div className="vanishButton">
                <Button
                  title="Delete Permanently"
                  eventHandler={() => deletingMessageFunction(index)}
                  name={<FontAwesomeIcon icon={faEraser} />}
                />
              </div>
              <DeleteConfirmation
                eventHandler={() => {
                  {
                    vanishTask(index), cancelDeletingMessage();
                  }
                }}
                styles={{
                  display:
                    deletingConfirmationIndex === index && deletingConfirmation
                      ? "inline"
                      : "none",
                }}
                para="Are you sure you want to delete it permanently ?"
                styles2={cancelDeletingMessage}
                onMouseLeaves={() => setDeletingConfirmation(false)}
              />
            </div>
          ))
        ) : (
          <p className="bottomText">No deleted tasks</p>
        )}
      </ul>
    </div>
  );
}

export { TasksListRender, DeletedTasksRender };
