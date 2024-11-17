import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface SignUpFormData {
  username: string;
  password: string;
}

export default function Register() {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

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

    try {
      const res = await fetch(`http://localhost:3000/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data)

      if (res.ok) {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="px-6 grid max-w-md w-full mx-auto">
      <h1 className="mb-10 text-center text-3xl font-bold text-cyan-700">
        Sign Up
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
            required
            value={formData.username}
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
            required
            value={formData.password}
          />
          <p className="text-xs text-slate-500">At least 8 characters.</p>
        </div>
        <button
          className="w-full rounded-md bg-cyan-700 px-6 py-4 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <div className="mt-10 flex justify-between align-baseline">
        <p className="text-sm text-slate-700">Already have an account?</p>
        <Link to="/login" className="text-sm font-bold text-cyan-700">
          Log In
        </Link>
      </div>
    </div>
  );
}
