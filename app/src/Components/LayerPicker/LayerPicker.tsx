import { ChangeEvent, useState } from 'react';
import {
  ClosedLayerIcon,
  ClosedLayerToggle,
  ClosePickerButton,
  ContentCont,
  MainCont,
  TextInput,
  TopBar,
} from './LayerPicker.style';
import ListItem from './ListItem/ListItem';
import { useSelector } from 'react-redux';

const LayerPicker = () => {
  const layersDict = useSelector((state: any) => state.MapState.layersDict);
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>();

  const handleToggle = () => setOpen((prev) => !prev);
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) =>
    setFilter(evt.target.value);
  return (
    <>
      {!open ? (
        <ClosedLayerToggle onClick={handleToggle}>
          <ClosedLayerIcon src={'/stack.svg'} />
        </ClosedLayerToggle>
      ) : (
        <MainCont>
          <TopBar>
            <TextInput
              type="text"
              value={filter ?? ''}
              onChange={handleChange}
              placeholder="Filter..."
            />
            <ClosePickerButton onClick={handleToggle}>
              <ClosedLayerIcon src={'/x-lg.svg'} />
            </ClosePickerButton>
          </TopBar>
          <ContentCont>
            <h2>Layers</h2>
            <ul>
              {Object.keys(layersDict).map((id) => {
                if (!filter || layersDict[id].title.includes(filter))
                  return <ListItem key={id} stateKey={id} />;
              })}
            </ul>
          </ContentCont>
        </MainCont>
      )}
    </>
  );
};
export default LayerPicker;
