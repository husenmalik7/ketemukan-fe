import useInput from '../../hooks/useInput';
import { login } from '../../utils/api/auth';

function LoginPage() {
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  async function onLoginHandler(event) {
    event.preventDefault();

    // setIsLoading(true);
    try {
      const { error, data } = await login({ username, password });
      if (!error) {
        console.log(data);
        // loginSuccess(data);
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
      <p>LoginPage page</p>

      <form onSubmit={onLoginHandler} className="bg-green-200 flex flex-col p-5">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={onUsernameChange} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={onPasswordChange} />

        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default LoginPage;
