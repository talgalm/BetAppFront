export enum NotificationColors {
  BetBackground = '#EFFDF4',
  BetAccent = '#15AB94',

  SupervisorBackground = '#FEF3C7',
  SupervisorAccent = '#D97706',

  HistoryBackground = '#FAE8FF',
  HistoryAccent = '#C026D3',

  White = '#fff',
}

export const NotificationTypeColors = {
  bet: {
    background: NotificationColors.BetBackground,
    accent: NotificationColors.BetAccent,
  },
  supervisor: {
    background: NotificationColors.SupervisorBackground,
    accent: NotificationColors.SupervisorAccent,
  },
  history: {
    background: NotificationColors.HistoryBackground,
    accent: NotificationColors.HistoryAccent,
  },
  ongoing: {
    background: NotificationColors.White,
  },
};
