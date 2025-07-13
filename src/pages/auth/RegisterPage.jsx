import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { register } from '../../utils/api/auth';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const navigate = useNavigate();

  async function onRegisterHandler(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert('password and confirm password must same');
    }

    // setIsLoading(true);
    try {
      const { error } = await register({ username, password, fullname: name });
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
    <section>
      <p>RegisterPage page</p>

      <form onSubmit={onRegisterHandler} className="bg-orange-400 flex flex-col p-5">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={onNameChange} />

        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={onUsernameChange} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={onPasswordChange} />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />

        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default RegisterPage;
