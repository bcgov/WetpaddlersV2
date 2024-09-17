import { useContext } from 'react';
import { CommonFullCont } from '../../assets/common-styles/common.styles';
import AppContext from '../../providers/context';

const ComponentD = () => {
  const context = useContext(AppContext);

  return (
    <CommonFullCont>
      {context?.contextExample ?? 'Context not provided'}
    </CommonFullCont>
  );
};
export default ComponentD;
