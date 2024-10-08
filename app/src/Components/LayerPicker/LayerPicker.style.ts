import styled from '@emotion/styled';
import { colors } from '../../constants';

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
  border: none;
  border-radius: 4pt;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 34pt;
  width: 34pt;
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
  overflow: hidden;
  border-radius: 8pt;
  box-sizing: border-box;
  height: calc(95vh - 60pt);
  width: 625pt;
  max-width: 95%;
  background-color: white;
`;

export const ContentCont = styled.div`
  height: calc(100% - 40pt);
  overflow-y: auto;
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
  background-color: ${colors.bcBlue};
  border-bottom: 2pt solid ${colors.bcYellow};
`;

export const LayersFilterButton = styled.button`
  height: 25pt;
  width: 125pt;
  border: 1pt solid black;
  border-radius: 4pt;
  margin-right: 1rem;
  background-color: white;
  cursor: pointer;
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

export const ListButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30pt;
  width: 30pt;
`;

export const ListButtonIcon = styled.img`
  height: 80%;
  width: 80%;
`;

export const TextInput = styled.input`
  height: 25pt;
  font-size: 14pt;
  width: 250pt;
  border: 1pt solid black;
  border-radius: 4pt;
  padding-left: 1rem;

  &:focus {
    outline: none;
    border: 1pt solid black;
  }
  &:hover {
    cursor: pointer;
  }
`;
