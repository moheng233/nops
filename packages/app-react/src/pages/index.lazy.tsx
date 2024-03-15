import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: IndexComponent,
});

export function IndexComponent() {
    return <></>;
}
