import { Link } from 'react-router-dom';
import { updateTask, deleteTask } from '../../services/taskService';
import { CATEGORIES } from '../../utils/constants';
import { getDueDateLabel, isOverdue } from '../../utils/dateHelpers';
import { useUIStore } from '../../store/uiStore';
import ConfirmToast from '../common/ConfirmToast';

export default function TaskCard({ task }) {
    const category = CATEGORIES.find(c => c.id === task.category);
    const {theme} = useUIStore();

    const handleToggleComplete = async (e) => {
        e.preventDefault(); // Evitar que el Link navegue 
        // TODO: Implementar toggle de completado
        await updateTask(task.id, {completed: !task.completed});
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        // TODO: Implementar eliminación con confirmación 
        ConfirmToast({
            title: '¿Está seguro de que quiere eliminar la tarea?',
            description: 'Se eliminará de manera permanente',
            theme: theme,
            onCancel: () => {},
            onConfirm: async () => {await deleteTask(task.id)} 
        });
    };

    return (
        <Link to={`/tasks/${task.id}`} className="block">
            <div className={`card hover:shadow-lg transition-shadow ${task.completed && 'opacity-60'} ${(isOverdue(task.dueDate) && !task.completed) ? 'border-red-500 border-2':''} ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <div className='flex flex-col items-stretch px-3 py-3 gap-2'>
                    
                    {/*Categoría*/}
                    <div className='flex flex-row justify-between items-stretch'>
                        <div className={`flex text-lg font-medium py-2 px-6 rounded-lg justify-self-start text-${category.color}-800 bg-${category.color}-100`}>
                            <span className={'flex flex-col align-center justify-center'}>
                                {category.label}
                            </span>
                        </div>
                        <div>
                            {/* Fecha de vencimiento */}
                            <p className={`block text-md font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                Fecha de vencimiento:<br />
                                <span>{getDueDateLabel(task.dueDate)}</span>
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-row justify-stretch items-start mt-3'>
                        <div>
                            {/* Textos principales*/}
                            <div className='flex flex-col items-stretch'>
                                {/* Campo: Título */}
                                <h1 className={`block text-2xl font-semibold ${theme === 'dark' ? 'text-gray-300': 'text-gray-700'} mb-2`}>
                                    {task.title}
                                </h1>

                                {/* Campo: Descripción */}
                                <p className={`block text-lg font-normal ${theme === 'dark' ? 'text-gray-300': 'text-gray-700'} mb-2 ${task.description ? 'block' : 'hidden'}`}>
                                    {task.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer*/}
                    <div className="flex flex-row justify-between items-end mt-2">
                        <div>
                            <span className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                Estatus: {task.completed ? 'Completada' : 'Pendiente'}
                            </span>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-4 justify-end">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="btn-secondary"
                            >
                                Eliminar
                            </button>
                            <button
                                type="button"
                                onClick={handleToggleComplete}
                                className="btn-primary disabled:opacity-50"
                            >
                                {
                                    task.completed
                                        ? 'Marcar como pendiente'
                                        : 'Completar'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}