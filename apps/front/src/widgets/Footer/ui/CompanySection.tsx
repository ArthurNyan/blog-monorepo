import type { CompanyInfo } from '../model';

interface CompanySectionProps {
	companyInfo: CompanyInfo;
}

export const CompanySection = ({ companyInfo }: CompanySectionProps) => {
	const { logoDark, logoLight, description, name } = companyInfo;

	return (
		<div className="flex flex-col items-start justify-start md:max-w-[200px]">
			<div className="flex items-center gap-2">
				<img
					src={logoDark}
					alt={`${name} logo`}
					width={40}
					height={40}
					className="rounded-full h-10 w-10 block dark:hidden"
				/>
				<img
					src={logoLight}
					alt={`${name} logo`}
					width={40}
					height={40}
					className="rounded-full h-10 w-10 hidden dark:block"
				/>
			</div>
			<p className="text-muted-foreground mt-4 text-sm text-start">{description}</p>
		</div>
	);
};
