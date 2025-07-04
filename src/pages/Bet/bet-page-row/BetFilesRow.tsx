import React from 'react';
import { TypographyTypes } from '@components/Topography/TypographyTypes';
import { Typography } from '@components/Topography/typography';
import { SummaryRow } from '../../new-bet/new-bet-components/summary-new-bet/Summary.styles';
import { PRIMARY_BLACK } from '@theme/colorTheme';

interface FilesRowProps {
  id: string;
  fileName: string;
  fileType: string;
  url: string;
  uploadedAt: Date;
}

const BetFilesRow: React.FC<FilesRowProps> = ({ fileName, fileType, url }) => {
  const handleClick = () => {
    const isDownloadable =
      !fileType.startsWith('video/') &&
      !fileType.startsWith('audio/') &&
      fileType !== 'application/pdf' &&
      !fileType.startsWith('image/');

    if (isDownloadable) {
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <SummaryRow background="#CED0EF" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Typography
        value={fileName}
        variant={TypographyTypes.TextSmall}
        styleProps={{ color: PRIMARY_BLACK }}
      />
    </SummaryRow>
  );
};

export default BetFilesRow;
