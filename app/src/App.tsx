import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Views from './interfaces/Views';
import DatasetList from './Components/DatasetList/DatasetList';
import Map from './Components/views/Map/Map';
import ComponentC from './Components/views/ComponentC/ComponentC';
import ComponentD from './Components/views/ComponentD/ComponentD';
import ComponentE from './Components/views/ComponentE/ComponentE';
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
