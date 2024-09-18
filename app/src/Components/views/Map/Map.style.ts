import styled from '@emotion/styled';
import { headerHeight } from '../../../assets/common-styles/common.styles';

export const MapContent = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  .maplibregl-ctrl-top-left {
    margin-top: ${headerHeight};
  }
`;
