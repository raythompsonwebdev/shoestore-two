'use client'; // Error components must be Client components

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

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

