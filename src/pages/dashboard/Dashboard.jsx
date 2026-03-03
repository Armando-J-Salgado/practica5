import { useAuthStore } from '../../store/authStore';
import { useTaskStore } from '../../store/taskStore';
import { useTasks } from '../../hooks/useTasks'; 
import TaskFilters from '../../components/tasks/TaskFilters';
import TaskList from '../../components/tasks/TaskList';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useUIStore } from '../../store/uiStore';
import TaskStats from '../../components/tasks/TaskStats';

export default function Dashboard() {
    const user = useAuthStore((state) => state.user);
    const { tasks, currentFilter, currentCategory, loading, searchQuery } = useTaskStore();
    const {theme} = useUIStore();

    useTasks();

    // Aplicar filtros a las tareas 
    const filteredTasks = tasks.filter((task) => {
        // Filtro por estado (completadas/pendientes) 
        if (currentFilter === 'completed' && !task.completed) return false;
        if (currentFilter === 'pending' && task.completed) return false;

        // Filtro por categoría 
        if (currentCategory !== 'all' && task.category !== currentCategory) return false;

        //Filtro por query
        if (searchQuery !== '' && (!task.title.toLowerCase().includes(searchQuery.toLowerCase()) && !task.description.toLowerCase().includes(searchQuery.toLowerCase()))) return false;

        return true;
    });

    if(loading) {
        return <LoadingSpinner />
    }

    return (
        <div className={`max-w-7xl mx-auto p-6 ${theme === 'dark' && 'bg-gray-900'}`}>
            <div className="mb-8">
                <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    Bienvenido, {user?.displayName || 'Usuario'}
                </h1>
                <p className={`${theme === 'dark' ? 'text-blue-300' : 'text-gray-600'} mt-2`}>
                    Tienes {tasks.filter(t => !t.completed).length} tareas pendientes
                </p>
            </div>

            <TaskStats />

            <TaskFilters />

            <TaskList tasks={filteredTasks} />
        </div>
    );
}