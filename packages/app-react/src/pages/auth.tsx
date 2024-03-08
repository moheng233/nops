import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth")({
    component: LayoutComponent,
});

function LayoutComponent() {
    return (
        <div className='container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
            <Button
                variant={"ghost"}
                className='absolute right-4 top-4 md:right-8 md:top-8'
            >
                登入
            </Button>
            <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
                <div className='absolute inset-0 bg-zinc-900' />
                <div className='relative z-20 flex items-center text-lg font-medium'>
                    <img src='/vite.svg' className='mr-2 h-6 w-6' />
                    Nops
                </div>
                <div className='relative z-20 mt-auto'>
                    <blockquote className='space-y-2'>
                        <p className='text-lg'>
                            &ldquo;This library has saved me countless hours of
                            work and helped me deliver stunning designs to my
                            clients faster than ever before.&rdquo;
                        </p>
                        <footer className='text-sm'>Sofia Davis</footer>
                    </blockquote>
                </div>
            </div>
            <div className='lg:p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
}
