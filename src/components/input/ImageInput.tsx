import React from "react";

export const ImageInput: React.FC = () => {
  return (
    <label>
      <input type="file" accept="image/*" style={{ display: "none" }} />
    </label>
  );
};
