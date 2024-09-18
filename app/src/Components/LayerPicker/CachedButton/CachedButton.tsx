import { ListButton, ListButtonIcon } from '../LayerPicker.style';
import cached from '/floppy-fill.svg';
import notCached from '/floppy.svg';

type PropTypes = {
  clickHandler: (input: any) => void;
  toggledOn: boolean;
};
const CachedButton = ({ clickHandler, toggledOn }: PropTypes) => {
  return (
    <ListButton title="Cache to Device" onClick={clickHandler}>
      <ListButtonIcon src={toggledOn ? cached : notCached} />
    </ListButton>
  );
};

export default CachedButton;
