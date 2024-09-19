import { useDispatch, useSelector } from 'react-redux';
import {
  Blocker,
  Button,
  Content,
  Footer,
  Header,
  Modal,
  TextContent,
} from './WarningModal.style';
import { TOGGLE_WARNING_MESSAGE } from '../../state/actions';

const WarningModal = () => {
  const show = useSelector((state: any) => state.MapState.showWarning);
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch({ type: TOGGLE_WARNING_MESSAGE });
  };
  return (
    <>
      <Blocker show={show} />
      <Modal show={show}>
        <Header>
          <h3>Action Required</h3>
        </Header>
        <Content>
          <TextContent>
            To create a vector layer, first draw a shape on the map. This shape
            is the starting point for your vector layer, helping you mark
            specific areas or features.
          </TextContent>
        </Content>
        <Footer>
          <Button onClick={handleModalClose}>I Understand</Button>
        </Footer>
      </Modal>
    </>
  );
};

export default WarningModal;
