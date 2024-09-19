import { ChangeEvent, useState } from 'react';
import {
  ClosedLayerIcon,
  ClosedLayerToggle,
  ClosePickerButton,
  ContentCont,
  LayersFilterButton,
  MainCont,
  TextInput,
  TopBar,
} from './LayerPicker.style';
import ListItem from './ListItem/ListItem';
import { useSelector } from 'react-redux';

const LayerPicker = () => {
  const layersDict = useSelector((state: any) => state.MapState.layersDict);
  const [open, setOpen] = useState<boolean>(false);
  const [visibleLayersFilter, setVisibleLayersFilter] = useState(false);
  const [filter, setFilter] = useState<string>();

  const handleToggle = () => setOpen((prev) => !prev);
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) =>
    setFilter(evt.target.value);
  const handleVisibleLayerFilter = () =>
    setVisibleLayersFilter((prev) => !prev);

  const filterRules = (test: Record<string, any>): boolean => {
    const title = test.title.toLowerCase();
    const testfilter = filter.toLowerCase();
    if (!visibleLayersFilter && (!filter || title.includes(filter))) {
      return true;
    } else if (
      visibleLayersFilter &&
      test.toggle &&
      (!testfilter || title.includes(filter))
    ) {
      return true;
    }
    return false;
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
            <LayersFilterButton onClick={handleVisibleLayerFilter}>
              {visibleLayersFilter ? 'Show All Layers' : 'Show Visible Layers'}
            </LayersFilterButton>
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
                if (filterRules(layersDict[id])) {
                  return <ListItem key={id} stateKey={id} />;
                }
              })}
            </ul>
          </ContentCont>
        </MainCont>
      )}
    </>
  );
};
export default LayerPicker;

/**
 *
 * Take list
 */
