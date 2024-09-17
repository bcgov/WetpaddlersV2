import { createContext } from 'react';

type AppContextType = {
  contextExample?: string;
  setContextExample?: (val: string) => void;
};
const AppContext = createContext<AppContextType | null>(null);

export default AppContext;
