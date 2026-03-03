import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { logoutUser } from '../../services/authService';
import {useUIStore} from '../../store/uiStore';

export default function Navbar() {
    const { user, clearUser } = useAuthStore();
    const {theme, toggleTheme} = useUIStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result.success) {
            clearUser(); // Limpiar estado de Zustand 
            navigate('/login');
        }
    };

    return (
        <nav className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo y título */}
                    <div className="flex items-center">
                        <Link to="/dashboard" className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                            Task Manager Pro
                        </Link>
                    </div>

                    {/* Usuario y botón de logout */}
                    <div className="flex items-center gap-4">
                        <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                            {user?.displayName || user?.email}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="btn-secondary"
                        >
                            Cerrar sesión
                        </button>
                        <button onClick={toggleTheme} className='btn-primary mx-auto block'>
                            Cambiar a {theme === 'dark' ? 'Light' : 'Dark'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
} 