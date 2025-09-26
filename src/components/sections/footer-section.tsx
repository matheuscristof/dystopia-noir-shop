import { Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import dystopiaLogo from "@/assets/dystopia-logo.png";

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "SHOP",
      links: [
        { label: "Streetwear", href: "#streetwear" },
        { label: "Limited Drops", href: "#drops" },
        { label: "Acessórios", href: "#accessories" },
        { label: "Sale", href: "#sale" },
      ]
    },
    {
      title: "SUPORTE",
      links: [
        { label: "Central de Ajuda", href: "#help" },
        { label: "Sizing Guide", href: "#sizing" },
        { label: "Shipping Info", href: "#shipping" },
        { label: "Returns", href: "#returns" },
      ]
    },
    {
      title: "EMPRESA",
      links: [
        { label: "About Dystopia", href: "#about" },
        { label: "Careers", href: "#careers" },
        { label: "Press", href: "#press" },
        { label: "Stores", href: "#stores" },
      ]
    },
    {
      title: "LEGAL",
      links: [
        { label: "Política de Privacidade", href: "#privacy" },
        { label: "Termos de Uso", href: "#terms" },
        { label: "Cookies", href: "#cookies" },
        { label: "Acessibilidade", href: "#accessibility" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative bg-card border-t border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 tech-grid opacity-5" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <img 
                  src={dystopiaLogo}
                  alt="Dystopia"
                  className="h-12 w-auto mb-4"
                />
                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                  Premium streetwear que conecta o futuro distópico com a autenticidade urbana. 
                  Desde 2000, quebrando padrões e definindo tendências.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-mono">São Paulo, SP - Brasil</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="font-mono">(98) 715-0710</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="font-mono">hello@dystopia2000.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    className="bg-background/50 border-border hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-tech font-bold text-sm text-foreground tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground font-mono">
              <span>© {currentYear} DYSTOPIA 2000. Todos os direitos reservados.</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground font-mono">
                <div className="w-2 h-2 bg-accent rounded-full animate-neon-pulse" />
                <span>SECURE CHECKOUT</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground font-mono">
                <div className="w-2 h-2 bg-primary rounded-full animate-neon-pulse" />
                <span>FREE SHIPPING 200+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Indicator */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Button
            variant="outline"
            size="icon"
            className="bg-background border-primary hover:bg-primary hover:text-primary-foreground rounded-full"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-xs font-tech">↑</span>
          </Button>
        </div>
      </div>
    </footer>
  );
};