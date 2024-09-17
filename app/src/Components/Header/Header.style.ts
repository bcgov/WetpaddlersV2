import styled from "@emotion/styled";

export const StyledHeader = styled.header`
  width: 100%;
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #333;
  display: flex;
  align-items: center;
  height: 40pt;
  padding-left: 1em;
  border-bottom: 1pt solid black;
  h1 {
    font-size: 20pt;
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
  margin-left: 1rem;
  font-size: 18pt;
  &:hover {
    cursor: pointer;
    color: orange;
  }
`;
