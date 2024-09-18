import { useSelector } from 'react-redux';
import CopyButton from '../../CopyButton/CopyButton';
import ToggleLayerButton from '../ToggleLayerButton/ToggleLayerButton';
import ToggleVectorWmsButton from '../ToggleVectorWmsButton/ToggleVectorWmsButton';
import { Row, Text } from './ListItem.style';
import CachedButton from '../CachedButton/CachedButton';

type PropTypes = {
  data: Record<string, any>;
  handleSelectItem: (input: any) => void;
  selectLayers: Record<string, any>[];
};
const ListItem = ({ data, handleSelectItem, selectLayers }: PropTypes) => {
  const MOBILE = useSelector((state: any) => state?.AppConfig?.MOBILE);
  return (
    <Row key={data?.Name?.Title?._text ?? Math.random()}>
      <ToggleLayerButton
        clickHandler={handleSelectItem.bind(this, data)}
        toggledOn={selectLayers.some(
          (selectItem) =>
            selectItem?.MetadataURL?._attributes ===
            data?.MetadataURL?._attributes,
        )}
      />
      <ToggleVectorWmsButton
        clickHandler={handleSelectItem.bind(this, data)}
        toggledOn={selectLayers.some(
          (selectItem) =>
            selectItem?.MetadataURL?._attributes ===
            data?.MetadataURL?._attributes,
        )}
      />
      {MOBILE && (
        <CachedButton
          clickHandler={handleSelectItem.bind(this, data)}
          toggledOn={selectLayers.some(
            (selectItem) =>
              selectItem?.MetadataURL?._attributes ===
              data?.MetadataURL?._attributes,
          )}
        />
      )}
      <Text>{data?.Title?._text ?? 'Name not provided'}</Text>
      <CopyButton content={JSON.stringify(data)} />
    </Row>
  );
};

export default ListItem;
