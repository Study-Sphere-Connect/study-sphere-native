// HMSContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HMSSDK } from "@100mslive/react-native-hms";
import getHMSInstance from './hms';

interface HMSContextProps {
  hms: HMSSDK | null;
}

const HMSContext = createContext<HMSSDK | null>(null);

interface HMSProviderProps {
  children: ReactNode;
}

export const HMSProvider: React.FC<HMSProviderProps> = ({ children }) => {
  const [hms, setHms] = useState<HMSSDK | null>(null);

  useEffect(() => {
    const initializeHMS = async () => {
      const instance = await getHMSInstance();
      setHms(instance);
    };

    initializeHMS();
  }, []);

  return (
    <HMSContext.Provider value={hms}>
      {children}
    </HMSContext.Provider>
  );
};

export const useHMS = (): HMSSDK | null => {
  return useContext(HMSContext);
};
