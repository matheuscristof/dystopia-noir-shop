import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";
import lookbook4 from "@/assets/lookbook-4.jpg";
const lookbookImages = [{
  id: 1,
  src: lookbook1,
  alt: "Tech Hoodie Collection",
  title: "TECH HOODIE",
  subtitle: "Future Essential"
}, {
  id: 2,
  src: lookbook2,
  alt: "Neon Accent Series",
  title: "NEON SERIES",
  subtitle: "Electric Vibes"
}, {
  id: 3,
  src: lookbook3,
  alt: "Urban Tech Jacket",
  title: "CYBER JACKET",
  subtitle: "Street Authority"
}, {
  id: 4,
  src: lookbook4,
  alt: "Complete Tech Look",
  title: "FULL TECH",
  subtitle: "Dystopian Style"
}];
export const LookbookSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };
  return <section id="lookbook" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      
      
      

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>;
};