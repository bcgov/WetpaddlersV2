import { useState } from 'react';
import { Button, Img } from './CopyButton.style';
import copy from '/copy.svg';
import copySuccess from '/check-circle.svg';

type PropTypes = {
  content: number | string;
};
const CopyButton = ({ content }: PropTypes) => {
  const [success, setSuccess] = useState<boolean>(false);
  const handleClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content.toString());
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    }
  };
  return (
    <Button onClick={handleClick}>
      <Img src={success ? copySuccess : copy} />
    </Button>
  );
};

export default CopyButton;
