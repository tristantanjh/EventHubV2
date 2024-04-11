import React, { useEffect } from "react";

export default function ErrorPage() {
  useEffect(() => {
    document.title = "Error | EventHub";
  }, []);

  return (
    <div>
      <h1>Error</h1>
      <p>Error content</p>
    </div>
  );
}
