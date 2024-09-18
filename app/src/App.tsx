import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Views from './interfaces/Views';
import DatasetList from './Components/DatasetList/DatasetList';
import Map from './Components/Map/Map';
import ComponentC from './Components/ComponentC/ComponentC';
import ComponentD from './Components/ComponentD/ComponentD';
import ComponentE from './Components/ComponentE/ComponentE';
import AppContext from './providers/context';

const App = () => {
  const [tab, setTab] = useState<Views>(Views.E);
  const [contextExample, setContextExample] = useState<string>();
  const [capabilities, setCapabilities] = useState([]);
  const handleViewChange = (view: Views) => setTab(view);
  return (
    <AppContext.Provider
      value={{
        contextExample,
        setContextExample,
        dataSetList: { capabilities, setCapabilities },
      }}
    >
      <Header toggleTab={handleViewChange} />
      {tab === Views.Map && <Map />}
      {tab === Views.DatasetList && <DatasetList />}
      {tab === Views.C && <ComponentC />}
      {tab === Views.D && <ComponentD />}
      {tab === Views.E && <ComponentE />}
    </AppContext.Provider>
  );
};

export default App;
