import { Suspense } from "react";
import Loading from "./loading";

export default async function LayoutAuth({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    )
}

