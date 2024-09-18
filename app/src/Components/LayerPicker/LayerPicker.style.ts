import styled from '@emotion/styled';

const absPosition = {
  x: '25pt',
  y: '50pt',
  z: '1',
};

export const ClosedLayerToggle = styled.button`
  position: absolute;
  z-index: ${absPosition.z};
  right: ${absPosition.x};
  top: ${absPosition.y};
  padding: 0;
  margin: 0;
  background-color: white;
  height: 50pt;
  width: 50pt;
  &:hover {
    cursor: pointer;
    background-color: #eee;
    border: 1pt solid black;
  }
`;

export const ClosedLayerIcon = styled.img`
  height: 90%;
  width: 90%;
`;

export const MainCont = styled.div`
  z-index: ${absPosition.z};
  right: ${absPosition.x};
  top: ${absPosition.y};
  position: absolute;
  border-radius: 8pt;
  overflow: hidden;
  box-sizing: border-box;
  height: 300pt;
  width: 300pt;
  background-color: white;
`;

export const ContentCont = styled.div`
  height: 80%;
  overflow-y: auto;
  color: black;
  & > h2 {
    text-align: left;
    margin-bottom: 5pt;
    padding-left: 1rem;
  }
  & > ul {
    list-style-type: none;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;
export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 40pt;
  background-color: #fed;
`;

export const ClosePickerButton = styled.button`
  height: 25pt;
  width: 25pt;
  padding: 10pt;
  margin: 15pt;
  padding: 0;
  background-color: transparent;
  border: none;
`;

export const ListItem = styled.li`
  width: 100%;
  display: flex;
  text-wrap: wrap;
  padding: 3pt;
  font-size: 12pt;
  text-align: left;
  justify-content: flex-start;
  &:nth-of-type(odd) {
    background-color: #ddd;
  }
`;

export const CheckBox = styled.input`
  min-height: 20pt;
  min-width: 20pt;
  margin-right: 1rem;
`;
