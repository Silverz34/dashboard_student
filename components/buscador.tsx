'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Buscador({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
       
        if(term){
            params.set('query', term);
        }else{
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return(
        <div className="relative flex flex-1 flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
            <label htmlFor="search" className="sr-only">
                Buscar
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                placeholder={placeholder}
                onChange={(e) => {handleSearch(e.target.value);}}
                defaultValue={searchParams.get('query')?.toString()}
            />
      </div>
    );
}