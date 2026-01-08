const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container flex flex-col md:flex-row items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Pranjal Sahu. All rights reserved.
        </p>
        {/* <p className="text-sm text-muted-foreground">
          Built with passion & precision
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;
