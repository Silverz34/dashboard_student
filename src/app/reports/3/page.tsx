import { Flecha } from "../../../../components/flecha";
import { getRiskStudents } from "../../../../lib/data/risk_student";
import Buscador from "../../../../components/buscador";
import Paginacion from "../../../../components/paginacion";

export const dynamic = 'force-dynamic';
export default async function Report3({searchParams}: {searchParams: { query: string, page: string }}) {
    const resolvedParams = await searchParams;
    const query = resolvedParams.query;
    const currentPage = Number(resolvedParams.page) || 1;
    const { data, totalPages, kpiTotal } = await getRiskStudents({ 
        query, 
        page: currentPage 
    });

    return (
        <div className="p-8 font-sans text-white-800">
            <Flecha/>
            <h1 className="text-3xl font-bold mb-2">Alumnos en riesgo</h1>
              <p className="text-gray-600 mb-6">
                 Sistema de alerta temprana para estudiantes en situación vulnerable. 
                 Filtra alumnos con promedio crítico (menor 6.0) o asistencia insuficiente (menor 70%), 
                 clasificando el tipo de riesgo (Académico, Asistencia o Crítico). Herramienta clave para activar protocolos de tutoría y retención.
               </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
               <div className="bg-white p-6 rounded-lg shadow border-l-4 ">
                 <p className="text-gray-500 font-medium">Total de alumnos en riesgo</p>
                 <p className="text-4xl font-bold text-gray-900 mt-2">{kpiTotal}</p>
                </div>
            </div>
            <br></br>
            <div className="mb-6">
                <Buscador placeholder="Buscar por nombre o correo..." />
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-white">
                    <h3 className="text-lg font-medium text-gray-900">Listado de Productos</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                       <thead className="bg-gray-50">
                          <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 nombre del alumno
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 correo 
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 licenciatura 
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    promedio general
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 asistencia 
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 riesgo academico 
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-black">
                         {data.map((row, key:number) => (
                            <tr key={key}>
                                <td className="px-6 py-4 whitespace-nowrap">{row.nombre_alumno}</td> 
                                <td className="px-6 py-4 whitespace-nowrap">{row.correo}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{row.licenciatura}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-bold">{row.promedio_general}%</td>
                                <td className={`px-6 py-4 whitespace-nowrap ${row.asistencia_promedio> 0 ? 'text-red-500 font-bold' : 'text-green-500'}`}>
                                    {row.asistencia_promedio}%
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-bold">{row.riesgo_academico}</td>
                          </tr>
                           ))}
                      </tbody>                    
                 </table>
                <Paginacion currentPage={currentPage} totalPages={totalPages} />
            </div>
        </div>                  
     </div>
    );
}