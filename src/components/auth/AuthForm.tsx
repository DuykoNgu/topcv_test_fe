import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import InputField from '../ui/InputField';
import { useNavigate } from 'react-router-dom';
import { extractErrorMessage } from '../../utils/error';

interface AuthFormProps {
  defaultMode?: 'login' | 'register';
}

export default function AuthForm({ defaultMode = 'login' }: AuthFormProps) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(defaultMode === 'login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const response = await login(formData.email, formData.password);
        toast.success('Đăng nhập thành công!');
        console.log('Login response:', response); // Debug log
        // Redirect based on role
        const userRole = response.user?.role;
        console.log('User role:', userRole); // Debug log
        navigate(userRole === 'ADMIN' ? '/admin' : '/');
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Mật khẩu xác nhận không khớp');
          setLoading(false);
          return;
        }
        const response = await register(formData.username, formData.email, formData.password, formData.confirmPassword);
        toast.success('Đăng ký thành công!');
        console.log('Register response:', response); // Debug log
        // Redirect based on role after registration too
        const userRole = response.user?.role;
        console.log('User role:', userRole); // Debug log
        navigate(userRole === 'ADMIN' ? '/admin' : '/login');
      }
    } catch (err) {
      const message = extractErrorMessage(err, 'Đã xảy ra lỗi');
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Auth Toggle Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            isLogin 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Đăng nhập
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            !isLogin 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Đăng ký
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 mb-4 bg-red-50 text-red-700 rounded-md border border-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <InputField
            label="Họ tên:"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}

        <InputField
          label="Email:"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <InputField
          label="Mật khẩu:"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {!isLogin && (
          <InputField
            label="Xác nhận mật khẩu:"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 px-4 mt-2 font-medium text-white rounded-md transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed opacity-70' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
        </button>
      </form>
    </div>
  );
}
