import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LogInFormData {
  username: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LogInFormData>({
    username: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {isLoggedIn, login} = useAuth()
  const navigate = useNavigate();

  useEffect(function() {
    if(isLoggedIn) {
      navigate('/blogs')
    }
  }, [navigate, isLoggedIn])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setIsSubmitting(true);
    await login(formData)
    navigate('/blogs')
    setIsSubmitting(false);
  }
  return (
    <div className="px-6 grid max-w-md w-full mx-auto">
      <h1 className="mb-10 text-center text-3xl font-bold text-cyan-700">
        Log In
      </h1>
      <form
        method="POST"
        className="grid gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="username" className="text-slate-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name='username'
            placeholder="Username"
            className="rounded-lg border border-slate-100 bg-slate-50 px-6 py-4 focus:border-cyan-700 focus:outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="password" className="text-slate-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name='password'
            placeholder="Password"
            className="rounded-lg border border-slate-100 bg-slate-50 px-6 py-4 focus:border-cyan-700 focus:outline-none"
            onChange={handleChange}
          />
          <p className="text-xs text-slate-500">At least 8 characters.</p>
        </div>
        <button className="w-full rounded-md bg-cyan-700 px-6 py-4 text-white">
          {isSubmitting ? 'Logging In...' : 'Log In'}
        </button>
      </form>
      <div className="mt-10 flex justify-between align-baseline">
        <p className="text-sm text-slate-700">Don&apos;t have an account?</p>
        <Link to="/signup" className="text-sm font-bold text-cyan-700">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
