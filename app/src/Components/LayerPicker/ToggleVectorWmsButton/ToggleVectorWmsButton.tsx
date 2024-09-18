import { ListButton } from '../LayerPicker.style';

type PropTypes = {
  clickHandler: (input: any) => void;
  toggledOn: boolean;
};
const ToggleVectorWmsButton = ({ clickHandler, toggledOn }: PropTypes) => {
  return (
    <ListButton title="Toggle WMS / Vector Layers" onClick={clickHandler}>
      {toggledOn ? ' VEC' : 'WMS'}
    </ListButton>
  );
};

export default ToggleVectorWmsButton;
