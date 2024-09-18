import { createContext } from 'react';

type AppContextType = {
  contextExample?: string;
  setContextExample?: (val: string) => void;
  dataSetList: {
    capabilities: Record<string, any>[];
    setCapabilities: (data: Record<string, any>) => void;
  };
};
const AppContext = createContext<AppContextType | null>(null);

export default AppContext;
