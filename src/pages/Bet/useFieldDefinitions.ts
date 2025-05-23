// utils/useFieldDefinitions.ts
import { useTranslation } from 'react-i18next';
import { ReactComponent as FileIcon } from '../../Theme/Icons/FilesIcon.svg';
import { ReactComponent as BetimIcon } from '../../Theme/Icons/Betim.svg';
import { Bet, Prediction, User } from '../../Interfaces';
import { formatDate } from '../../utils/Helpers';
import { finishBetAtom } from '../../Jotai/atoms';
import { useAtom } from 'jotai';

interface FieldRowProps {
  label: string;
  value?: string | number | null;
  background?: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  arrValue?: Prediction[] | User;
  disclaimer?: string;
}

export const useFieldDefinitions = (bet?: Bet): FieldRowProps[] => {
  const { t } = useTranslation();
  const [finishBet] = useAtom(finishBetAtom);

  return [
    {
      label: finishBet ? t('BetPage.whoWon') : t('BetPage.participents'),
      value: '',
      arrValue: bet?.predictions,
    },
    { label: t('BetPage.description'), value: bet?.description },
    // {
    //   label: t('BetPage.predictions'),
    //   value: t('BetPage.personalPredictions'),
    //   background: '#CED0EF',
    //   icon: FileIcon,
    // },
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
    // { label: t('BetPage.files'), value: bet?.description, background: '#CED0EF', icon: FileIcon },
    {
      label: t('BetPage.supervisor'),
      value: '',
      arrValue: bet?.supervisor,
      disclaimer: 'supervisor',
    },
  ];
};
