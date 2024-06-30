import React, { useEffect, useState } from "react";

const Toggle = ({ on, off }: any) => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (isOn) on();
    else off();
  }, [isOn]);
  return (
    <div className="toggle-wrapper">
      <label className="switch">
        <input
          type="checkbox"
          onClick={() => {
            setIsOn(!isOn);
          }}
          checked={isOn}
        />
        <span className="slider round"> </span>
      </label>
      <span className={isOn ? "connected" : "disconnected"}>
        {isOn ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
};

export default Toggle;
