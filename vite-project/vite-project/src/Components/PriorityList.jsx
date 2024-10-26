import React, { useState } from "react";
import "./PriorityList.css";

function PriorityListRender({ tasksColor, name, onPrioritySelect }) {
  const [priorityList, setPriorityList] = useState(false);
  const togglePriorityList = () => {
    setPriorityList(!priorityList);
  };
  return (
    <div>
      {/* Toggle Button or Link */}
      <a
        title="Priority"
        className="priorityListTrigger"
        href="#"
        onClick={togglePriorityList}
        style={{ color: tasksColor }}
      >
        {name}
      </a>
      {/* Render Priority List based on state */}
      {priorityList && (
        <div
          className="priorityList"
          onMouseLeave={() => setPriorityList(false)}
        >
          <a
            className="nonPriority"
            href="#"
            onClick={() => {
              onPrioritySelect("None Priority", "rgb(10, 10, 10)"),
                togglePriorityList();
            }}
          >
            None
          </a>
          <br />
          <a
            className="highPriority"
            href="#"
            onClick={() => {
              onPrioritySelect("High Priority", "rgba(177, 5, 5, 0.836)"),
                togglePriorityList();
            }}
          >
            High
          </a>
          <br />
          <a
            className="mediumPriority"
            href="#"
            onClick={() => {
              onPrioritySelect("Medium Priority", "rgb(214, 202, 32)"),
                togglePriorityList();
            }}
          >
            Medium
          </a>
          <br />
          <a
            className="lowPriority"
            href="#"
            onClick={() => {
              onPrioritySelect("Low Priority", "rgba(6, 87, 6, 0.772)"),
                togglePriorityList();
            }}
          >
            Low
          </a>
          <br />
        </div>
      )}
    </div>
  );
}

export default PriorityListRender;
