import { Flecha } from "../../../../components/flecha";
import { getStudentRank } from "../../../../lib/data/rank";
import { Filter } from "../../../../components/Filter";
import Paginacion from "../../../../components/paginacion";

export const dynamic = 'force-dynamic';
export default async function Report5({searchParams}: {searchParams: {periodo: string, program: string, page: string }}) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;

    const { data, totalPages } = await getStudentRank({ 
        periodo: params.periodo, 
        program: params.program, 
        page: currentPage 
    });
    return (
      <div className="p-8 font-sans text-white-800">
         <Flecha/>
         <h1 className="text-3xl font-bold mb-2">Cuadro de honor</h1>
           <p className="text-gray-600 mb-6">
             jjsjs
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 ">
                    <p className="text-gray-500 font-medium">jjkkkk</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{}</p>
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
                                        <td className="px-6 py-4 whitespace-nowrap">{row.nombre_alumno}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{row.licenciatura}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">{row.periodo}</td>
                                         <td className="px-6 py-4 whitespace-nowrap font-bold">{row.promedio_final}</td>
                                         <td className={`px-6 py-4 whitespace-nowrap ${row.ranking> 0 ? 'text-red-500 font-bold' : 'text-green-500'}`}>
                                            {row.ranking}
                                        </td>
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