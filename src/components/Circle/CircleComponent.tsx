import { ReactComponent as MoreDots } from '../../Theme/Icons/more.svg';
import { MoreCircle, RegularCircle } from './CircleComponents.styles';

interface CircleComponentProps {
  index: number;
  participantsNumber: number;
}

const Circle = ({ index, participantsNumber }: CircleComponentProps): JSX.Element => {
  return index === 0 && participantsNumber > 3 ? (
    <MoreCircle
      style={{
        zIndex: participantsNumber + index,
        marginLeft: -10,
      }}
    >
      <MoreDots width={24} height={24} />
    </MoreCircle>
  ) : (
    <RegularCircle
      style={{
        zIndex: participantsNumber + index,
        marginLeft: -10,
      }}
    />
  );
};

export default Circle;
