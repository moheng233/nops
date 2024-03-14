import { createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import LogoPng from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";

export const Route = createLazyFileRoute("/auth/login")({
    component: LoginComponent,
});

function LoginComponent() {
    const { register, handleSubmit } = useForm<{
        email: string;
        password: string;
    }>();

    const login = trpc.auth.login.useMutation();

    const onSubmit = handleSubmit((data) => {
        try {
            const token = login.mutate(data);
            console.log(token);
        } catch (e) {
            console.error(e);
        }
    });

    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img
                        className='mx-auto h-10 w-auto'
                        src={LogoPng}
                        alt='Your Company'
                    />
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Sign in to your account
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Email address
                            </label>
                            <div className='mt-2'>
                                <Input {...register("email")} />
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center justify-between'>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Password
                                </label>
                                <div className='text-sm'>
                                    <a
                                        href='#'
                                        className='font-semibold text-indigo-600 hover:text-indigo-500'
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <Input {...register("password")} />
                            </div>
                        </div>

                        <div>
                            <Button type='submit' className='w-full'>
                                Sign in
                            </Button>
                        </div>
                    </form>

                    <p className='mt-10 text-center text-sm text-gray-500'>
                        Not a member?{" "}
                        <a
                            href='#'
                            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                        >
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
