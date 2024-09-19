import styled from '@emotion/styled';

type Props = {
  disabled: boolean;
};
export const Button = styled.button<Props>`
  min-height: 40px;
  min-width: 40px;
  ${({ disabled }) => {
    if (disabled)
      return `
    display: none;
    &:hover {
      cursor: not-allowed;
    }

  `;
  }}
  }
`;

export const Img = styled.img`
  width: 80%;
  height: 80%;
`;
