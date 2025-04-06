function PageWrapper({ children, ...props }: React.ComponentProps<"div">) {
	return (
		<div data-page-wrapper="wrapper" className="flex w-full flex-col items-center gap-4 *:data-[page-wrapper]:max-w-7xl p-4" {...props}>
			{children}
		</div>
	);
}

PageWrapper.Header = function ({
	children,
	title,
	description,
	...props
}: React.ComponentProps<"div"> & { title: string; description: string }) {
	return (
		<div data-page-wrapper="header" className="flex w-full justify-between" {...props}>
			<div className="flex flex-col gap-1" data-page-wrapper="header-title-description">
				<h3 className="text-2xl font-extrabold tracking-wide">{title}</h3>
				<p className="text-muted-foreground text-lg">{description}</p>
			</div>
			{children}
		</div>
	);
};

PageWrapper.Content = function ({ children, ...props }: React.ComponentProps<"div">) {
	return (
		<div data-page-wrapper="content" className="flex w-full" {...props}>
			{children}
		</div>
	);
};

export { PageWrapper };