import { Filter } from "../../../../components/Filter";
import { Flecha } from "../../../../components/flecha";
import { report1 } from "../../../../interfaces/reports1";
import { getPerformance } from "../../../../lib/data/performance";

export const dynamic = 'force-dynamic';
export default async function Report1({searchParams} : {searchParams : {periodo?: string}}) {
    const res = await searchParams
    const data : report1[] = await getPerformance(res.periodo);
    const totalReprobados = data.reduce((suma, curso) => suma + Number(curso.reprobados), 0);
    
    return (
        <div className="p-12 space-y-8 min-h-screen">
            <Flecha/>
            <h1 className="text-3xl font-bold mb-2">Rendimiento por curso</h1>
            <p className="text-gray-600 mb-6">
                Análisis detallado del desempeño estudiantil por materia. Este reporte permite identificar asignaturas con altos
                índices de reprobación o promedios generales bajos, facilitando la detección temprana de cursos que requieren 
                intervención académica o revisión de contenidos.
            </p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 ">
                    <p className="text-gray-500 font-medium">cantidad reprobados</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{totalReprobados}</p>
                </div>
           </div>
            <br></br>
            <Filter/>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-white">
                    <h3 className="text-lg font-medium text-gray-900">Listado de Productos</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    nombre del curso
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    periodo
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    total alumnos
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    promedio general
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    reprobados
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-black">
                          {data.map((row) => (
                                <tr key={row.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.nombre_curso}</td> 
                                    <td className="px-6 py-4 whitespace-nowrap">{row.periodo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.total_alumnos}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">{row.promedio_general}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap ${row.reprobados > 0 ? 'text-red-500 font-bold' : 'text-green-500'}`}>
                                      {row.reprobados}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
           </div> 
        </div>
    );
}