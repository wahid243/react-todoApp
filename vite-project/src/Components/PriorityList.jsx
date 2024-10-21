import React, { useState } from "react";
import "./PriorityList.css";

function PriorityListRender({ name, onPrioritySelect }) {
  const [priorityList, setPriorityList] = useState(false);
  const togglePriorityList = () => {
    setPriorityList(!priorityList);
  };
  return (
    <div>
      {/* Toggle Button or Link */}
      <a className="priorityListTrigger" href="#" onClick={togglePriorityList}>
        {name}
      </a>
      {/* Render Priority List based on state */}
      {priorityList && (
        <div className="priorityList">
          <a
          className="nonPriority"
            href="#"
            onClick={() => {
              onPrioritySelect("None"), togglePriorityList();
            }}
          >
            None
          </a>
          <br />
          <a
            className="highPriority"
            href="#"
            onClick={() => {
              onPrioritySelect("High"), togglePriorityList();
            }}
          >
            High
          </a>
          <br />
          <a
          className="mediumPriority"
            href="#"
            onClick={() => {
              onPrioritySelect("Medium"), togglePriorityList();
            }}
          >
            Medium
          </a>
          <br />
          <a
          className="lowPriority"
            href="#"
            onClick={() => {
              onPrioritySelect("Low"), togglePriorityList();
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
