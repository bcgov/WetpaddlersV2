import { useContext, useState } from 'react';
import AppContext from '../../providers/context';

import {
  CheckBox,
  ClosedLayerIcon,
  ClosedLayerToggle,
  ClosePickerButton,
  ContentCont,
  ListItem,
  MainCont,
  TopBar,
} from './LayerPicker.style';

const LayerPicker = () => {
  const {
    dataSetList: { capabilities },
    layerPicker: { selectLayers, setSelectLayers },
  } = useContext(AppContext);
  if (!capabilities) throw Error('No Context provided');
  const [open, setOpen] = useState<boolean>(false);

  // Hook up to Context

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleSelectItem = (item: Record<string, any>) => {
    const deleting = selectLayers.some(
      (selectItem: Record<string, any>) =>
        selectItem?.MetadataURL?._attributes === item?.MetadataURL?._attributes,
    );
    if (deleting) {
      setSelectLayers((prev: Record<string, any>[]) =>
        prev.filter(
          (selectItem) =>
            selectItem?.MetadataURL?._attributes !==
            item.MetadataURL?._attributes,
        ),
      );
    } else {
      setSelectLayers((prev: Record<string, any>[]) => [item, ...prev]);
    }
  };

  return (
    <>
      {!open ? (
        <ClosedLayerToggle onClick={handleToggle}>
          <ClosedLayerIcon src={'/stack.svg'} />
        </ClosedLayerToggle>
      ) : (
        <MainCont>
          <TopBar>
            <ClosePickerButton onClick={handleToggle}>
              <ClosedLayerIcon src={'/x-lg.svg'} />
            </ClosePickerButton>
          </TopBar>
          <ContentCont>
            <h2>Layers</h2>
            <ul>
              {capabilities.map((item) => (
                <ListItem key={item?.Name?.Title?._text ?? Math.random()}>
                  <CheckBox
                    type="checkbox"
                    onChange={handleSelectItem.bind(this, item)}
                    checked={selectLayers.some(
                      (selectItem) =>
                        selectItem?.MetadataURL?._attributes ===
                        item?.MetadataURL?._attributes,
                    )}
                  ></CheckBox>
                  {item?.Title?._text ?? 'Name not provided'}
                </ListItem>
              ))}
            </ul>
          </ContentCont>
        </MainCont>
      )}
    </>
  );
};
export default LayerPicker;
