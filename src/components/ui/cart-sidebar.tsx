import { useState } from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartSidebar = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}: CartSidebarProps) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const selectedTotal = items
    .filter(item => selectedItems.has(`${item.id}-${item.size}-${item.color}`))
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const selectedCount = items
    .filter(item => selectedItems.has(`${item.id}-${item.size}-${item.color}`))
    .reduce((sum, item) => sum + item.quantity, 0);

  const toggleItemSelection = (itemKey: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemKey)) {
        newSet.delete(itemKey);
      } else {
        newSet.add(itemKey);
      }
      return newSet;
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Carrinho</h2>
              {totalItems > 0 && (
                <Badge variant="secondary">{totalItems}</Badge>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Carrinho vazio</h3>
                <p className="text-muted-foreground mb-4">
                  Adicione alguns produtos para começar
                </p>
                <Button onClick={onClose} className="cyber-button">
                  Continuar comprando
                </Button>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {items.map((item) => {
                  const itemKey = `${item.id}-${item.size}-${item.color}`;
                  return (
                  <div key={itemKey} className="flex space-x-3">
                    <Checkbox
                      checked={selectedItems.has(itemKey)}
                      onCheckedChange={() => toggleItemSelection(itemKey)}
                      className="mt-1"
                    />
                    <div className="flex-shrink-0 w-20 h-20 bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.size} • {item.color}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-destructive hover:text-destructive h-auto p-0"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            Remover
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              <Separator />
              
              {selectedCount > 0 && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Itens selecionados ({selectedCount})</span>
                    <span className="font-medium text-foreground">
                      R$ {selectedTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total do Carrinho</span>
                <span className="text-lg font-bold text-primary">
                  R$ {total.toFixed(2)}
                </span>
              </div>
              
              <div className="space-y-2">
                <Button 
                  className="w-full cyber-button" 
                  size="lg"
                  disabled={selectedCount === 0}
                >
                  {selectedCount > 0 
                    ? `Comprar (${selectedCount} ${selectedCount === 1 ? 'item' : 'itens'})` 
                    : 'Selecione itens para comprar'}
                </Button>
                <Button variant="outline" className="w-full" onClick={onClose}>
                  Continuar Comprando
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};