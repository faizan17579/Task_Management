import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
     import { AuthProvider } from './context/AuthContext.jsx';
     import Navbar from './components/Navbar.jsx';
     import Home from './pages/Home.jsx';
     import LoginPage from './pages/LoginPage.jsx';
     import RegisterPage from './pages/RegisterPage.jsx';
     import Dashboard from './pages/Dashboard.jsx';
     import PrivateRoute from './components/PrivateRoute.jsx';

     function App() {
       return (
         <AuthProvider>
           <Router>
             <div className="min-h-screen bg-gray-100">
               <Navbar />
               <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="/login" element={<LoginPage />} />
                 <Route path="/register" element={<RegisterPage />} />
                 <Route
                   path="/dashboard"
                   element={
                     <PrivateRoute>
                       <Dashboard />
                     </PrivateRoute>
                   }
                 />
               </Routes>
             </div>
           </Router>
         </AuthProvider>
       );
     }

     export default App;