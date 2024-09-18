import { createContext } from 'react';

type AppContextType = {
  contextExample?: string;
  setContextExample?: (val: string) => void;
  dataSetList: {
    capabilities: Record<string, any>[];
    setCapabilities: Function;
  };
  layerPicker: {
    selectLayers: Record<string, any>[];
    setSelectLayers: Function;
  };
};
const AppContext = createContext<AppContextType | null>(null);

export default AppContext;
