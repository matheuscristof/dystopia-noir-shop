import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import dystopiaLogo from "@/assets/logo.svg";
export const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Dystopia Collection" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 tech-grid" />

      {/* Glitch Scan Effect */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-accent to-transparent opacity-30 animate-cyber-scan" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl">
          {/* Logo */}
          <div className="mb-8 animate-slide-up">
            <img src={dystopiaLogo} alt="Dystopia 2000" className="h-16 md:h-20 w-auto" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-tech font-black mb-6 animate-slide-up" style={{
          animationDelay: '0.2s'
        }}>
            <span className="block text-foreground">
              FUTURE
            </span>
            <span className="block text-primary">
              IS NOW
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono animate-slide-up" style={{
          animationDelay: '0.4s'
        }}>
            Streetwear que conecta o{" "}
            <span className="text-accent">futuro dystopico</span> com a{" "}
            <span className="text-primary">melhor qualidade do mercado</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{
          animationDelay: '0.6s'
        }}>
            <Button size="lg" className="cyber-button text-lg px-8 py-6 font-bold" onClick={() => document.getElementById('collections')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              Compre AGORA
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 font-mono border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => document.getElementById('about')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              ENTRAR NA DYSTOPIA
            </Button>
          </div>

          {/* Tech Details */}
          <div className="mt-12 flex items-center space-x-6 text-sm font-mono text-muted-foreground animate-slide-up" style={{
          animationDelay: '0.8s'
        }}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-neon-pulse" />
              <span>DROPS LIMITADOS  </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-neon-pulse" />
              <span>QUALIDADE PREMIUM </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-neon-red rounded-full animate-neon-pulse" />
              <span>AUTÊNTICO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5" />
    </section>;
};