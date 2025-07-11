// utils/useFieldDefinitions.ts
import { useTranslation } from 'react-i18next';
import { ReactComponent as BetimIcon } from '@assets/icons/Betim.svg';
import { formatDate } from '@utils/Helpers';
import { useAtom } from 'jotai';
import { BetFile, Bet } from '@interfaces/Bet.interface';
import { Prediction } from '@interfaces/Prediction.interface';
import { User } from '@interfaces/User.interface';
import { finishBetAtom } from '@store/betAtoms';
import { LIGHT_GREEN, TAG_PURPLE } from '@theme/colorTheme';

interface FieldRowProps {
  label: string;
  value?: string | number | null;
  background?: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  arrValue?: Prediction[] | User;
  files?: BetFile[];
  disclaimer?: string;
}

export const useFieldDefinitions = (bet?: Bet): FieldRowProps[] => {
  const { t } = useTranslation();
  const [finishBet] = useAtom(finishBetAtom);

  const candidates = () => {
    if (!bet?.predictions) return [];
    const hasCandidates = bet.predictions.some((pred) => pred.candidate);
    return hasCandidates ? bet.predictions.filter((pred) => pred.candidate) : bet.predictions;
  };

  const fields: FieldRowProps[] = [
    {
      label: finishBet ? t('BetPage.whoWon') : t('BetPage.participents'),
      value: '',
      arrValue: finishBet ? candidates() : bet?.predictions,
    },
    { label: t('BetPage.description'), value: bet?.description },
    {
      label: t('BetPage.betim'),
      value: bet?.betim,
      background: `${LIGHT_GREEN}`,
      icon: BetimIcon,
      disclaimer: 'betim',
    },
    {
      label: t('BetPage.deadline'),
      value: formatDate(bet?.deadline) || null,
      background: TAG_PURPLE,
      disclaimer: 'deadline',
    },
    {
      label: t('BetPage.files'),
      value: '',
      files: bet?.files,
    },
    {
      label: t('BetPage.supervisor'),
      value: '',
      arrValue: bet?.supervisor,
      disclaimer: 'supervisor',
    },
  ];

  return fields;
};
