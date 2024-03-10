import { createLazyFileRoute, Link, Outlet } from "@tanstack/react-router";

import { AppTopbar } from "@/components/layout/app_topbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createLazyFileRoute("/admin")({
    component: AdminLayoutComponent,
});

function AdminLayoutComponent() {
    return (
        <div className='hidden flex-col md:flex'>
            <AppTopbar
                teil={
                    <div className='ml-auto flex items-center space-x-4'>
                        <div>
                            <Input
                                type='search'
                                className='md:w-[100px] lg:w-[300px]'
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant='ghost'
                                    className='relative h-8 w-8 rounded-full'
                                >
                                    <Avatar className='h-8 w-8'>
                                        <AvatarFallback>Nops</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent></DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                }
            >
                <Link to='/admin/machine'>
                    <span
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                        )}
                    >
                        设备管理
                    </span>
                </Link>
                <Link to='/admin/auth'>
                    <span
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                        )}
                    >
                        认证管理
                    </span>
                </Link>
            </AppTopbar>

            <div className='flex-1 space-y-4 p-8 pt-6'>
                <Outlet></Outlet>
            </div>
        </div>
    );
}
