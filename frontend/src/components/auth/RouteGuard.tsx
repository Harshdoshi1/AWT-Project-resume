import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type RouteGuardProps = {
  children: JSX.Element;
  redirectPath: string;
  condition: boolean;
};

export const RouteGuard = ({ children, redirectPath, condition }: RouteGuardProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (condition) {
      navigate(redirectPath);
    }
  }, [condition, navigate, redirectPath]);

  return !condition ? children : null;
};
