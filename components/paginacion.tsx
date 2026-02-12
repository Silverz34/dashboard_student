"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PaginacionProps {
  currentPage: number;  
  totalPages: number;  
}

export default function Paginacion({ currentPage, totalPages }: PaginacionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const navigation = (direction: 'antes' | 'despues') => {
    const params = new URLSearchParams(searchParams.toString());
    
    const newPage = direction === 'despues' ? currentPage + 1 : currentPage - 1;
    if (newPage < 1 || newPage > totalPages) return;

    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };
  if (totalPages <= 1) return null; 

  return (
    <div className="flex items-center justify-center gap-4 mt-6 p-4 border-t border-gray-200">
      <button
            onClick={() => navigation('antes')}
            disabled={currentPage <= 1}
            className="px-4 py-2 text-sm font-medium border rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
        Anterior
      </button>

      <span className="text-sm text-gray-500">
         Página <span className="font-bold text-gray-900">{currentPage}</span> de <span className="font-bold text-gray-900">{totalPages}</span>
      </span>

      <button
            onClick={() => navigation('despues')}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 text-sm font-medium border rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
         >
        Siguiente
      </button>
    </div>
  );
}