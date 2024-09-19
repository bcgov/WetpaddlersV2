import styled from '@emotion/styled';
import { colors } from '../../constants';

type ModalProps = {
  show: boolean;
};

export const Modal = styled.div<ModalProps>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  border: 1pt solid black;
  left: 50%;
  top: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  height: 235pt;
  border-radius: 10pt;
  width: 400pt;
  max-width: 100%;
  background-color: white;
  overflow: hidden;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 40pt;
  width: 100%;
  align-items: center;
  background-color: ${colors.bcBlue};
  color: white;
  border-bottom: 3pt solid ${colors.bcYellow};
  h3 {
    font-size: 24pt;
    margin: 0 10pt;
  }
`;

export const Button = styled.button`
  height: 30pt;
  width: 95pt;
  border: 1pt solid black;
  border-radius: 6pt;
  background: white;
  font-size: 12pt;
  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
`;

export const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40pt;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  background-color: ${colors.bcBlue};
`;

export const Blocker = styled.div<ModalProps>`
  display: ${({ show }) => (show ? '' : 'none')};
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 30%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
`;

export const Content = styled.div`
  box-sizing: border-box;
  padding: 1rem;
`;

export const TextContent = styled.p`
  font-size: 14pt;
`;
