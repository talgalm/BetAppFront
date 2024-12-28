import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withNoAuth = (WrappedComponent: React.ComponentType): React.FC => {
  return () => {
    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem("token")) {
        navigate("/");
      }
    }, [navigate]);

    return <WrappedComponent />;
  };
};

export default withNoAuth;
