import { ListButton, ListButtonIcon } from '../LayerPicker.style';
import layerOn from '/layers-fill.svg';
import layerOff from '/layers.svg';

type PropTypes = {
  clickHandler: (input: any) => void;
  toggledOn: boolean;
};
const ToggleLayerButton = ({ clickHandler, toggledOn }: PropTypes) => {
  return (
    <ListButton title="Toggle viewable layers" onClick={clickHandler}>
      <ListButtonIcon src={toggledOn ? layerOn : layerOff} />
    </ListButton>
  );
};

export default ToggleLayerButton;
