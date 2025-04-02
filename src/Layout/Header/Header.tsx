import { useEffect } from 'react';
import {
  BackArrowDiv,
  ButtonsDiv,
  HeaderComponent,
  LogoDiv,
  PointsContainer,
  TotalPointsDiv,
} from './Header.styles';
import { ReactComponent as AddPeople } from '../../Theme/Icons/AddPeopleIcon.svg';
import { ReactComponent as Notification } from '../../Theme/Icons/Notification.svg';
import { ReactComponent as LogoBright } from '../../Theme/Icons/LogoWhite.svg';
import { ReactComponent as CloseIcon } from '../../Theme/Icons/Close.svg';
import { Typography } from '../../components/Topography/topography';
import { TypographyTypes } from '../../Theme/Typography/typography';
import Button from '../../components/Button - deprected/Button';
import { PRIMARY_BUTTON_COLOR, TEXT_SEC_COLOR } from '../../Theme/ColorTheme';
import { ReactComponent as AddIcon } from '../../Theme/Icons/AddIcon.svg';
import { ReactComponent as Logo } from '../../Theme/Icons/Logo.svg';

import { layoutAtom, userAtom } from '../../Jotai/atoms';
import { useAtom } from 'jotai';
import { FooterStyle, HeaderStyle } from '../../Theme/ThemeInterfaces';
import { useNavigate } from 'react-router-dom';
import { useIsPrimaryExpand } from '../../utils/Helpers';
import { useTranslation } from 'react-i18next';
import { UseUser } from '../../Hooks/useGetUser';

const Header = () => {
  const isPrimary = useIsPrimaryExpand();

  const [layout, setLayout] = useAtom(layoutAtom);
  const [user, setUser] = useAtom(userAtom);
  const { data } = UseUser(user?.id);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleAddIconClick = () => {
    setLayout({
      headerStyle: HeaderStyle.SECONDARY_SHORT,
      footerStyle: FooterStyle.HIDE,
    });
    navigate('/create-bet');
  };
  const handleBackIconClick = () => {
    setLayout({
      headerStyle: HeaderStyle.PRIMARY_EXPAND,
      footerStyle: FooterStyle.SHOW,
    });
    navigate('/');
  };

  return (
    <HeaderComponent headerStyle={layout.headerStyle}>
      <BackArrowDiv>
        {!isPrimary && <CloseIcon onClick={handleBackIconClick} width={24} height={24} />}
      </BackArrowDiv>
      <LogoDiv>{isPrimary && <LogoBright />}</LogoDiv>
      <LogoDiv>{!isPrimary && <Logo />}</LogoDiv>

      <TotalPointsDiv>
        {isPrimary && (
          <PointsContainer>
            <Typography value={user?.points || 0} variant={TypographyTypes.H1} />
            <Typography
              value={t('Header.Points')}
              variant={TypographyTypes.H6}
              styleProps={{
                color: TEXT_SEC_COLOR,
              }}
            />
          </PointsContainer>
        )}
      </TotalPointsDiv>
      {isPrimary && (
        <ButtonsDiv>
          <Button bgColor={PRIMARY_BUTTON_COLOR} icon={<Notification />} />
          <Button bgColor={PRIMARY_BUTTON_COLOR} icon={<AddPeople />} />
          <Button bgColor={PRIMARY_BUTTON_COLOR} icon={<AddIcon />} onClick={handleAddIconClick} />
        </ButtonsDiv>
      )}
    </HeaderComponent>
  );
};

export default Header;
