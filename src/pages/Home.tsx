import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Camera, Clock, Users, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/civic-hero.jpg";

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: "Quick Reports",
      description: "Snap a photo and report issues in seconds with automatic location tagging."
    },
    {
      icon: MapPin,
      title: "Interactive Map",
      description: "View all reported issues on an interactive city map with real-time updates."
    },
    {
      icon: Clock,
      title: "Track Progress",
      description: "Follow your reports through each stage from submission to resolution."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of citizens making your community better every day."
    }
  ];

  const stats = [
    { number: "2,847", label: "Issues Resolved", icon: TrendingUp },
    { number: "1,203", label: "Active Citizens", icon: Users },
    { number: "94%", label: "Satisfaction Rate", icon: Shield }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Voice,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
              Your City
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-50 max-w-2xl mx-auto leading-relaxed">
            Report civic issues instantly, track their progress, and help build a better community together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/report">
              <Button size="lg" className="btn-civic text-lg px-8 py-4 w-full sm:w-auto">
                Report an Issue
              </Button>
            </Link>
            <Link to="/map">
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                View Issues Map
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-8 animate-slide-up">
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Making Civic Engagement 
              <span className="text-transparent bg-clip-text bg-gradient-primary"> Simple</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform bridges the gap between citizens and local government with modern tools and transparent processes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="issue-card text-center group">
                <feature.icon className="w-16 h-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Join thousands of engaged citizens who are actively improving their communities.
          </p>
          <Link to="/report">
            <Button size="lg" className="btn-civic-secondary text-lg px-8 py-4">
              Start Reporting Issues
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;