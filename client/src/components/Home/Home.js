import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/chatHistory">
        <p> Open Chat!</p>
      </Link>
    </div>
  );
}
