"use client";
import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return error && (
    <main id="main-content" className="clearfix">

         <main id="right-content-section" className="group">
          <h2>Something went wrong!</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>

         </main>

       </main>
  );
}
