import { motion } from "motion/react";
import type { SiteLocale } from "@/shared/i18n/config";
import type { LeadFormBlock as LeadFormBlockType } from "@/shared/api/pages";
import { LeadCaptureForm } from "@/widgets/LeadCaptureForm";

interface LeadFormBlockProps {
	block: LeadFormBlockType;
	pagePath: string;
	pageTitle?: string;
	siteLocale: SiteLocale;
}

export const LeadFormBlock = ({
	block,
	pagePath,
	pageTitle,
	siteLocale,
}: LeadFormBlockProps) => {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="grid gap-8 rounded-[2rem] border border-border/70 bg-card/50 p-6 shadow-sm md:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] md:p-10 xl:p-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.45 }}
						className="flex flex-col gap-5"
					>
						{block.eyebrow && (
							<p className="w-fit rounded-full border border-border/70 bg-background px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">
								{block.eyebrow}
							</p>
						)}
						<h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-5xl">
							{block.heading}
						</h2>
						{block.description && (
							<p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
								{block.description}
							</p>
						)}
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.45, delay: 0.1 }}
						className="rounded-[1.5rem] border border-border/70 bg-background p-5 shadow-lg shadow-black/5 md:p-7"
					>
						<LeadCaptureForm
							formName={block.formName}
							pagePath={pagePath}
							pageTitle={pageTitle}
							siteLocale={siteLocale}
							submitLabel={block.submitLabel}
							successMessage={block.successMessage}
							consentLabel={block.consentLabel}
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
