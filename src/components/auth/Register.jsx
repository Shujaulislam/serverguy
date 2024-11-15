import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!form.name || !form.email || !form.password) {
      setErrors('All fields are required.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const emailExists = users.some((user) => user.email === form.email);
    if (emailExists) {
      setErrors('Email is already registered.');
      return;
    }

    // Save user to local storage
    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));

    setSuccessMessage('Registration successful! Redirecting to login page...');
 
    setTimeout(() => {
      navigate('/login');
    }, 2000);

  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded shadow-md w-96"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Register</h2>
        {successMessage && (
         <p className="mb-4 text-green-500">{successMessage}</p>
       )}
        {errors && <p className="mb-4 text-red-500">{errors}</p>}
        <div className="mb-4">
          <label className="block mb-1 text-gray-900">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-900">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-900">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <p className="mt-4 text-center text-gray-900">
         Already have an account?{' '}
         <button
          type="button"
          onClick={() => navigate('/login')}
           className="font-bold text-blue-500 hover:underline"
         >
           Login here
         </button>
       </p>
      </form>
    </div>
  );
};

export default RegisterPage;
