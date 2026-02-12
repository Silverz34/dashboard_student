import { Flecha } from "../../../../components/flecha";
import { getAsistenciaPromedio } from "../../../../lib/data/asistencia_promedio";
export default async function Report4() {
    const data = await getAsistenciaPromedio();
    const kpi = data.reduce((sum, row) => sum + Number(row.sesiones_totales), 0);
    return (
       <div className="p-8 font-sans text-white-800">
         <Flecha/>
         <h1 className="text-3xl font-bold mb-2">Asistencia promedio del grupo</h1>
           <p className="text-gray-600 mb-6">
             jjsjs
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 ">
                    <p className="text-gray-500 font-medium">Sumatoria total de sesiones</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{kpi}</p>
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
                                     ID
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                     curso 
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                     nombre del maestro
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        asistencia promedio
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        sesiones totales 
                                    </th>
                        
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-black">
                                {data.map((row, key:number) => (
                                    <tr key={key}>
                                        <td className="px-6 py-4 whitespace-nowrap">{row.id}</td> 
                                        <td className="px-6 py-4 whitespace-nowrap">{row.nombre_curso}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{row.maestro_nombre}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${row.asistencia_promedio> 0 ? 'text-red-500 font-bold' : 'text-green-500'}`}>
                                            {row.asistencia_promedio}%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">{row.sesiones_totales}</td>
                                    </tr>
                               ))}
                          </tbody>                    
                      </table>
                  </div>
               </div>                  
      </div>
    );
}