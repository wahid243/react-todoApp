import React from "react";

function Button({ eventHandler, name, title }) {
  return (
    <button
      onClick={() => {
        eventHandler();
      }}
      title={title}
    >
      {name}
    </button>
  );
}
//{ backgroundColor: "color-mix(in srgb, white, transparent 99%)" }
export default Button;
