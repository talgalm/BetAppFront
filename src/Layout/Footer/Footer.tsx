import { ButtonDiv, FooterComponent } from './Footer.styles';
import { ReactComponent as ProfileIcon } from '../../Theme/Icons/ProfileFooterIcon.svg';
import { ReactComponent as HomeIcon } from '../../Theme/Icons/HomeFooterIcon.svg';
import { useAtom } from 'jotai';
import { layoutAtom } from '../../Jotai/atoms';
import { useEffect, useRef } from 'react';

export const Footer = () => {
  const [layout] = useAtom(layoutAtom);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleVisualViewport = () => {
      if (typeof window !== 'undefined' && window.visualViewport) {
        const viewport = window.visualViewport;

        const resizeListener = () => {
          const keyboardHeight = window.innerHeight - viewport.height;

          if (footerRef.current) {
            if (keyboardHeight > 150) {
              footerRef.current.style.bottom = `${keyboardHeight}px`;
            } else {
              footerRef.current.style.bottom = '0';
            }
          }
        };

        viewport.addEventListener('resize', resizeListener);
        return () => viewport.removeEventListener('resize', resizeListener);
      }
    };

    return handleVisualViewport();
  }, []);

  return (
    <FooterComponent ref={footerRef} footerStyle={layout.footerStyle}>
      <ButtonDiv>
        <ProfileIcon width="24" height="24" />
        <HomeIcon width="24" height="24" />
      </ButtonDiv>
    </FooterComponent>
  );
};
