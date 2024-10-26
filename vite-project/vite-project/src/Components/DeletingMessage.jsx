import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import "./DeletingMessage.css";

function DeleteConfirmation({ eventHandler, para, styles, styles2, onMouseLeaves}) {
  return (
    <div className="deletingMessageConfirmation" style={styles} onMouseLeave={onMouseLeaves}>
      <p>{para}</p>
      <div className="deleteMessageButtons">
        <div className="deleteButton">
          <Button
            title="Delete"
            eventHandler={eventHandler}
            name={<FontAwesomeIcon icon={faCheck} />}
          />
        </div>
        <div className="cancelDelete">
          <Button
            title="Cancel Delete"
            eventHandler={styles2}
            name={<FontAwesomeIcon icon={faXmark} />}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
