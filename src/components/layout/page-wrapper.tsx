function PageWrapper({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-page-wrapper="wrapper"
      className="flex w-full flex-col items-center gap-4 *:data-[page-wrapper]:max-w-7xl p-4 text-right"
      {...props}
    >
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
    <div
      data-page-wrapper="header"
      className="flex w-full justify-between"
      dir="rtl"
      {...props}
    >
      <div
        className="flex flex-col gap-1"
        data-page-wrapper="header-title-description"
      >
        <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
};

PageWrapper.Content = function ({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-page-wrapper="content"
      className="flex w-full"
      dir="rtl"
      {...props}
    >
      {children}
    </div>
  );
};

export { PageWrapper };
