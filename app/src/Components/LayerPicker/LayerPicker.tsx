import { useContext, useState } from 'react';
import AppContext from '../../providers/context';
import LayerItem from '../../interfaces/LayerItem';
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

// TODO: Hook to Context, refactor to API Data, Remove this
const temp: LayerItem[] = [
  { title: 'TempA', url: 'https://www2.gov.bc.ca/gov/content/home' },
  { title: 'TempB', url: 'https://www2.gov.bc.ca/gov/content/careers-myhr' },
  {
    title: 'TempC',
    url: 'https://www2.gov.bc.ca/gov/content/home/forms-a-z',
  },
  {
    title: 'TempD',
    url: 'https://www2.gov.bc.ca/gov/content/home/get-help-with-government-services',
  },
  { title: 'TempE', url: 'https://news.gov.bc.ca/' },
];

const LayerPicker = () => {
  const context = useContext(AppContext);
  if (!context) throw Error('No Context provided');
  const [open, setOpen] = useState<boolean>(false);

  // Hook up to Context
  const [fetchedLayers] = useState<LayerItem[]>(temp);
  const [selectLayers, setSelectLayers] = useState<LayerItem[]>([]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleSelectItem = (item: LayerItem) => {
    const deleting = selectLayers.some(
      (selectItem: Record<string, any>) => selectItem.url === item.url,
    );
    if (deleting) {
      setSelectLayers((prev) =>
        prev.filter((selectItem) => selectItem.url !== item.url),
      );
    } else {
      setSelectLayers((prev) => [item, ...prev]);
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
              {fetchedLayers.map((item) => (
                <ListItem key={item.url}>
                  <CheckBox
                    type="checkbox"
                    onChange={handleSelectItem.bind(this, item)}
                    checked={selectLayers.some(
                      (selectItem) => selectItem.url === item.url,
                    )}
                  ></CheckBox>
                  {item.title}
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
