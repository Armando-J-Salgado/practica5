import React from 'react'
import { useTaskStore } from '../../store/taskStore';
import { useUIStore } from '../../store/uiStore';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { isOverdue } from '../../utils/dateHelpers';

export default function TaskStats() {
    const { tasks } = useTaskStore();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const expiredTasks = tasks.filter((task) => isOverdue(task.dueDate)).length;
    const percentage = ((completedTasks / totalTasks) * 100).toFixed(2);
    const stats = [
        { label: 'Total de tareas', value: totalTasks},
        { label: 'Completadas', value: completedTasks},
        { label: 'Pendientes', value: pendingTasks},
        { label: 'Vencidas', value: expiredTasks}
    ];
    const { theme } = useUIStore();
    return (
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-10 card flex flex-col md:flex-row justify-evenly items-center px-3 py-5 gap-6`}>
                {/* Gráfica circular */}
                <div className='mx-2'>
                    <CircularProgressbar
                        value={percentage}
                        text={`${isNaN(percentage) ? '0%' : percentage + '%'}`}
                        styles={buildStyles({
                            pathColor: (theme === 'dark') ? '#8ec5ff' : '#2626FC',
                            trailColor: '#EDEDFF'
                        })}
                    />
                </div>

                {/* Labels con valores */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                    {stats.map((stat, idx) => (
                        <div key={idx}>
                            <p className={`text-lg text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                {stat.label}
                            </p>
                            <p className={`text-5xl text-center font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>
        </div>
    )
}
