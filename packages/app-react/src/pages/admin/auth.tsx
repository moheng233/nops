import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/admin/auth")({
    component: AuthCompoent,
});

function AuthCompoent() {
    const { t } = useTranslation();

    return (
        <>
            <div className='container'>
                <div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground'>
                    <Link
                        to='/admin/auth/users'
                        activeProps={{
                            className:
                                "bg-background text-foreground shadow-sm",
                        }}
                        className='inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                    >
                        {t("admin.categoies.items.user")}
                    </Link>
                    <Link
                        to='/admin/auth/roles'
                        activeProps={{
                            className:
                                "bg-background text-foreground shadow-sm",
                        }}
                        className='inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                    >
                        {t("admin.categoies.items.roles")}
                    </Link>
                </div>
                <div className='mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
}
