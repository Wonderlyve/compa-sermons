
// Mock category data
export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: "amour",
    name: "Amour",
    description: "Prédications sur l'amour de Dieu et l'amour du prochain.",
    imageUrl: "https://images.unsplash.com/photo-1518826778770-a9a28dac0769?auto=format&fit=crop&q=80&w=800",
    count: 2
  },
  {
    id: "saintete",
    name: "Sainteté",
    description: "Prédications sur la vie sainte et la sanctification.",
    imageUrl: "https://images.unsplash.com/photo-1507692812060-98338d07aca3?auto=format&fit=crop&q=80&w=800",
    count: 2
  },
  {
    id: "equilibre",
    name: "Équilibre",
    description: "Prédications sur l'équilibre dans la vie chrétienne.",
    imageUrl: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?auto=format&fit=crop&q=80&w=800",
    count: 2
  },
  {
    id: "puissance",
    name: "Puissance",
    description: "Prédications sur la puissance de Dieu.",
    imageUrl: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&q=80&w=800",
    count: 2
  },
  {
    id: "developpement",
    name: "Développement",
    description: "Prédications sur le développement personnel et spirituel.",
    imageUrl: "https://images.unsplash.com/photo-1542082873-c1d89489ed99?auto=format&fit=crop&q=80&w=800",
    count: 2
  },
  {
    id: "mentalite",
    name: "Changement de Mentalité",
    description: "Prédications sur le renouvellement de l'esprit et de la pensée.",
    imageUrl: "https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?auto=format&fit=crop&q=80&w=800",
    count: 2
  }
];
