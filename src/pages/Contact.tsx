import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock, Coffee, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent! 🚀",
      description: "We'll get back to you faster than you can say 'Hello World'",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      budget: '',
      message: '',
      timeline: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-glow">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Let's <span className="text-gradient">Debug</span> Together
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Got a project that needs our special blend of code and caffeine? 
            Let's turn your "it's complicated" into "it just works."
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Start Your Project</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you faster than a hot-fixed production bug.
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your awesome company"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Needed *</Label>
                      <Select onValueChange={(value) => handleInputChange('service', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                          <SelectItem value="web-dev">Web Development</SelectItem>
                          <SelectItem value="mobile-app">Mobile Applications</SelectItem>
                          <SelectItem value="chatbot">Chatbots & RAG</SelectItem>
                          <SelectItem value="data-engineering">Data Engineering</SelectItem>
                          <SelectItem value="automation">Automation & Integration</SelectItem>
                          <SelectItem value="consulting">Technical Consulting</SelectItem>
                          <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">Under $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k-plus">$100,000+</SelectItem>
                          <SelectItem value="discuss">Let's Discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline</Label>
                      <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Project timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP (Rush Job)</SelectItem>
                          <SelectItem value="1-month">Within 1 Month</SelectItem>
                          <SelectItem value="2-3-months">2-3 Months</SelectItem>
                          <SelectItem value="3-6-months">3-6 Months</SelectItem>
                          <SelectItem value="6-plus-months">6+ Months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your project, your pain points, or just say hi! The more details, the better we can help."
                      rows={5}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-hover"
                  >
                    Launch Project 🚀
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Quick Actions */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">ctrlaltcreww@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">03349650000</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Remote First, Global Reach</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <a href="https://wa.me/923349650000?text=Hi! I'd like to schedule a call with Ctrl Alt Crew" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Schedule a Call
                  </a>
                </Button>
                
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <a href="https://wa.me/923349650000?text=Hi! Let's have a virtual coffee chat about my project" target="_blank" rel="noopener noreferrer">
                    <Coffee className="h-4 w-4 mr-2" />
                    Virtual Coffee Chat
                  </a>
                </Button>
                
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <a href="mailto:ctrlaltcreww@gmail.com?subject=Project Inquiry&body=Hi Ctrl Alt Crew team,%0D%0A%0D%0AI'd like to discuss a project with you.">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Direct Email
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Fun Fact */}
            <Card className="bg-gradient-glow border-border">
              <CardContent className="p-6 text-center">
                <Coffee className="h-12 w-12 text-primary mx-auto mb-4 animate-float" />
                <h3 className="font-bold mb-2">Coffee Counter</h3>
                <p className="text-2xl font-bold text-primary mb-2">2,847</p>
                <p className="text-sm text-muted-foreground">
                  Cups consumed while debugging this year
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              The questions everyone asks (and a few weird ones)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">How long does a typical project take?</h3>
              <p className="text-muted-foreground text-sm">
                Anywhere from "we can fix that in an hour" to "this will take 6 months of careful engineering." 
                We'll give you a realistic timeline after understanding your needs.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Do you work with startups?</h3>
              <p className="text-muted-foreground text-sm">
                Absolutely! We love working with early-stage companies. We offer flexible pricing and 
                can even consider equity partnerships for the right projects.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What if we don't know what we need?</h3>
              <p className="text-muted-foreground text-sm">
                Perfect! Half our job is helping you figure out what you actually need vs. what you think you need. 
                We offer free consultation calls to explore your options.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Can you work with our existing team?</h3>
              <p className="text-muted-foreground text-sm">
                Yes! We're great at integrating with existing teams, providing mentorship, 
                and leaving your developers better than we found them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;