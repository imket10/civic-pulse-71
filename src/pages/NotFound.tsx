import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl font-bold text-primary mb-4">404</div>
        <h1 className="text-2xl font-bold mb-4">Oops! Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="btn-civic w-full sm:w-auto">
              Return to Home
            </Button>
          </Link>
          <Link to="/report">
            <Button variant="outline" className="w-full sm:w-auto">
              Report an Issue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
