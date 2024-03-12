import { createLazyFileRoute } from "@tanstack/react-router";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
