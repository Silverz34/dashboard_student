import { Flecha } from "../../../../components/flecha";
import { getTeacherLoad } from "../../../../lib/data/paginado";
import Paginacion from "../../../../components/paginacion";

export const dynamic = 'force-dynamic';
export default async function Report2({ searchParams }: { searchParams: { page?: number } }) {
    const res = await searchParams;
    const current = Number(res.page) || 1;
    const { data, totalPages} = await getTeacherLoad({ page: res.page });
    const kpi = data.reduce((suma, item) => suma + Number(item.total_estudiantes), 0);
    
    return (
       <div className="p-8 font-sans text-white-800">
           <Flecha/>
           <h1 className="text-3xl font-bold mb-2">Carga de trabajo por profesor</h1>
           <p className="text-gray-600 mb-6">
             Monitoreo de la carga académica asignada a cada profesor. Visualiza el número de grupos y el total de estudiantes atendidos por docente,
             correlacionado con el desempeño promedio de sus alumnos. Ideal para asegurar una distribución equitativa de la carga laboral y evaluar el impacto docente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 ">
                    <p className="text-gray-500 font-medium">Total de estudiantes</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{kpi} alumnos</p>
                </div>
           </div>
           <br></br>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-white">
                    <h3 className="text-lg font-medium text-gray-900">Listado de Productos</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    nombre del maestro
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    periodo
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    total grupos
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    total estuidiantes
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    desempeño promedio
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-black">
                          {data.map((row, key:number) => (
                                <tr key={key}>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.nombre_maestro}</td> 
                                    <td className="px-6 py-4 whitespace-nowrap">{row.periodo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.total_grupos}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">{row.total_estudiantes}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap ${row.desempeño_promedio> 0 ? 'text-red-500 font-bold' : 'text-green-500'}`}>
                                      {row.desempeño_promedio}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        
                    </table>
                </div>
           </div> 
            <Paginacion  currentPage={current} totalPages={totalPages} />
        </div>
    );
}