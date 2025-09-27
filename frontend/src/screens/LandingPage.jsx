import React, { useState } from 'react';
import config from '../constants';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password, role);
    }
  };

  const demoLogin = () => {
    onLogin('owner@foodiefind.com', 'password');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           <h1 className="text-2xl font-bold text-blue-600">FoodieFind</h1>
           <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600 transition">Admin Panel</a>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">Discover & Manage Amazing Restaurants</h2>
            <p className="text-lg text-gray-600 mb-8">The all-in-one platform for food lovers and restaurant owners. Browse menus, find your next meal, or manage your business with ease.</p>
            <button onClick={demoLogin} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">Try Demo as Owner</button>
          </div>
          <div className="lg:w-2/5 w-full bg-white p-8 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">{isLoginView ? 'Welcome Back' : 'Create Account'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginView && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              )}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              {!isLoginView && (
                 <div className='pt-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>I am a:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                        <option value="customer">Customer</option>
                        <option value="owner">Restaurant Owner</option>
                    </select>
                 </div>
              )}
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">{isLoginView ? 'Login' : 'Sign Up'}</button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
              {isLoginView ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-blue-600 hover:underline ml-1">{isLoginView ? 'Sign Up' : 'Login'}</button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
