import styled from '@emotion/styled';

export const headerHeight = '40pt';
export const CommonFullCont = styled.div`
  display: flex;
  width: 100vw;
  margin-top: ${headerHeight};
  height: calc(100vh - ${headerHeight});
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
