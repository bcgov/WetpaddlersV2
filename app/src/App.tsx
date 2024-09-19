import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Views from './interfaces/Views';
import DatasetList from './Components/views/DatasetList/DatasetList';
import Map from './Components/views/Map/Map';
import { MapComponentsProvider } from '@mapcomponents/react-maplibre';

const App = () => {
  const [tab, setTab] = useState<Views>(Views.Map);
  const handleViewChange = (view: Views) => setTab(view);
  return (
    <MapComponentsProvider>
      <Header toggleTab={handleViewChange} />
      {tab === Views.Map && <Map />}
      {tab === Views.DatasetList && <DatasetList />}
    </MapComponentsProvider>
  );
};

export default App;
