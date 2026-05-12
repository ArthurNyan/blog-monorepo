import { Button } from "@/shared/components/ui/button"
import type { FeatureTabsProps } from "../model/types";
import { TabsContent as TabsContentRadix } from "@radix-ui/react-tabs";
import { Badge } from "@/shared/components/ui/badge";
import { motion } from "motion/react";

export const TabsContent = ({ tabs }: Pick<FeatureTabsProps, 'tabs'>) => {
    return (
        <div className="mx-auto mt-8 max-w-7xl rounded-2xl bg-muted/70 p-6 lg:p-16">
            {tabs?.map((tab) => (
                <TabsContentRadix
                    key={tab.value}
                    value={tab.value}
                    className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
                >
                    <motion.div className="flex flex-col gap-5"
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Badge variant="outline" className="w-fit bg-background">
                            {tab.content.badge}
                        </Badge>
                        <h3 className="text-3xl font-semibold lg:text-5xl">
                            {tab.content.title}
                        </h3>
                        <p className="text-muted-foreground lg:text-lg">
                            {tab.content.description}
                        </p>
                        <Button className="mt-2.5 w-fit gap-2" size="lg">
                            {tab.content.buttonText}
                        </Button>
                    </motion.div>
                    <motion.img
                        src={tab.content.imageSrc}
                        alt={tab.content.imageAlt}
                        className="rounded-xl w-full object-cover aspect-square"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    />
                </TabsContentRadix>
            ))}
        </div>
    );
}