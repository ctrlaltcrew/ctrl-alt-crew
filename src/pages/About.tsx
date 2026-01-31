import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coffee, Heart, Lightbulb, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Logo3DInteractive from '@/components/3D/Logo3DInteractive';
import ParticlesBackground from '@/components/3D/ParticlesBackground';
import { Suspense } from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-glow relative overflow-hidden">
        <Suspense fallback={null}>
          <ParticlesBackground />
        </Suspense>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            About <span className="text-gradient">Ctrl Alt Crew</span>
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto drop-shadow-md">
            We're not your average software house. We're the people who think "Have you tried turning it off and on again?" 
            is both a life philosophy and a valid debugging strategy.
          </p>
          
          <div className="mt-12">
            <Suspense fallback={null}>
              <Logo3DInteractive />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Our Story</h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Born from a shared frustration with buggy software and a mutual love for clean code and coffee, 
                Ctrl Alt Crew emerged as the answer to "Why can't tech be both powerful and fun?"
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                We believe that the best solutions come from combining technical excellence with human creativity. 
                Our team doesn't just write code – we craft digital experiences that make users smile and businesses thrive.
              </p>
              
              <p className="text-lg leading-relaxed">
                From AI that actually makes sense to chatbots that don't make you want to throw your laptop out the window, 
                we're here to prove that great software can be both intelligent and intuitive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Drives Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card border-border text-center glow-hover">
              <CardContent className="p-8">
                <Coffee className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Caffeine-Driven Innovation</h3>
                <p className="text-muted-foreground">
                  Great code requires great coffee. We measure productivity in espresso shots.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border text-center glow-hover">
              <CardContent className="p-8">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">User-First Philosophy</h3>
                <p className="text-muted-foreground">
                  If your grandma can't use it, we haven't done our job right.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border text-center glow-hover">
              <CardContent className="p-8">
                <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Creative Problem Solving</h3>
                <p className="text-muted-foreground">
                  Every bug is just a feature waiting to be properly documented.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border text-center glow-hover">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  We believe in pair programming, code reviews, and shared pizza.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Fun Facts About Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">∞</div>
              <div className="text-lg font-semibold mb-2">Lines of Code</div>
              <div className="text-muted-foreground">And still counting (mostly comments)</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">404</div>
              <div className="text-lg font-semibold mb-2">Bugs Fixed</div>
              <div className="text-muted-foreground">Error: Number too large to display</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-lg font-semibold mb-2">Stack Overflow Monitoring</div>
              <div className="text-muted-foreground">Someone has to watch the watchers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Want to Join Our Debug Squad?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Whether you need our services or want to join our team, we'd love to chat!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link to="/contact">Let's Talk 💬</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary group"
            >
              <Link to="/services">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">See Our Services</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;