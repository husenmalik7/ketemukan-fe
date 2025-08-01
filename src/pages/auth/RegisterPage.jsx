import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import useInput from '../../hooks/useInput';

import { register } from '../../utils/api/auth';
import { getAllLocations } from '../../utils/api';

import RegisterContinueModal from '../../components/Form/RegisterContinueModal';
import FormSubmitButton from '../../components/Form/FormSubmitButton';
import FormAuthInput from '../../components/Form/FormAuthInput';
import FormAuthLocationDropdown from '../../components/Form/FormAuthLocationDropdown';

import LoadingModal from '../../components/LoadingModal';

function RegisterPage() {
  const [fullname, onFullnameChange] = useInput('');
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  const [isFullnameFilled, setIsFullnameFilled] = useState(true);
  const [isUsernameFilled, setIsUsernameFilled] = useState(true);
  const [isPasswordFilled, setIsPasswordFilled] = useState(true);
  const [isConfirmPasswordFilled, setIsConfirmPasswordFilled] = useState(true);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isContinueModalOpen, setIsContinueModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const { data } = await getAllLocations();
        setLocations(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLocation();
  }, []);

  useEffect(() => {
    if (locations.length > 0 && !selectedLocation) {
      setSelectedLocation(locations[0]);
    }
  }, [locations, selectedLocation]);

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
      return toast.error('password and confirm password must same');
    }

    setIsLoading(true);
    try {
      const locationId = selectedLocation.id;
      const { error } = await register({ username, password, fullname, locationId });

      await new Promise((resolve) => setTimeout(resolve, 1300));
      if (!error) {
        setIsContinueModalOpen(true);
      }
    } catch (error) {
      console.log(error);
      return toast.error('Terjadi kesalahan pada server');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen flex-col pb-20">
      <ToastContainer position="bottom-right" />
      <RegisterContinueModal
        isContinueModalOpen={isContinueModalOpen}
        setIsContinueModalOpen={setIsContinueModalOpen}
      />

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

          <FormAuthLocationDropdown
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            locations={locations}
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

      <LoadingModal isLoading={isLoading} />
    </section>
  );
}

export default RegisterPage;
