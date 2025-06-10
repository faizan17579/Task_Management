import { useContext } from 'react';
     import { Link } from 'react-router-dom';
     import { AuthContext } from '../context/AuthContext.jsx';

     const Home = () => {
       const { user } = useContext(AuthContext);

       return (
         <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
           <div className="container mx-auto px-4 text-center text-white">
             <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
               Welcome to Task Manager
             </h1>
             <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
               Organize your tasks efficiently with our modern, user-friendly application.
               Stay on top of your priorities and boost productivity.
             </p>
             <Link
               to={user ? "/dashboard" : "/login"}
               className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300"
             >
               {user ? "Go to Dashboard" : "Get Started"}
             </Link>
             <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
               <div className="bg-black bg-opacity-10 p-6 rounded-lg backdrop-blur-md">
                 <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                 <p>Create, edit, and track tasks with ease.</p>
               </div>
               <div className="bg-black bg-opacity-10 p-6 rounded-lg backdrop-blur-md">
                 <h3 className="text-xl font-semibold mb-2">Priority Sorting</h3>
                 <p>Prioritize tasks with low, medium, or high importance.</p>
               </div>
               <div className="bg-black bg-opacity-10 p-6 rounded-lg backdrop-blur-md">
                 <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
                 <p>Access your tasks anywhere, on any device.</p>
               </div>
             </div>
           </div>
         </section>
       );
     };

     export default Home;