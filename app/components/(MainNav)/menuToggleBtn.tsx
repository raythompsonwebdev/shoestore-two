"use client";
import React, { useState } from "react";

export default function MenuToggleBtn() {
  const [visibility, setVisibility] = useState<boolean>(false);

  const toggleVisibility = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  return (
    <button id="menu-toggle-btn" type="button" onClick={toggleVisibility}>
      MENU
    </button>
  );
}
