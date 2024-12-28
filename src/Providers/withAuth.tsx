import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent: React.ComponentType): React.FC => {
  return () => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
    }, [navigate]);

    return <WrappedComponent />;
  };
};

export default withAuth;