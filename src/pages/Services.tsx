import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Bot, Code, Smartphone, Database, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ServiceRequestForm from '@/components/ServiceRequestForm';

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleServiceClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsFormOpen(true);
  };

  const services = [
    {
      icon: Brain,
      title: "AI & Data Science Solutions",
      description: "Machine learning models that actually learn (unlike some interns we've met)",
      features: [
        "Custom ML Model Development",
        "Data Pipeline Architecture", 
        "Predictive Analytics",
        "Neural Network Training",
        "Model Optimization & Deployment"
      ],
      techStack: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas"]
    },
    {
      icon: Bot,
      title: "RAG Pipelines & Chatbots",
      description: "Conversational AI so smart, they'll probably ask for vacation days",
      features: [
        "Retrieval-Augmented Generation",
        "Custom Chatbot Development",
        "Knowledge Base Integration",
        "Multi-channel Deployment",
        "Continuous Learning Systems"
      ],
      techStack: ["OpenAI", "LangChain", "Vector DBs", "FastAPI", "React"]
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Websites that work on everything except Internet Explorer (we have standards)",
      features: [
        "Full-Stack Applications",
        "Responsive Design",
        "Performance Optimization",
        "API Development",
        "Cloud Deployment"
      ],
      techStack: ["React", "Node.js", "TypeScript", "Tailwind", "PostgreSQL"]
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Apps so intuitive, even your parents won't need tech support",
      features: [
        "Cross-Platform Development",
        "Native Performance",
        "Offline Capabilities",
        "Push Notifications",
        "App Store Optimization"
      ],
      techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"]
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Turning your data chaos into organized digital zen",
      features: [
        "ETL Pipeline Development",
        "Data Warehouse Design",
        "Real-time Processing",
        "Data Quality Assurance",
        "Analytics Infrastructure"
      ],
      techStack: ["Apache Airflow", "Spark", "Kafka", "dbt", "Snowflake"]
    },
    {
      icon: Zap,
      title: "Automation & Integration",
      description: "Because repetitive tasks are for robots (literal ones)",
      features: [
        "Workflow Automation",
        "API Integrations",
        "Process Optimization",
        "Legacy System Modernization",
        "CI/CD Implementation"
      ],
      techStack: ["Zapier", "Docker", "Kubernetes", "GitHub Actions", "AWS"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-glow">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From "Hello World" to "Holy World, that's amazing!" – we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:border-primary transition-all duration-300 glow-hover cursor-pointer"
                onClick={() => handleServiceClick(service.title)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">What We Deliver:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center">
                            <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-1">
                        {service.techStack.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground">
              Like debugging, but with more coffee and fewer tears
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="keyboard-key w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Discovery</h3>
              <p className="text-muted-foreground text-sm">
                We listen, ask questions, and pretend to understand your business better than you do
              </p>
            </div>
            
            <div className="text-center">
              <div className="keyboard-key w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Planning</h3>
              <p className="text-muted-foreground text-sm">
                Strategic blueprints that actually make sense (revolutionary concept)
              </p>
            </div>
            
            <div className="text-center">
              <div className="keyboard-key w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Development</h3>
              <p className="text-muted-foreground text-sm">
                Where the magic happens (and by magic, we mean lots of caffeine)
              </p>
            </div>
            
            <div className="text-center">
              <div className="keyboard-key w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Launch</h3>
              <p className="text-muted-foreground text-sm">
                Deploy, celebrate, then immediately start fixing things users find
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's turn your "wouldn't it be cool if..." into "wow, you actually built that!"
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link to="/contact">Launch Project 🚀</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-primary-foreground text-primary bg-primary-foreground hover:bg-primary-foreground/90"
            >
              <Link to="/portfolio">See Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {selectedService && (
        <ServiceRequestForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedService(null);
          }}
          serviceType={selectedService}
        />
      )}
    </div>
  );
};

export default Services;