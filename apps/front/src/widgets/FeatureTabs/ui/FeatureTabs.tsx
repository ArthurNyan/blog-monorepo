import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import { Badge } from "@/shared/components/ui/badge";
import { tabsSample } from "../const/const";
import type { FeatureTabsProps } from "../model/types";
import { TabsContent } from "./TabsContent";
import { motion } from "motion/react";

export const FeatureTabs = ({
    badge = "shadcnblocks.com",
    heading = "A Collection of Components Built With Shadcn & Tailwind",
    description = "Join us to build flawless web solutions.",
    tabs = tabsSample,
}: FeatureTabsProps) => {
    return (
        <motion.section
            className="container mx-auto"
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: 0.2,
                duration: 0.5,
                type: 'keyframes',
                stiffness: 100,
            }}
        >
            <div className="flex flex-col items-center gap-4 text-center"
            >
                <Badge variant="outline">{badge}</Badge>
                <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl">
                    {heading}
                </h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <Tabs defaultValue={tabs[0].value} className="mt-8">
                <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary cursor-pointer hover:bg-muted hover:text-primary transition-all duration-300"
                        >
                            {tab.icon} {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent tabs={tabs} />
            </Tabs>
        </motion.section>
    );
};
