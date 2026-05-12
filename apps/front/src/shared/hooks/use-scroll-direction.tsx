import React from 'react';

export function useScrollDirection(threshold = 10) {
	const [scrollDirection, setScrollDirection] = React.useState<'up' | 'down' | null>(null);
	const [isVisible, setIsVisible] = React.useState(true);
	const lastScrollY = React.useRef(0);
	const ticking = React.useRef(false);

	React.useEffect(() => {
		const updateScrollDirection = () => {
			const scrollY = window.scrollY;

			if (Math.abs(scrollY - lastScrollY.current) < threshold) {
				ticking.current = false;
				return;
			}

			const direction = scrollY > lastScrollY.current ? 'down' : 'up';
			setScrollDirection(direction);

			// Скрываем хедер при скролле вниз (только если проскроллили больше 100px)
			if (direction === 'down' && scrollY > 800) {
				setIsVisible(false);
			} else if (direction === 'up') {
				setIsVisible(true);
			}

			lastScrollY.current = scrollY > 0 ? scrollY : 0;
			ticking.current = false;
		};

		const onScroll = () => {
			if (!ticking.current) {
				window.requestAnimationFrame(updateScrollDirection);
				ticking.current = true;
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
	}, [threshold]);

	return { scrollDirection, isVisible };
}
