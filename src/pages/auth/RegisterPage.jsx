function RegisterPage() {
  return (
    <section>
      <p>RegisterPage page</p>

      <form className="bg-orange-400 flex flex-col p-5">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />

        <label htmlFor="username">Username</label>
        <input type="text" id="username" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" />

        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default RegisterPage;
