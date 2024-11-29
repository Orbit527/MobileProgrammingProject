import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

// this SettingsProvider was done with the help of ChatGPt

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    trackingZoom: 0.002,
    trackingAccuracy: 6,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem("appSettings");
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem("appSettings", JSON.stringify(settings));
      } catch (error) {
        console.error("Failed to save settings:", error);
      }
    };
    saveSettings();
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to consume settings
export const useSettings = () => useContext(SettingsContext);
