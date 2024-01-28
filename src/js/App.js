import React, { useEffect, useState } from "react";

export default function App() {
  const [deviceId, setDeviceId] = useState("");

  const getDeviceId = async () => {
    const baseboard = await window.api.baseBoard();
    const deviceId = baseboard.serial;
    setDeviceId(deviceId);
  };

  useEffect(() => {
    getDeviceId();
  }, []);

  return (
    <div>
      <h1 className="text-blue-400 text-3xl">{deviceId}</h1>
      <button onClick={() => {}}>Notify</button>
    </div>
  );
}
