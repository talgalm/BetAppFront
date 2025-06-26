import { useEffect, useRef, useState } from 'react';
import { ReactComponent as BetimIcon } from '../../../Theme/Icons/LayoutIcons/BetimHeaderIcon.svg';
import { Typography } from '@components/Topography/typography';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { User } from '../../../interfaces/User.interface';

interface BetimCounterProps {
  user: User | undefined | null;
}

export const BetimCounter = ({ user }: BetimCounterProps) => {
  const [animatedBetim, setAnimatedBetim] = useState<number | undefined>(user?.betim);
  const previousBetimRef = useRef<number | undefined>(user?.betim);

  useEffect(() => {
    if (user?.betim !== undefined && previousBetimRef.current !== undefined) {
      if (user.betim < previousBetimRef.current) {
        const diff = previousBetimRef.current - user.betim;
        const duration = 1000;
        const steps = 30;
        const stepTime = duration / steps;
        const decrement = diff / steps;

        let current = previousBetimRef.current;
        let count = 0;

        const interval = setInterval(() => {
          count++;
          current -= decrement;
          setAnimatedBetim(Math.round(current));

          if (count >= steps) {
            clearInterval(interval);
            setAnimatedBetim(user.betim);
          }
        }, stepTime);

        return () => clearInterval(interval);
      } else {
        setAnimatedBetim(user.betim);
      }
    }

    previousBetimRef.current = user?.betim;
  }, [user?.betim]);

  return (
    <>
      <BetimIcon />
      <Typography
        value={animatedBetim}
        variant={TypographyTypes.TextSmall}
        styleProps={{ color: '#2A69C6' }}
      />
    </>
  );
};

export default BetimCounter;
