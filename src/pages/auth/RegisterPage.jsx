import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { register } from '../../utils/api/auth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FormSubmitButton from '../../components/Form/FormSubmitButton';
import FormAuthInput from '../../components/Form/FormAuthInput';

function RegisterPage() {
  const [fullname, onFullnameChange] = useInput('');
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  const [isFullnameFilled, setIsFullnameFilled] = useState(true);
  const [isUsernameFilled, setIsUsernameFilled] = useState(true);
  const [isPasswordFilled, setIsPasswordFilled] = useState(true);
  const [isConfirmPasswordFilled, setIsConfirmPasswordFilled] = useState(true);

  const navigate = useNavigate();

  function validateForm() {
    setIsFullnameFilled(!!fullname);
    setIsUsernameFilled(!!username);
    setIsPasswordFilled(!!password);
    setIsConfirmPasswordFilled(!!confirmPassword);

    return fullname && username && password && confirmPassword;
  }

  async function onRegisterHandler(event) {
    event.preventDefault();
    if (!validateForm()) return;

    if (password !== confirmPassword) {
      return alert('password and confirm password must same');
    }

    // setIsLoading(true);
    try {
      const { error } = await register({ username, password, fullname });
      if (!error) {
        navigate('/');
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
        <form onSubmit={onRegisterHandler} className="mb-4 px-8 pt-6 pb-8">
          <p className="mb-6 text-center text-2xl font-medium text-[#444444]">Daftar</p>

          <FormAuthInput
            id="fullname"
            type="text"
            value={fullname}
            onChange={onFullnameChange}
            placeholder="Nama Lengkap"
            isFilled={isFullnameFilled}
            warnMessage="Silakan pilih nama lengkap"
          />

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

          <FormAuthInput
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            placeholder="Ketik ulang password"
            isFilled={isConfirmPasswordFilled}
            warnMessage="Silakan ketik ulang password"
          />

          <FormSubmitButton label="Daftar" />
        </form>

        <p className="text-center text-[#444444]">
          Sudah punya akun?{' '}
          <Link to="/login" className="cursor-pointer font-medium text-red-800">
            Login, yuk!
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
