import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
    component: IndexComponent,
});

export function IndexComponent() {
    const [count, setCount] = useState(0);

    return <></>;
}
