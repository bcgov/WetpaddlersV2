import './App.css';
import Header from './Components/Header/Header';
import Map from './Components/views/Map/Map';
import { MapComponentsProvider } from '@mapcomponents/react-maplibre';

const App = () => {
  return (
    <MapComponentsProvider>
      <Header />
      <Map />
    </MapComponentsProvider>
  );
};

export default App;
