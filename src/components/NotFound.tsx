import React from "react";
import { useNavigate } from "react-router-dom";
export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Page not found :/</h2>
      <button onClick={() => navigate("/")}>Go back </button>
    </div>
  );
};
