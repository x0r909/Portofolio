const Footer = () => {
  return (
    <footer className="border-t border-cyber-border/30 bg-cyber-bg/85 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-mono text-xs text-cyber-dim">
          © {new Date().getFullYear()} Augie Aristito Sudiarto. All rights reserved.
        </div>
        <div className="font-mono text-xs text-cyber-green">
          [ system_status: online ] [ secure_connection: active ]
        </div>
      </div>
    </footer>
  );
};

export default Footer;
