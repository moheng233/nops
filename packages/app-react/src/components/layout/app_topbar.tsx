import { ReactNode } from "react";

export function AppTopbar(props: {
    children?: ReactNode;
    teil?: ReactNode;
}) {
    return (
        <>
            <div className='border-b'>
                <div className='flex h-16 items-center px-4'>
                    <slot name='header'></slot>
                    <nav className='flex items-center space-x-4 lg:space-x-6'>
                        {props.children}
                    </nav>
                    { props.teil }
                </div>
            </div>
        </>
    );
}
