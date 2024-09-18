import { useState } from 'react';
import {
  ClosedLayerIcon,
  ClosedLayerToggle,
  ClosePickerButton,
  ContentCont,
  MainCont,
  TopBar,
} from './LayerPicker.style';
import ListItem from './ListItem/ListItem';
import { useSelector } from 'react-redux';

const LayerPicker = () => {
  const layersDict = useSelector((state: any) => state.MapState.layersDict);
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => setOpen((prev) => !prev);

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
              {Object.keys(layersDict).map((id) => (
                <ListItem key={id} stateKey={id} />
              ))}
            </ul>
          </ContentCont>
        </MainCont>
      )}
    </>
  );
};
export default LayerPicker;
