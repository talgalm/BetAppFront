import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withNoAuth = (WrappedComponent: React.ComponentType): React.FC => {
  const NoAuthComponent: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem('token')) {
        navigate('/');
      }
    }, [navigate]);

    return <WrappedComponent />;
  };

  NoAuthComponent.displayName = `withNoAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return NoAuthComponent;
};

export default withNoAuth;
