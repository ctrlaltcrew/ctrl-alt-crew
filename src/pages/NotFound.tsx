import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import KeyboardLogo from "@/components/KeyboardLogo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Only log 404s in development mode
    if (import.meta.env.DEV) {
      console.error("Dev Error - 404:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <KeyboardLogo size="lg" className="justify-center" />
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Looks like this page decided to take an unscheduled coffee break. 
            Don't worry, it happens to the best of us.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            <span className="keyboard-key text-sm font-mono mr-2">Ctrl</span>
            <span className="keyboard-key text-sm font-mono mr-2">Alt</span>
            <span className="keyboard-key text-sm font-mono mr-2">Home</span>
            to restart your journey
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/contact">Report a Bug 🐛</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
