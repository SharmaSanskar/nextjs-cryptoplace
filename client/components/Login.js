import Image from "next/image";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, setModalIsOpen, setIsLoginModal, closeModal } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await login(emailRef.current.value, passwordRef.current.value);

      setLoading(false);
      setModalIsOpen(false);
    } catch (err) {
      setLoading(false);
      return setError(err.message);
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
        <h2 className="text-2xl uppercase font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="font-bold">
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
          </div>

          {error && <div>{error}</div>}

          <button
            className="px-4 py-1 bg-indigo-500 rounded-md font-bold text-sm text-indigo-50 hover:text-indigo-50/70 hover:bg-indigo-500/70 transition-all"
            disabled={loading}
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          Need an account?{" "}
          <span
            className="cursor-pointer text-indigo-500 underline decoration-double"
            onClick={() => setIsLoginModal(false)}
          >
            Register
          </span>
        </div>
      </div>

      <div className="right w-2/5 h-full bg-indigo-500/70 rounded-r-md flex items-center justify-center">
        <Image
          className="p-4"
          src="/login-illustration.svg"
          width={250}
          height={250}
        />
      </div>
    </div>
  );
}