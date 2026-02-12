'use client';
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function Filter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace}= useRouter();

    const select = (term : string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set("periodo", term);
        } else {
            params.delete("periodo");
        }
        replace(`${pathname}?${params.toString()}`); //actualizar sin recargar 
    };
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por Periodo:
            </label>
            <select 
                className="border border-gray-300 rounded-md p-2 w-64"
                defaultValue={searchParams.get('periodo') || ""}
                onChange={(e) => select(e.target.value)}
            >
                <option value="" className="text-black">Todos los periodos</option>
                <option value="2026-1" className="text-black">2026-1</option>
                <option value="2026-2" className="text-black">2026-2</option>
            </select>
       </div>
    );
}