import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dystopiaLogo from "@/assets/logo.svg";

interface NavHeaderProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
}

export const NavHeader = ({ cartItemsCount = 0, onCartClick }: NavHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Streetwear", href: "/streetwear" },
    { label: "Limited Drops", href: "/drops" },
    { label: "Acessórios", href: "/accessories" },
    { label: "Lookbook", href: "#lookbook" },
  ];

  return (
    <header className={`fixed z-50 transition-all duration-500 ease-out ${
      isScrolled 
        ? "top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl" 
        : "top-0 left-0 right-0 w-full"
    }`}>
      <nav className={`transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border border-border/50 rounded-full shadow-[0_8px_32px_hsl(var(--primary)/0.15)]"
          : "bg-background/80 backdrop-blur-md border-b border-border"
      } px-4 lg:px-8 ${isScrolled ? "px-6 lg:px-8" : ""}`}>
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "h-14" : "h-16"
        }`}>
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="transition-transform duration-300 hover:scale-105">
              <img 
                src={dystopiaLogo} 
                alt="Dystopia" 
                className={`w-auto transition-all duration-500 ${
                  isScrolled ? "h-6" : "h-8"
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center transition-all duration-500 ${
            isScrolled ? "space-x-6" : "space-x-8"
          }`}>
            {navItems.map((item) => (
              item.href.startsWith("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.href 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Actions */}
          <div className={`flex items-center transition-all duration-500 ${
            isScrolled ? "space-x-2" : "space-x-4"
          }`}>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-md">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                item.href.startsWith("#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-base font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`block text-base font-medium transition-colors ${
                      location.pathname === item.href 
                        ? "text-primary" 
                        : "text-foreground hover:text-primary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};