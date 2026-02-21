import { productService } from '@/services/productService';
import { Product } from '@/types/product';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Balde Plástico 10L',
    description: 'Balde resistente em polipropileno de alta qualidade, ideal para uso doméstico e industrial.',
    price: 15.90,
    image: '/placeholder.svg',
    category: 'Baldes',
    inStock: true,
  },
  {
    id: '2',
    name: 'Caixa Organizadora 30L',
    description: 'Caixa organizadora transparente com tampa, perfeita para armazenamento.',
    price: 45.90,
    image: '/placeholder.svg',
    category: 'Organizadores',
    inStock: true,
  },
  {
    id: '3',
    name: 'Lixeira 50L com Pedal',
    description: 'Lixeira com pedal em plástico resistente, sistema de abertura suave.',
    price: 89.90,
    image: '/placeholder.svg',
    category: 'Lixeiras',
    inStock: true,
  },
  {
    id: '4',
    name: 'Kit Potes Herméticos',
    description: 'Conjunto com 5 potes herméticos de diferentes tamanhos para conservação de alimentos.',
    price: 59.90,
    image: '/placeholder.svg',
    category: 'Potes',
    inStock: true,
  },
  {
    id: '5',
    name: 'Garrafa Térmica 1L',
    description: 'Garrafa térmica em plástico com interior em vidro, mantém a temperatura por horas.',
    price: 35.90,
    image: '/placeholder.svg',
    category: 'Garrafas',
    inStock: true,
  },
  {
    id: '6',
    name: 'Escorredor de Louça',
    description: 'Escorredor de louça em plástico resistente com bandeja coletora.',
    price: 42.90,
    image: '/placeholder.svg',
    category: 'Cozinha',
    inStock: true,
  },
  {
    id: '7',
    name: 'Cesto de Roupa 60L',
    description: 'Cesto para roupa suja com tampa, design moderno e ventilado.',
    price: 65.90,
    image: '/placeholder.svg',
    category: 'Lavanderia',
    inStock: true,
  },
  {
    id: '8',
    name: 'Jogo de Bacias 3 Peças',
    description: 'Conjunto de bacias em 3 tamanhos diferentes, ideais para diversas utilidades.',
    price: 28.90,
    image: '/placeholder.svg',
    category: 'Bacias',
    inStock: true,
  },
];

export async function seedProducts() {
  console.log('Iniciando população do banco de dados...');
  
  try {
    for (const product of initialProducts) {
      await productService.save(product);
      console.log(`Produto ${product.name} salvo com sucesso!`);
    }
    console.log('Todos os produtos foram salvos no Firebase!');
  } catch (error) {
    console.error('Erro ao popular produtos:', error);
    throw error;
  }
}
