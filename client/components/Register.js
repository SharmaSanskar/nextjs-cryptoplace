import Image from "next/image";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { register, setIsLoginModal, closeModal } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setLoading(true);

      await register(emailRef.current.value, passwordRef.current.value);
      closeModal();
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="text-indigo-50 h-full flex">
      <div className="left flex-1 flex flex-col items-start px-10 py-4 h-full justify-center">
        <button
          className="absolute top-5 left-10 text-indigo-500 text-xs underline decoration-double font-bold hover:text-indigo-50"
          onClick={closeModal}
        >
          &lt; Back
        </button>
        <h2 className="text-2xl uppercase font-bold mb-4">Register</h2>

        <form onSubmit={handleRegister}>
          <div className="font-bold">
            {/* <label htmlFor="username">Username</label>
          <input className="mb-4 mt-1 block text-indigo-500 px-2 py-1 rounded-md w-full" type="text" id="username" ref={usernameRef} required /> */}

            <label htmlFor="email">Email</label>
            <input
              className="mb-4 mt-1 block text-indigo-500 px-2 py-1 rounded-md w-full"
              type="text"
              id="email"
              ref={emailRef}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              className="mb-4 mt-1 block text-indigo-500 px-2 py-1 rounded-md w-full"
              type="password"
              id="password"
              ref={passwordRef}
              required
            />

            <label htmlFor="password-confirm">Confirm Password</label>
            <input
              className="mb-4 mt-1 block text-indigo-500 px-2 py-1 rounded-md w-full"
              type="password"
              id="password-confirm"
              ref={passwordConfirmRef}
              required
            />
          </div>

          {error && <div className="mb-2">{error}</div>}

          <button
            className="px-4 py-1 bg-indigo-500 rounded-md font-bold text-sm text-indigo-50 hover:text-indigo-50/70 hover:bg-indigo-500/70 transition-all"
            disabled={loading}
            type="submit"
          >
            Register
          </button>
        </form>

        <div className="mt-4">
          Already have an account?{" "}
          <span
            className="cursor-pointer text-indigo-500 underline decoration-double"
            onClick={() => setIsLoginModal(true)}
          >
            Login
          </span>
        </div>
      </div>

      <div className="right hidden md:flex w-2/5 h-full bg-indigo-500/70 rounded-r-md items-center justify-center p-4">
        <Image src="/register-illustration.svg" width={250} height={250} />
      </div>
    </div>
  );
}
