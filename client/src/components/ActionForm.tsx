import {PropsWithChildren} from 'react';
import Link from "./Link.tsx";

interface Props extends PropsWithChildren {
    title?: string
}

function ActionForm({children, title}: Props) {
    return (
        <div className='flex items-center justify-center h-full w-full p-4'>
            <div className="absolute top-4 btn-sm md:btn-md  left-4 btn btn-accent flex items-center">
                <span className="h-3 w-3 border-l-2 border-t-2 border-l-info-content -rotate-45"></span>
                <Link to="/">Back to Dashboard</Link>
            </div>
            <div className='max-w-[400px] w-full'>
                <h1 className=' text-center text-4xl font-bold mb-6'>{title}</h1>
                {children}
            </div>
        </div>

    );
}

export default ActionForm;
