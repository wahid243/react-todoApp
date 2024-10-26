import React, { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonDigging } from "@fortawesome/free-solid-svg-icons";
import "./DropdownList.css";

function DropdownToggle({
  renderListVisible,
  toggleTaskView,
  onPriorityToggle,
  setTaskView,
  setSelectedPriority,
  setDeletedListVisible,
  setTasksHeaderText,
}) {
  // DropdownToggle
  // Dropdown visibility state
  const [isHidden, setIsHidden] = useState(true);
  const [prioritiesListRender, setPrioritiesListRender] = useState(true);

  // Toggle visibility functions
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  //toggling the priority list
  const togglePrioritiesList = () => {
    setPrioritiesListRender(!prioritiesListRender);
  };

  const toggleAllFunctions = (priority) => {
    onPriorityToggle(priority);
    toggleVisibility();
    setDeletedListVisible(false);
    togglePrioritiesList();
    setTasksHeaderText(priority);
  };

  const resetPriorityFilter = (view) => {
    setTaskView(view);
    setTasksHeaderText(view);
    // setSelectedPriority("");
  };

  return (
    <div className="dropdown">
      <Button
        title="Dropdown List"
        eventHandler={() => {
          toggleVisibility(), setPrioritiesListRender(true);
        }}
        name={<FontAwesomeIcon icon={faPersonDigging} />}
        className="dropListButton"
        aria-label="Toggle dropdown menu"
      />

      {/* Dropdown list */}
      <div
        className="dropdown-content"
        style={{ display: isHidden ? "none" : "inline" }}
        onMouseLeave={() => setIsHidden(true)}
      >
        <br />
        <a
          href="#"
          onClick={() => {
            {
              resetPriorityFilter("All Tasks"),
                toggleTaskView("All Tasks"),
                setPrioritiesListRender(true),
                toggleVisibility();
            }
          }}
        >
          All Tasks
        </a>
        <br />
        {/* Priority List */}
        <a
          href="#"
          onClick={() => {
            togglePrioritiesList();
          }}
          className="priorityListTrigger"
        >
          Priorities
        </a>
        <br />
        <div
          className="priorityList"
          style={{ display: prioritiesListRender ? "none" : "inline" }}
          onMouseLeave={() => setPrioritiesListRender(true)}
        >
          <a
            href="#"
            onClick={() => {
              toggleAllFunctions("None Priority");
            }}
            className="nonPriority"
          >
            None
          </a>
          <br />
          <a
            href="#"
            onClick={() => {
              toggleAllFunctions("High Priority");
            }}
            className="highPriority"
          >
            High
          </a>
          <br />
          <a
            href="#"
            onClick={() => {
              toggleAllFunctions("Medium Priority");
            }}
            className="mediumPriority"
          >
            Medium
          </a>
          <br />
          <a
            href="#"
            onClick={() => {
              toggleAllFunctions("Low Priority");
            }}
            className="lowPriority"
          >
            Low
          </a>
          <br />
        </div>
        <a
          href="#"
          onClick={() => {
            {
              toggleTaskView("Finished Tasks"),
                toggleVisibility();
                resetPriorityFilter("Finished Tasks");
            }
          }}
        >
          Finished Tasks
        </a>
        <br />
        <a
          href="#"
          onClick={() => {
            {
              toggleTaskView("Not Finished Tasks"),
                toggleVisibility();
                resetPriorityFilter("Not Finished Tasks");
            }
          }}
        >
          Not Finished Tasks
        </a>
        <br />
        {/* Deleted Tasks */}
        <a
          onClick={() => {
            {
              renderListVisible(),
                toggleVisibility(),
                resetPriorityFilter("Deleted List");
            }
          }}
          href="#"
        >
          Trash
        </a>
      </div>
    </div>
  );
}

export default DropdownToggle;
