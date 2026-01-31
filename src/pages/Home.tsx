import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Brain, Bot, Code, Smartphone, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-bg.jpg';
import { useCountUp } from '@/hooks/useCountUp';
import aiIcon from '@/assets/ai-icon.png';
import chatbotIcon from '@/assets/chatbot-icon.png';
import webDevIcon from '@/assets/web-dev-icon.png';
import PremiumHeroScene from '@/components/3D/PremiumHeroScene';
import { Suspense } from 'react';

const Home = () => {
  const projectCount = useCountUp(150, 2000, 200);
  const clientCount = useCountUp(80, 2000, 400);
  const countryCount = useCountUp(15, 2000, 600);
  const yearCount = useCountUp(1, 2000, 800);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Premium 3D Scene */}
        <Suspense fallback={null}>
          <PremiumHeroScene />
        </Suspense>
        
        {/* Left Corner Text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-12 z-10 max-w-2xl">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Press{' '}
              <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
                Ctrl Alt Crew
              </span>
              <br />
              to Restart Innovation
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-xl">
              We debug life's glitches and reboot old ideas into bold AI-powered solutions. Your geeky partners for next-gen software development.
            </p>
            <div className="flex gap-4 pt-6">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 transition-all duration-300 text-lg px-8 py-6 rounded-lg font-semibold"
              >
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white transition-all duration-300 text-lg px-8 py-6 rounded-lg font-semibold"
              >
                <Link to="/portfolio">View Our Work <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Expertise</h2>
            <p className="text-xl text-muted-foreground">
              From AI wizardry to full-stack sorcery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="glass-3d border-border/50 hover:border-primary transition-all duration-500 glow-hover">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0ea5e9] flex items-center justify-center">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">AI & Data Science</h3>
                <p className="text-muted-foreground">
                  Machine learning models that actually learn (unlike some developers we know)
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-3d border-border/50 hover:border-primary transition-all duration-500 glow-hover">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-[#ff6b9d] to-[#ec4899] flex items-center justify-center">
                  <Code className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Web Development</h3>
                <p className="text-muted-foreground">
                  Responsive sites that work on everything except Internet Explorer (we have standards)
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-3d border-border/50 hover:border-primary transition-all duration-500 glow-hover">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-[#c084fc] to-[#a855f7] flex items-center justify-center">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Chatbots & Automation</h3>
                <p className="text-muted-foreground">
                  Bots so smart, they'll probably ask for a raise
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section with 3D Visualization */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ctrl Alt Crew's Achievements</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We take pride in empowering startups and enterprises worldwide with AI-powered, scalable, and innovative solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="text-center p-6 rounded-lg glass-3d border border-border/50 hover:border-primary transition-all duration-300 perspective-container">
              <div className="text-5xl font-bold text-gradient mb-2 card-3d">{projectCount}+</div>
              <div className="text-muted-foreground">Successful Projects</div>
            </div>
            
            <div className="text-center p-6 rounded-lg glass-3d border border-border/50 hover:border-primary transition-all duration-300 perspective-container">
              <div className="text-5xl font-bold text-gradient mb-2 card-3d">{clientCount}+</div>
              <div className="text-muted-foreground">Active Clients</div>
            </div>
            
            <div className="text-center p-6 rounded-lg glass-3d border border-border/50 hover:border-primary transition-all duration-300 perspective-container">
              <div className="text-5xl font-bold text-gradient mb-2 card-3d">{countryCount}+</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
            
            <div className="text-center p-6 rounded-lg glass-3d border border-border/50 hover:border-primary transition-all duration-300 perspective-container">
              <div className="text-5xl font-bold text-gradient mb-2 card-3d">{yearCount}+</div>
              <div className="text-muted-foreground">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Reboot Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's turn your "it works on my machine" into "it works everywhere"
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4"
          >
            <Link to="/contact">Start Debugging with Us</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;