import React, { useEffect, useState } from "react";

export default function App() {
  const getDeviceId = async () => {
    // Get Device ID
    const baseboard = await window.api.baseBoard();
    const deviceId = baseboard.serial;
    console.log(deviceId);
  };
  useEffect(() => {
    getDeviceId();
  }, []);
  // const [id, setId] = useState(await window.versions.baseBoard().serial);
  return (
    <div>
      <h1></h1>
      <button onClick={() => {}}>Notify</button>
    </div>
  );
}
