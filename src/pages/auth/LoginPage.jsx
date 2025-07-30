import { useState } from 'react';
import { Link } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import { login } from '../../utils/api/auth';

import FormAuthInput from '../../components/Form/FormAuthInput';
import FormSubmitButton from '../../components/Form/FormSubmitButton';

import LoadingModal from '../../components/LoadingModal';

function LoginPage({ loginSuccess }) {
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const [isUsernameFilled, setIsUsernameFilled] = useState(true);
  const [isPasswordFilled, setIsPasswordFilled] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    setIsUsernameFilled(!!username);
    setIsPasswordFilled(!!password);
    return username && password;
  }

  async function onLoginHandler(event) {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { error, data } = await login({ username, password });

      await new Promise((resolve) => setTimeout(resolve, 1300));
      if (!error) {
        loginSuccess(data);
      }
    } catch (error) {
      console.log(error);
      alert('Terjadi kesalahan pada server');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen flex-col pb-20">
      <div className="m-auto mt-20 w-full max-w-md">
        <form onSubmit={onLoginHandler} className="mb-4 px-8 pt-6 pb-8">
          <p className="mb-6 text-center text-2xl font-medium text-[#444444]">Login</p>

          <FormAuthInput
            id="username"
            type="text"
            value={username}
            onChange={onUsernameChange}
            placeholder="Username"
            isFilled={isUsernameFilled}
            warnMessage="Silakan pilih username"
          />

          <FormAuthInput
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
            isFilled={isPasswordFilled}
            warnMessage="Silakan pilih password"
          />

          <FormSubmitButton label="Login" />
        </form>

        <p className="text-center text-[#444444]">
          Belum punya akun?{' '}
          <Link to="/register" className="cursor-pointer font-medium text-red-800">
            Daftar aja dulu
          </Link>
        </p>
      </div>

      <LoadingModal isLoading={isLoading} />
    </section>
  );
}

export default LoginPage;
