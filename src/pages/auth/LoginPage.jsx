import { useState } from 'react';
import useInput from '../../hooks/useInput';
import { login } from '../../utils/api/auth';
import { Link } from 'react-router-dom';

function LoginPage({ loginSuccess }) {
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const [isUsernameFilled, setIsUsernameFilled] = useState(true);
  const [isPasswordFilled, setIsPasswordFilled] = useState(true);

  function validateForm() {
    setIsUsernameFilled(!!username);
    setIsPasswordFilled(!!password);
    return username && password;
  }

  async function onLoginHandler(event) {
    event.preventDefault();
    if (!validateForm()) return;

    // setIsLoading(true);
    try {
      const { error, data } = await login({ username, password });
      if (!error) {
        loginSuccess(data);
      }
    } catch (error) {
      console.log(error);
      alert('Terjadi kesalahan pada server');
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    <section className="flex h-screen">
      <div className="m-auto mt-20 w-full max-w-md">
        <form onSubmit={onLoginHandler} className="mb-4 px-8 pt-6 pb-8">
          <p className="mb-6 text-center text-2xl font-medium text-[#444444]">Login</p>

          <div className="mb-4">
            <input
              id="username"
              type="text"
              value={username}
              onChange={onUsernameChange}
              className="block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-gray-900 focus:outline-gray-300"
              placeholder="Username"
            />
            {isUsernameFilled ? (
              <div className="mb-8" />
            ) : (
              <p className="text-xs text-red-500 italic">Please choose a username</p>
            )}
          </div>

          <div className="mb-4">
            <input
              id="password"
              type="password"
              value={password}
              onChange={onPasswordChange}
              className="block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-gray-900 focus:outline-gray-300"
              placeholder="Password"
            />
            {isPasswordFilled ? (
              <div className="mb-8" />
            ) : (
              <p className="text-xs text-red-500 italic">Please choose a password</p>
            )}
          </div>

          <button
            type="submit"
            className="me-2 mt-6 mb-2 w-full cursor-pointer rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 focus:outline-none"
          >
            Login
          </button>
        </form>

        <p className="text-center text-[#444444]">
          Belum punya akun?{' '}
          <Link to="/register" className="cursor-pointer font-medium text-red-800">
            Daftar aja dulu
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
