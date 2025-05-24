const Footer = () => {
    return (
        <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-center">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                        {new Date().getFullYear()} Django React Auth. All rights
                        reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
