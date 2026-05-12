import { LogoCloud } from "@/shared/components/ui/logo-cloud";
import { logos } from "../const/const";
import { cn } from "@/shared/lib/utils";

export const LogoPanel = () => {
    return (
        <div className="container mx-auto">
            <div
                aria-hidden="true"
                className={cn(
                    "-z-10 -top-1/2 -translate-x-1/2 pointer-events-none absolute left-1/2 w-full h-full rounded-b-full",
                    "bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]",
                    "blur-[30px]"
                )}
            />
            <section className="relative mx-auto max-w-6xl">
                <h2 className="mb-5 text-center font-medium text-foreground text-xl tracking-tight md:text-3xl">
                    <span className="text-muted-foreground">Trusted by experts.</span>
                    <br />
                    <span className="font-semibold">Used by the leaders.</span>
                </h2>
                <div className="mx-auto my-5 h-px max-w-sm bg-border mask-[linear-gradient(to_right,transparent,black,transparent)]" />

                <LogoCloud logos={logos} />

                <div className="mt-5 h-px bg-border mask-[linear-gradient(to_right,transparent,black,transparent)]" />
            </section>
        </div>
    );
}
