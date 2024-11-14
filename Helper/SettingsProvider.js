import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [trackingZoom, setTrackingZoom] = useState(0.002);

  return (
    <SettingsContext.Provider
      value={{ darkMode, setDarkMode, trackingZoom, setTrackingZoom }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
