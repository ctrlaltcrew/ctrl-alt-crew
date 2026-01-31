import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Brain, Bot, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Portfolio = () => {
  const projects = [
    {
      title: "SmartChat AI Assistant",
      description: "RAG-powered chatbot that actually understands context (shocking, we know)",
      category: "AI & Chatbots",
      icon: Bot,
      image: "/api/placeholder/600/400",
      technologies: ["Python", "LangChain", "OpenAI", "Vector DB", "FastAPI"],
      features: [
        "Multi-document knowledge base",
        "Real-time learning capabilities", 
        "Multi-language support",
        "Integration with 15+ platforms"
      ],
      results: "Reduced customer support tickets by 70% and increased user satisfaction by 45%",
      status: "Live & Learning"
    },
    {
      title: "PredictaFlow Analytics",
      description: "ML pipeline that predicts user behavior better than a fortune teller",
      category: "Data Science",
      icon: Brain,
      image: "/api/placeholder/600/400",
      technologies: ["Python", "TensorFlow", "Apache Airflow", "PostgreSQL", "Docker"],
      features: [
        "Real-time data processing",
        "Automated model retraining",
        "A/B testing integration",
        "Custom dashboard creation"
      ],
      results: "Improved conversion rates by 32% and reduced churn by 28%",
      status: "Production Ready"
    },
    {
      title: "EcoTrack Mobile App",
      description: "Carbon footprint tracker that makes saving the planet addictive",
      category: "Mobile Development",
      icon: Smartphone,
      image: "/api/placeholder/600/400",
      technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Chart.js"],
      features: [
        "Gamified tracking system",
        "Social challenges & leaderboards",
        "AI-powered recommendations",
        "Offline data synchronization"
      ],
      results: "50K+ downloads, 4.8★ rating, featured in App Store",
      status: "App Store Hit"
    },
    {
      title: "AutoCode Generator",
      description: "AI that writes code while you drink coffee (the dream is real)",
      category: "AI & Automation",
      icon: Bot,
      image: "/api/placeholder/600/400",
      technologies: ["Python", "GPT-4", "AST Parsing", "Git Integration", "VS Code Extension"],
      features: [
        "Natural language to code conversion",
        "Automatic documentation generation",
        "Code review suggestions",
        "Multi-language support"
      ],
      results: "Reduced development time by 40% across 12 client projects",
      status: "Beta Testing"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechFlow Solutions",
      quote: "Ctrl Alt Crew didn't just build our AI system, they made it so intuitive that our team actually enjoys using it. That's witchcraft.",
      project: "SmartChat AI Assistant"
    },
    {
      name: "Marcus Rodriguez", 
      role: "Founder, GreenTech Innovations",
      quote: "They turned our 'crazy idea' into a mobile app with 50,000 users. I'm pretty sure they're actual wizards.",
      project: "EcoTrack Mobile App"
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Data, FinanceFlow",
      quote: "Finally, a team that speaks both human and machine. Our ML pipeline has been flawless for 8 months straight.",
      project: "PredictaFlow Analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-glow">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real projects, real results, real satisfied clients (and yes, they actually paid us).
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:gap-16">
            {projects.map((project, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Project Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} relative`}>
                  <Card className="overflow-hidden bg-secondary border-border glow-hover">
                    <div className="aspect-video bg-gradient-dark flex items-center justify-center">
                      <project.icon className="h-24 w-24 text-primary animate-float" />
                    </div>
                  </Card>
                </div>

                {/* Project Details */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div>
                    <Badge variant="secondary" className="mb-4">
                      {project.category}
                    </Badge>
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {project.features.map((feature, i) => (
                          <li key={i} className="text-muted-foreground text-sm flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-secondary p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-primary">Results:</h4>
                      <p className="text-sm text-muted-foreground">{project.results}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {project.status}
                      </Badge>
                      <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Clients Say</h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from real humans (not ChatGPT)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {testimonial.project}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Our Tech Arsenal</h2>
          <p className="text-xl text-muted-foreground mb-12">
            The tools we use to turn caffeine into code
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Python", "React", "Node.js", "TypeScript", "TensorFlow", "Docker",
              "AWS", "PostgreSQL", "MongoDB", "Redis", "Kubernetes", "OpenAI"
            ].map((tech, index) => (
              <div key={index} className="keyboard-key text-center">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's create something amazing together (and maybe get some testimonials that make us blush)
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Link to="/contact">Start Your Project 🚀</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;