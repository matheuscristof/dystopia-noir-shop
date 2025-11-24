import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Check } from "lucide-react";
export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 2000);
  };
  return <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-primary/30 rotate-45 animate-neon-pulse" />
      <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-accent/30 rotate-12 animate-neon-pulse" style={{
      animationDelay: '1s'
    }} />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
              EXCLUSIVE ACCESS
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-tech font-black mb-6">
              <span className="text-foreground">VENHAM FAZER PARTE DA                                                                                                                                                                                                                                                                                                                                                                                              </span>
              <br />
              <span className="text-primary">DYSTOPIA</span>
            </h2>
            
            <p className="text-lg text-muted-foreground font-mono leading-relaxed">
              Seja o primeiro a saber sobre <span className="text-accent">drops exclusivos</span>, 
              <span className="text-primary"> lançamentos antecipados</span> e 
              <span className="text-destructive"> ofertas especiais</span> da nossa comunidade underground.
            </p>
          </div>

          {/* Form */}
          {!isSubscribed ? <form onSubmit={handleSubscribe} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-12 h-14 text-lg bg-card/50 border-border focus:border-primary font-mono" required />
              </div>
              
              <Button type="submit" size="lg" className="w-full h-14 text-lg font-tech font-bold cyber-button" disabled={isLoading}>
                {isLoading ? <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    <span>CONECTANDO...</span>
                  </div> : "ENTER THE DYSTOPIA"}
              </Button>
              
              <p className="text-xs text-muted-foreground font-mono">
                Ao se inscrever, você concorda em receber comunicações da DYSTOPIA. 
                Você pode cancelar a qualquer momento.
              </p>
            </form> : <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3 text-accent">
                <div className="w-12 h-12 bg-accent/20 border border-accent rounded-full flex items-center justify-center">
                  <Check className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-tech font-bold text-xl">BEM-VINDO À DYSTOPIA</h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    Você agora faz parte da comunidade underground
                  </p>
                </div>
              </div>
              
              <div className="bg-card/50 border border-accent/30 rounded-lg p-6">
                <p className="text-sm text-muted-foreground font-mono mb-4">
                  Próximos benefícios que você receberá:
                </p>
                <div className="space-y-2 text-left">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-sm font-mono">Acesso antecipado aos drops</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm font-mono">Descontos exclusivos de até 30%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-destructive rounded-full" />
                    <span className="text-sm font-mono">Conteúdo behind-the-scenes</span>
                  </div>
                </div>
              </div>
            </div>}

          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm font-mono text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-neon-pulse" />
              <span>12.5K+ SUBSCRIBERS</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-neon-pulse" />
              <span>ZERO SPAM</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};