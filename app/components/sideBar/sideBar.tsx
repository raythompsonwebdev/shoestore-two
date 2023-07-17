"use client";
import React, { useState } from "react";
import AccordianMenu from '../accordianMenu'
import FindShoes from '../homepage/FindShoes'


export default function SideBar () {
  const [visibility, setVisibility] = useState<boolean>(false);

  const sidebarVisibility = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setVisibility(!visibility)
  }

  return (
    <>
      <button
              id="sidebar-toggle-btn"
              type="button"
              onClick={sidebarVisibility}
              aria-label="secondary menu toggle button"
            >
              SIDE
      </button>
      <aside
      className={`left-side-content ${visibility ? 'is-expanded' : ' '}`}
    >
      <FindShoes />
        <AccordianMenu />
    </aside>
   </>
  );
}
