// utils/useFieldDefinitions.ts
import { useTranslation } from 'react-i18next';
import { ReactComponent as FileIcon } from '../../Theme/Icons/FilesIcon.svg';
import { ReactComponent as BetimIcon } from '../../Theme/Icons/Betim.svg';
import { Bet, BetFile, Prediction, User } from '../../Interfaces';
import { formatDate } from '../../utils/Helpers';
import { finishBetAtom } from '../../Jotai/atoms';
import { useAtom } from 'jotai';

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
      background: '#CEEFEA',
      icon: BetimIcon,
      disclaimer: 'betim',
    },
    {
      label: t('BetPage.deadline'),
      value: formatDate(bet?.deadline) || null,
      background: '#CED0EF',
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
