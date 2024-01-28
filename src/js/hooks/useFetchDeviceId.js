import { useEffect, useState } from "react";

export default function useFetchDeviceId() {
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    fetchDeviceId();
  }, []);

  const fetchDeviceId = async () => {
    try {
      const deviceId = (await window.api.baseBoard()).serial;
      setDeviceId(deviceId);
    } catch (error) {
      console.log(error.message);
    }
    return { deviceId, setDeviceId };
  };
}
