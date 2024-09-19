import { useDispatch, useSelector } from 'react-redux';
import CopyButton from '../../CopyButton/CopyButton';
import ToggleLayerButton from '../ToggleLayerButton/ToggleLayerButton';
import ToggleVectorWmsButton from '../ToggleVectorWmsButton/ToggleVectorWmsButton';
import { Row, Text } from './ListItem.style';
import CachedButton from '../CachedButton/CachedButton';
import {
  DELETE_CACHE_OFFLINE_MAP,
  REQUEST_CACHE_LAYER,
  REQUEST_CACHE_OFFLINE_MAP,
  TOGGLE_LAYER,
  TOGGLE_LAYER_MODE,
} from '../../../state/actions';

type PropTypes = {
  stateKey: string;
};
const ListItem = ({ stateKey }: PropTypes) => {
  const MOBILE = useSelector((state: any) => state?.AppConfig?.MOBILE);
  const entry = useSelector(
    (state: any) => state?.MapState.layersDict[stateKey],
  );
  const dispatch = useDispatch();

  // Set Visibility of layer
  const toggleLayerVis = () =>
    dispatch({ type: TOGGLE_LAYER, payload: { layerID: stateKey } });
  // Set Mode from Vector to WMS Layer
  const toggleLayerMode = () =>
    dispatch({ type: TOGGLE_LAYER_MODE, payload: { layerID: stateKey } });
  // Cache data to device
  const handleCache = () => {
    dispatch({ type: REQUEST_CACHE_LAYER, payload: { layerID: stateKey } });
  };
  // Delete Cache from Device
  const handleCacheDelete = () => {
    if (confirm('Are you sure you want to delete this?')) {
      dispatch({
        type: DELETE_CACHE_OFFLINE_MAP,
        payload: { layerID: stateKey },
      });
    }
  };
    
  const cacheOfflineMap = () => {
    dispatch({ type: REQUEST_CACHE_OFFLINE_MAP, payload: {} });
  };
  return (
    <Row key={entry.title}>
      <ToggleLayerButton clickHandler={toggleLayerVis} toggledOn={entry.toggle} />
      <ToggleVectorWmsButton
        clickHandler={toggleLayerMode}
        toggledOn={entry.vectorToggle}
      />
      {MOBILE && (
        <CachedButton
          clickHandler={entry.cached ? handleCacheDelete : handleCache}
          toggledOn={entry.cached}
        />
      )}
      {/* <b onClick={cacheOfflineMap}>
        [[PMT]]
      </b>       */}
      <Text>{entry?.title}</Text>
      <CopyButton content={entry.metadataLink} />
    </Row>
  );
};

export default ListItem;
