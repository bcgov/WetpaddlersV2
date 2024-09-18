import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Views from './interfaces/Views';
import DatasetList from './Components/views/DatasetList/DatasetList';
import Map from './Components/views/Map/Map';
import AppContext from './providers/context';
import { MapComponentsProvider } from '@mapcomponents/react-maplibre';

const App = () => {
  const [tab, setTab] = useState<Views>(Views.Map);
  const [contextExample, setContextExample] = useState<string>();
  const [capabilities, setCapabilities] = useState([]);
  const [selectLayers, setSelectLayers] = useState<Record<string, any>[]>([]);
  const handleViewChange = (view: Views) => setTab(view);
  return (
    <MapComponentsProvider>
      <AppContext.Provider
        value={{
          contextExample,
          setContextExample,
          dataSetList: { capabilities, setCapabilities },
          layerPicker: { selectLayers, setSelectLayers },
        }}
      >
        <Header toggleTab={handleViewChange} />
        {tab === Views.Map && <Map />}
        {tab === Views.DatasetList && <DatasetList />}
      </AppContext.Provider>
    </MapComponentsProvider>
  );
};

export default App;
