import React, { useEffect, useState } from "react";
import Form from "./Form";

export default function App() {
  const [deviceId, setDeviceId] = useState("");
  const [deviceExist, setDeviceExist] = useState(false);
  const [deviceMainServiceId, setDeviceMainServiceId] = useState("");
  const [deviceSubServiceId, setDeviceSubServiceId] = useState("");
  const [mainServices, setMainServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [cpu, setCpu] = useState("");
  const [memory, setMemory] = useState("");
  const [storageName, setStorageName] = useState("");
  const [storageType, setStorageType] = useState("");
  const [storageSize, setStorageSize] = useState(0);
  const [osName, setOsName] = useState("");
  const [osArch, setOsArch] = useState("");

  const getData = async () => {
    setDeviceId("test3");
    setMainServices(await window.api.fetchMainServicesList());
    setSubServices(await window.api.fetchSubServicesList());

    // CPU and Memory
    setCpu((await window.api.cpu()).brand);
    setMemory(Math.round((await window.api.memory()).total / 1073741824));

    // Storage
    setStorageName((await window.api.diskLayout())[0].name);
    setStorageType((await window.api.diskLayout())[0].type);
    setStorageSize(
      Math.round((await window.api.diskLayout())[0].size / 1073741824)
    );

    // System
    setOsName((await window.api.osInfo()).distro);
    setOsArch((await window.api.osInfo()).arch);
  };

  const checkDevice = async () => {
    const device = await window.api.fetchDevice(deviceId);
    if (device) {
      setDeviceMainServiceId(device.service.main.id);
      setDeviceSubServiceId(device.serviceId);
      setDeviceExist(true);
    } else {
      setDeviceExist(false);
    }
  };

  const createDevice = async ({
    deviceId,
    deviceSubServiceId,
    cpu,
    memory,
    storageName,
    storageType,
    storageSize,
    osName,
    osArch,
  }) => {
    await window.api.createDevice({
      deviceId,
      deviceSubServiceId,
      cpu,
      memory,
      storageName,
      storageType,
      storageSize,
      osName,
      osArch,
    });
  };
  useEffect(() => {
    checkDevice();
  }, [deviceId]);

  useEffect(() => {
    getData();
  }, []);

  const renderedForm = deviceExist ? (
    <Form
      deviceId={deviceId}
      deviceExist={deviceExist}
      deviceMainServiceId={deviceMainServiceId}
      deviceSubServiceId={deviceSubServiceId}
      mainServices={mainServices}
      subServices={subServices}
      cpu={cpu}
      memory={memory}
      storageName={storageName}
      storageType={storageType}
      storageSize={storageSize}
      osName={osName}
      osArch={osArch}
      createDevice={createDevice}
    ></Form>
  ) : (
    <Form
      deviceId={deviceId}
      deviceExist={deviceExist}
      deviceMainServiceId="1"
      deviceSubServiceId="1"
      mainServices={mainServices}
      subServices={subServices}
      cpu={cpu}
      memory={memory}
      storageName={storageName}
      storageType={storageType}
      storageSize={storageSize}
      osName={osName}
      osArch={osArch}
      createDevice={createDevice}
    ></Form>
  );

  return (
    <div>
      <h1 className="flex justify-center mt-4 text-blue-950 text-3xl">
        IT Assets Agent Tracker
      </h1>
      {deviceExist ? (
        <h2 className="flex justify-center text-red-500 text-2xl">
          This device is already stored
        </h2>
      ) : null}
      {renderedForm}
    </div>
  );
}
