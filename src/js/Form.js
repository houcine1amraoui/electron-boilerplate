import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";

export default function Form({
  deviceId,
  deviceExist,
  deviceMainServiceId,
  deviceSubServiceId,
  mainServices,
  subServices,
  cpu,
  memory,
  storageName,
  storageType,
  storageSize,
  osName,
  osArch,
  createDevice,
}) {
  const [filteredSubServices, setFilteredSubServices] = useState(subServices);
  const [selectedMainId, setSelectedMainId] = useState(deviceMainServiceId);
  const [selectedSubId, setSelectedSubId] = useState(deviceSubServiceId);

  const handleSynDeviceClick = () => {
    createDevice({
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
    setFilteredSubServices(
      subServices.filter((sub) => {
        return sub.main.id == selectedMainId;
      })
    );
  }, [selectedMainId]);

  const handleSynAppsClick = () => {};

  return (
    <div className="grid grid-cols-2 gap-2 gap-x-6 mx-6 mt-4">
      <label>Device ID:</label>
      <Input type={"text"} disabled={true} value={deviceId} />

      <label>Main service:</label>
      <select
        value={selectedMainId}
        onChange={(e) => setSelectedMainId(e.target.value)}
        className="border border-gray-400 text-center"
        disabled={deviceExist}
      >
        {mainServices.map((main) => (
          <option key={main.id} value={main.id}>
            {main.name}
          </option>
        ))}
      </select>

      <label>Sub service:</label>
      <select
        value={selectedSubId}
        onChange={(e) => setSelectedSubId(e.target.value)}
        className="border border-gray-400 text-center"
        disabled={deviceExist}
      >
        {filteredSubServices.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.name}
          </option>
        ))}
      </select>

      <label>Office Number:</label>
      <Input type={"number"} disabled={true} />

      <Button
        label={"Device"}
        onClick={handleSynDeviceClick}
        disabled={deviceExist}
      />
      <Button label={"Apps"} onClick={handleSynAppsClick} />
    </div>
  );
}
