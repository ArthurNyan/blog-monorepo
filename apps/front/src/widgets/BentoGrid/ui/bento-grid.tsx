import { cn } from "@/shared/lib/utils";
import { motion } from "motion/react";

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: 0.2,
                duration: 0.5,
                type: 'keyframes',
                stiffness: 100,
            }}
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-3 container mx-auto",
                className
            )}
        >
            {children}
        </motion.div>
    );
}

export { BentoGrid };
