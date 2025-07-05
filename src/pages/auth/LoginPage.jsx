function LoginPage() {
  return (
    <section>
      <p>LoginPage page</p>

      <form className="bg-green-200 flex flex-col p-5">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" />

        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default LoginPage;
