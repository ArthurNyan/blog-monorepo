import type { FooterProps } from '../model';
import {
	DEFAULT_COMPANY_INFO,
	DEFAULT_FOOTER_COLUMNS,
	DEFAULT_FOOTER_COPYRIGHT,
} from '../model';
import { Container } from './Container';
import { CompanySection } from './CompanySection';
import { FooterColumn } from './FooterColumn';

export const Footer = ({ columns, companyInfo, copyrightText }: FooterProps) => {
	const footerColumns = columns || DEFAULT_FOOTER_COLUMNS;
	const company = companyInfo || DEFAULT_COMPANY_INFO;
	const footerCopyright = copyrightText || DEFAULT_FOOTER_COPYRIGHT;

	// Группируем колонки попарно для сетки
	const columnPairs: Array<typeof footerColumns> = [];
	for (let i = 0; i < footerColumns.length; i += 2) {
		columnPairs.push(footerColumns.slice(i, i + 2));
	}

	return (
		<footer className="flex flex-col relative items-center justify-center border-t border-foreground/5 pt-16 pb-8 px-6 lg:px-8 w-full container mx-auto lg:pt-32">
			<div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
				<Container>
					<CompanySection companyInfo={company} />
				</Container>

				<div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
					{columnPairs.map((pair, pairIndex) => (
						<div key={pairIndex} className="md:grid md:grid-cols-2 md:gap-8">
							{pair.map((column, columnIndex) => {
								const delay = 0.1 * (pairIndex * 2 + columnIndex + 1);
								const shouldAddMargin = columnIndex === 1;

								return (
									<Container key={columnIndex} delay={delay} className="h-auto">
										<div className={shouldAddMargin ? 'mt-10 md:mt-0 flex flex-col' : ''}>
											<FooterColumn column={column} />
										</div>
									</Container>
								);
							})}
						</div>
					))}
				</div>
			</div>

			<Container delay={0.5} className="w-full relative mt-12 lg:mt-20">
				<div className="mt-8 md:flex md:items-center justify-center footer w-full">
					<p className="text-sm text-gray-500 mt-8 md:mt-0">
						&copy; {new Date().getFullYear()} {company.name}. {footerCopyright}
					</p>
				</div>
			</Container>
		</footer>
	);
};
