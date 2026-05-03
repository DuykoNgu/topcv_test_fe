import { useLocation } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import AuthLayout from '../components/layout/AuthLayout';

export default function LoginPage() {
  const location = useLocation();
  const mode = location.pathname === '/register' ? 'register' : 'login';

  return (
    <AuthLayout>
      <AuthForm defaultMode={mode} />
    </AuthLayout>
  );
}
