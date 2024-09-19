import styled from '@emotion/styled';
import { headerHeight } from '../../assets/common-styles/common.styles';
import { colors } from '../../constants';

export const StyledHeader = styled.header`
  color: #fff;
  width: 100%;
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: ${colors.bcBlue};
  display: flex;
  align-items: center;
  height: ${headerHeight};
  padding-left: 1em;
  border-bottom: 1pt solid ${colors.bcYellow};
  h1 {
    font-size: min(2em, 3.5vw);
    margin: 0;
  }
  button:last-child {
    margin-left: auto;
    margin-right: 2em;
  }
`;

export const StyledImage = styled.img`
  max-height: 25pt;
  height: auto;
  padding: 3pt;
`;

export const StyledUl = styled.ul`
  list-style-type: none;
  display: flex;
`;
export const StyledLi = styled.li`
  margin-left: min(18pt, 4vw);
  font-size: 18pt;
  &:hover {
    cursor: pointer;
    color: orange;
  }
`;
