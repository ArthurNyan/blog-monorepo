import { motion } from "motion/react";
import { Button } from "@/shared/components/ui/button";
import { BlurText } from "@/shared/components/BlurText";
import { Suspense, lazy } from "react";

const PixelBlast = lazy(() => import("@/shared/components/background/PixelBlast").then(module => ({ default: module.PixelBlast })));

export default function HeroContent() {
    return (
        <>
            <Suspense>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <PixelBlast
                        variant="square"
                        pixelSize={4}
                        color="#42b860"
                        patternScale={3.25}
                        patternDensity={0.7}
                        pixelSizeJitter={0}
                        enableRipples
                        rippleSpeed={0.4}
                        rippleThickness={0.12}
                        rippleIntensityScale={1.5}
                        liquid={false}
                        liquidStrength={0.12}
                        liquidRadius={1.2}
                        liquidWobbleSpeed={5}
                        speed={0.5}
                        edgeFade={0.25}
                        transparent
                    />
                </motion.div>
            </Suspense>
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-8 max-w-3xl mx-auto mb-4"
                style={{ zIndex: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.3, delay: 1.5, ease: "easeOut" }}
            >
                <h1 className="text-6xl font-bold text-center">
                    Commercial Astro <br /> Template
                </h1>
                <BlurText
                    center={true}
                    text="I'm an open-source website template built with shadcn/ui, Motion, Tailwind 4 & Astro 5. Based on Strapi CMS."
                    delay={100}
                    animateBy="words"
                    direction="bottom"
                    className="text-2xl text-center text-neutral-400"
                    stepDuration={0.2}
                />
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.8, ease: "easeOut" }}
                    className="flex gap-4">
                    <Button
                        variant="default"
                        size="lg"
                        className="text-lg font-medium"
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="text-lg font-medium"
                    >
                        Learn More
                    </Button>
                </motion.div>
            </motion.div>
        </>
    );
}
