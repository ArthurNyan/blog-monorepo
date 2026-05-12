import { cn } from '@/shared/lib/utils';
import { motion } from 'motion/react';
import type { ContainerProps } from '../model';

export const Container = ({
	children,
	className,
	delay = 0.2,
	reverse,
	simple,
}: ContainerProps) => {
	return (
		<motion.div
			className={cn('w-full h-full', className)}
			initial={{ opacity: 0, y: reverse ? -20 : 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{
				delay,
				duration: simple ? 0.2 : 0.4,
				type: simple ? 'keyframes' : 'spring',
				stiffness: simple ? 100 : undefined,
			}}
		>
			{children}
		</motion.div>
	);
};
