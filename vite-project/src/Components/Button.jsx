import React from "react";

function Button({ eventHandler, name,  }) {
  return (
    <button
      onClick={eventHandler}
    >
      {name}
    </button>
  );
}
//{ backgroundColor: "color-mix(in srgb, white, transparent 99%)" }
export default Button;
