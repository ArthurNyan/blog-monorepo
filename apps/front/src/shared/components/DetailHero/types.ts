export type Author = {
	id?: string | number;
	firstName?: string;
	lastName?: string;
};

export interface CoverImage {
	url?: string;
	alternativeText?: string;
}

export interface LogoImage {
	url?: string;
	alternativeText?: string;
}

export interface DetailHeroProps {
	title: string;
	description?: string;
	date?: string;
	cover?: CoverImage;
	logo?: LogoImage;
	authors?: Author[];
}
