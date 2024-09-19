import { useState } from 'react';
import { Button, Img } from './CopyButton.style';
import copy from '/copy.svg';
import copySuccess from '/check-circle.svg';

type PropTypes = {
  content: number | string;
  disabled: boolean;
};
const CopyButton = ({ content, disabled }: PropTypes) => {
  const [success, setSuccess] = useState<boolean>(false);
  const handleClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content.toString());
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    }
  };
  return (
    <Button disabled={disabled} onClick={handleClick}>
      <Img src={success ? copySuccess : copy} />
    </Button>
  );
};

export default CopyButton;
