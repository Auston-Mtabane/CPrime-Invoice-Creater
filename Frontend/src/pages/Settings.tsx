import ProfileInfo from "../components/ProfileInfo";
import { useState } from "react";

type Mode = "edit" | "save";

const Settings = () => {
  const [mode, setMode] = useState<Mode>("save");

  const changeMode = () => {
    setMode(mode == "save" ? "edit":"save");
  };

  return (
    <div className="page">
      <ProfileInfo mode={mode}/>
      <button onClick={changeMode}>{mode}</button>
    </div>
  );
};

export default Settings;
