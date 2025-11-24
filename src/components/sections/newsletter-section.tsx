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
              <span className="text-foreground">VENHAM FAZER PARTE DA </span>
              <span className="text-primary neon-text">DYSTOPIA</span>
            </h2>
            
            <p className="text-muted-foreground font-mono text-lg leading-relaxed">
              Receba acesso antecipado a novos drops, promoções exclusivas e conteúdo por trás das câmeras.
            </p>
          </div>

          {/* Form */}
          {!isSubscribed ? <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input type="email" placeholder="Digite seu melhor email" value={email} onChange={e => setEmail(e.target.value)} className="pl-12 h-14 bg-background/50 border-border font-mono text-base focus:border-primary transition-colors" required />
                </div>
                <Button type="submit" size="lg" disabled={isLoading} className="h-14 px-8 cyber-button font-tech tracking-wider">
                  {isLoading ? <span className="flex items-center">
                      <span className="animate-pulse">PROCESSING</span>
                    </span> : "INSCREVER"}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground font-mono">
                Garantimos a privacidade dos seus dados. Sem spam. Apenas as melhores novidades.
              </p>
            </form> : <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-center space-x-3 p-6 bg-primary/10 border border-primary/30 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-tech text-lg font-bold text-foreground">
                    BEM-VINDO À DYSTOPIA!
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    Confira seu email para confirmar a inscrição
                  </p>
                </div>
              </div>
            </div>}

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-neon-pulse" />
                <span className="text-muted-foreground font-mono">+5K INSCRITOS</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-neon-pulse" style={{
                animationDelay: '0.5s'
              }} />
                <span className="text-muted-foreground font-mono">DROPS SEMANAIS</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-neon-pulse" style={{
                animationDelay: '1s'
              }} />
                <span className="text-muted-foreground font-mono">CONTEÚDO EXCLUSIVO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};