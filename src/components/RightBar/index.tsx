import { FC, useState } from 'react';
import { Button, styled } from '@mui/material';

import { Roadmap } from './Roadmap';

import arrowLeft from '../../assets/img/arrow-left.png';

export const RightBar: FC = () => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((show) => !show);
  };

  return (
    <RightBarWrapper>
      <RotatedText>ROADMAP</RotatedText>
      <StyledButton onClick={toggleShow}>
        <img src={arrowLeft} alt="roadmap" />
      </StyledButton>
      <RotatedText>INKLABS</RotatedText>
      <Roadmap show={show} setShow={toggleShow} />
    </RightBarWrapper>
  );
};

const RightBarWrapper = styled('div')`
  position: absolute;
  right: 0px;
  margin-right: 25px;
  top: 0px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  align-items: flex-end;
  @media screen and (max-width: 660px) {
    margin-right: 8px;
  }
`;

const RotatedText = styled('span')`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  @media screen and (max-width: 660px) {
    font-size: 11px;
  }
`;

const StyledButton = styled(Button)`
  border: none;
  background: transparent;
  cursor: pointer;
  @media screen and (max-width: 660px) {
    img {
      width: 60px;
    }
  }
`;