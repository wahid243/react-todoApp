import React, { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCircleChevronDown,
  faPersonDigging,
} from "@fortawesome/free-solid-svg-icons";
import "./DropdownList.css";

function DropdownToggle({
  renderListVisible,
  toggleTaskView,
  onPriorityToggle,
  setTaskView,
  setSelectedPriority,
  setDeletedListVisible,
}) {
  // DropdownToggle
  // Dropdown visibility state
  const [isHidden, setIsHidden] = useState(true);
  const [prioritiesListRender, setPrioritiesListRender] = useState(false);

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
  };

  const resetPriorityFilter = (view) => {
    setTaskView(view);
    setSelectedPriority("");
  };

  return (
    <div className="dropdown">
      <Button
        eventHandler={toggleVisibility}
        name={<FontAwesomeIcon icon={faPersonDigging} />}
        className="dropListButton"
        aria-label="Toggle dropdown menu"
      />

      {/* Dropdown list */}
      <div
        className="dropdown-content"
        style={{ display: isHidden ? "none" : "inline" }}
      >
        <br />
        <a
          href="#"
          onClick={() => {
            {
              resetPriorityFilter("All");
              toggleTaskView("All"),
                setPrioritiesListRender(false),
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
        >
          Priorities
        </a>
        <br />
        <div
          className="dropDownPrioritiesList"
          style={{ display: prioritiesListRender ? "none" : "inline" }}
        >
          <a
            href="#"
            onClick={() => {
              toggleAllFunctions("None");
            }}
          >
            None
          </a>
          <br />
          <a
            href="#"
            onClick={() => {
              toggleAllFunctions("High");
            }}
          >
            High
          </a>
          <br />
          <a
            href="#"
            onClick={() => {
              toggleAllFunctions("Medium");
            }}
          >
            Medium
          </a>
          <br />
          <a
            href="#"
            onClick={() => {
              toggleAllFunctions("Low");
            }}
          >
            Low
          </a>
          <br />
        </div>
        <a
          href="#"
          onClick={() => {
            {
              toggleTaskView("finished"),
                toggleVisibility(),
                resetPriorityFilter("finished");
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
              toggleTaskView("notFinished"),
                toggleVisibility(),
                resetPriorityFilter("notFinished");
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
                resetPriorityFilter("deletedList");
            }
          }}
          href="#"
        >
          Deleted Tasks
        </a>
      </div>
    </div>
  );
}

export default DropdownToggle;
