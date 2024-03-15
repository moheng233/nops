import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/admin/auth/roles")({
    component: RolesComponent,
});

function RolesComponent() {
    return (
        <Card>
            <CardHeader></CardHeader>
            <CardContent></CardContent>
        </Card>
    );
}
