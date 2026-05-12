import type { FooterColumn as FooterColumnType } from '../model';

interface FooterColumnProps {
	column: FooterColumnType;
}

export const FooterColumn = ({ column }: FooterColumnProps) => {
	const { heading, links } = column;

	return (
		<div className="flex flex-col">
			<h3 className="text-base font-normal text-foreground">{heading}</h3>
			<ul className="mt-4 text-sm text-gray-500 space-y-4">
				{links.map((link, index) => (
					<li key={index} className={index > 0 ? 'mt-2' : ''}>
						<a href={link.href} className="a hover:text-foreground transition-all duration-300">
							{link.title}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};
