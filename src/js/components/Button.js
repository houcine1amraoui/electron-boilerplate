import React from "react";

export default function Button({ label, onClick, disabled }) {
  return (
    <button
      className="bg-slate-700 hover:bg-slate-600 rounded-md p-2 text-white"
      onClick={() => onClick()}
      disabled={disabled}
    >
      Sync {label}
    </button>
  );
}
