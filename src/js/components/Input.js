import React from "react";

export default function Input({ type, disabled, value }) {
  return (
    <input
      type={type}
      disabled={disabled}
      value={value}
      className="border border-gray-400 text-center"
    />
  );
}
