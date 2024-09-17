import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Views from './interfaces/Views';
import ComponentA from './Components/ComponentA/ComponentA';
import Map from './Components/Map/Map';
import ComponentC from './Components/ComponentC/ComponentC';
import ComponentD from './Components/ComponentD/ComponentD';
import ComponentE from './Components/ComponentE/ComponentE';
import AppContext from './providers/context';

const App = () => {
  const [tab, setTab] = useState<Views>(Views.E);
  const [contextExample, setContextExample] = useState<string>('Hi');
  const handleViewChange = (view: Views) => setTab(view);

  return (
    <AppContext.Provider value={{ contextExample, setContextExample }}>
      <Header toggleTab={handleViewChange} />
      {tab === Views.A && <ComponentA />}
      {tab === Views.B && <Map />}
      {tab === Views.C && <ComponentC />}
      {tab === Views.D && <ComponentD />}
      {tab === Views.E && <ComponentE />}
    </AppContext.Provider>
  );
};

export default App;
