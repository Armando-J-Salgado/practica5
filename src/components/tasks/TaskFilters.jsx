import { useTaskStore } from '../../store/taskStore';
import { useUIStore } from '../../store/uiStore';
import { FILTERS, CATEGORIES } from '../../utils/constants';

export default function TaskFilters() {
  const { currentFilter, currentCategory, setFilter, setCategory, setSearchQuery } = useTaskStore();
  const {theme} = useUIStore();

  return (
    <div className={`card mb-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filtro por estado */}
        <div>
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
            Filtrar por estado
          </label>
          <div className="flex gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentFilter === filter.id
                    ? theme === 'dark' ? 'bg-blue-300 text-gray-800' : 'bg-blue-600 text-white'
                    : theme === 'dark' ? 'bg-gray-800 text-gray-100 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por categoría */}
        <div>
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
            Filtrar por categoría

          </label>
          <select
            value={currentCategory}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            <option value="all" className={`${theme == 'dark' && 'bg-gray-600 text-gray-200 hover:bg-gray-700 checked:'}`}>Todas las categorías</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id} className={`${theme == 'dark' && 'bg-gray-600 text-gray-200 hover:bg-gray-700 checked:'}`}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
          Buscar tareas
        </label>
        <input
          type="text"
          placeholder="Escribe para buscar..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`input-field w-full ${theme==='dark' ? 'text-gray-100 placeholder-gray-400' : 'text-gray-800 placeholder:text-gray-400'}`}
        />
      </div>
    </div>
  );
} 
