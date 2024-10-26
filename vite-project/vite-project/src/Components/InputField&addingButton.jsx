import React from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather, faPenNib } from "@fortawesome/free-solid-svg-icons";
import "./InputField&addingButton.css";

function InputFieldAddingButton({ taskName, handleInputChange, addTask }) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };
  return (
    // <FontAwesomeIcon icon={faFeather} />
    <div className="inputFieldContainer">
      <input
        className="inputField"
        type="text"
        placeholder="Enter a task"
        value={taskName}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        autoFocus
      />

      {/* Button for adding tasks */}
      <Button
      title="Add Task"
        eventHandler={addTask}
        name={<FontAwesomeIcon icon={faPenNib} />}
      />
    </div>
  );
}

export default InputFieldAddingButton;
