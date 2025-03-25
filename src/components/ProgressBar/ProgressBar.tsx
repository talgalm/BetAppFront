import React, { useState, useEffect } from 'react';
import {
  ProgressBarContent,
  MovingIcon,
  ProgressBarContainer,
  ProgressIcon,
} from './ProgressBar.styles';
import { ReactComponent as HandRight } from '../../Theme/Icons/HandRight.svg';
import { ReactComponent as HandLeft } from '../../Theme/Icons/HandLeft.svg';
import { ReactComponent as Handshake } from '../../Theme/Icons/Handshake.svg';

interface ProgressBarProps {
  targetProgress: number;
}

const useProgress = (targetProgress: number) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress !== targetProgress) {
      const stepChange = () => {
        setProgress((prev) => {
          if (prev < targetProgress) {
            return Math.min(prev + 1, targetProgress);
          } else {
            return Math.max(prev - 1, targetProgress);
          }
        });
      };

      const interval = setInterval(stepChange, 30);

      return () => clearInterval(interval);
    }
  }, [targetProgress, progress]);

  return progress;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ targetProgress }) => {
  const progress = useProgress(targetProgress);

  const renderIcons = () => {
    if (progress === 100) {
      return (
        <>
          <ProgressIcon position="left">
            <Handshake width={32} height={32} />
          </ProgressIcon>
        </>
      );
    } else {
      return (
        <>
          <ProgressIcon position="left">
            <HandLeft width={24} height={24} />
          </ProgressIcon>
          <MovingIcon progress={progress}>
            <HandRight width={24} height={24} />
          </MovingIcon>
        </>
      );
    }
  };

  return (
    <ProgressBarContainer>
      {renderIcons()}
      <ProgressBarContent variant="determinate" value={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
