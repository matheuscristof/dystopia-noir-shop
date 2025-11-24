export const AboutSection = () => {
  return <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-tech" />
      <div className="absolute inset-0 tech-grid opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rotate-45 animate-neon-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-accent/20 rotate-12 animate-neon-pulse" style={{
      animationDelay: '1s'
    }} />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-tech font-black mb-8">
              <span className="text-foreground">
                ABOUT
              </span>
              <br />
              <span className="text-primary">
                DYSTOPIA
              </span>
            </h2>
          </div>

          {/* Philosophy Content */}
          <div className="space-y-8 text-lg md:text-xl leading-relaxed">
            <p className="font-mono text-muted-foreground">
              No ano <span className="text-accent font-bold">2000</span>, nasceu uma visão que transcende o tempo.
            </p>
            
            <p className="text-foreground font-medium">
              <span className="text-primary font-tech font-bold">DYSTOPIA</span> não é apenas uma marca de streetwear. 
              É um manifesto contra a conformidade, uma rebelião contra o comum, 
              uma ponte entre o <span className="text-accent">futuro distópico</span> que imaginamos 
              e a <span className="text-primary">autenticidade urbana</span> que vivemos.
            </p>

            <div className="grid md:grid-cols-3 gap-8 my-16">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/20 border border-primary rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-primary font-tech font-bold text-xl">R</span>
                </div>
                <h3 className="font-tech font-bold text-xl text-primary">REBELDIA</h3>
                <p className="text-sm text-muted-foreground font-mono">
                  Quebramos padrões, desafiamos normas, criamos o novo.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/20 border border-accent rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-accent font-tech font-bold text-xl">F</span>
                </div>
                <h3 className="font-tech font-bold text-xl text-accent">FUTURO</h3>
                <p className="text-sm text-muted-foreground font-mono">
                  Antecipamos tendências, moldamos o amanhã.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-destructive/20 border border-destructive rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-destructive font-tech font-bold text-xl">A</span>
                </div>
                <h3 className="font-tech font-bold text-xl text-destructive">AUTENTICIDADE</h3>
                <p className="text-sm text-muted-foreground font-mono">
                  Cada peça conta uma história, cada design tem propósito.
                </p>
              </div>
            </div>

            <p className="text-foreground font-medium border-l-4 border-primary pl-6 text-left max-w-3xl mx-auto">
              "Em um mundo padronizado, escolhemos ser únicos. 
              Em uma realidade previsível, criamos o inesperado. 
              Esta é a essência da <span className="text-primary font-tech font-bold">DYSTOPIA</span> - 
              onde cada peça é um fragmento do futuro que construímos juntos."
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <div className="flex items-center space-x-2 bg-card/50 px-4 py-2 rounded-lg border border-border">
                <div className="w-2 h-2 bg-primary rounded-full animate-neon-pulse" />
                <span className="text-sm font-mono text-muted-foreground">EST. 2000</span>
              </div>
              <div className="flex items-center space-x-2 bg-card/50 px-4 py-2 rounded-lg border border-border">
                <div className="w-2 h-2 bg-accent rounded-full animate-neon-pulse" />
                <span className="text-sm font-mono text-muted-foreground">TECH INSPIRED</span>
              </div>
              <div className="flex items-center space-x-2 bg-card/50 px-4 py-2 rounded-lg border border-border">
                <div className="w-2 h-2 bg-destructive rounded-full animate-neon-pulse" />
                <span className="text-sm font-mono text-muted-foreground">QUALIDADE PREMIUM  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};