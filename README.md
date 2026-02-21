# Rodilar - E-commerce de Produtos Plásticos

Sistema de e-commerce desenvolvido com React, TypeScript, Vite e Firebase, com painel administrativo completo e integração com WhatsApp para finalização de pedidos.

## 🚀 Tecnologias

- React 18
- TypeScript
- Vite
- Firebase (Firestore + Authentication)
- Tailwind CSS
- Shadcn/ui
- React Router DOM
- Sonner (Toast notifications)

## 📦 Funcionalidades

### Loja (Público)
- ✅ Catálogo de produtos com filtros por categoria
- ✅ Busca de produtos
- ✅ Carrinho de compras persistente (Firebase)
- ✅ Produtos em destaque
- ✅ Design responsivo
- ✅ Persistência de dados na nuvem
- ✅ Sincronização em tempo real
- ✅ Checkout com integração WhatsApp
- ✅ Múltiplas formas de pagamento (PIX, Boleto)
- ✅ Catálogos em PDF

### Admin (Protegido)
- ✅ Sistema de autenticação com Firebase
- ✅ Painel administrativo completo
- ✅ CRUD de produtos (Criar, Ler, Atualizar, Deletar)
- ✅ Interface intuitiva com modal
- ✅ Controle de acesso por usuário
- ✅ Proteção de rotas

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📱 Contato WhatsApp

O sistema está configurado para enviar pedidos via WhatsApp para:
- Número: +55 51 9215-5747
- Integração automática no checkout
- Botão de contato no header e footer

## 🔐 Configuração do Admin

### 1. Ativar Firebase Authentication
1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Selecione o projeto "rodilar"
3. Vá em Authentication > Get Started
4. Ative o método "Email/Password"

### 2. Criar Usuário Admin
1. Authentication > Users > Add user
2. Email: `gabrielcalorindo@gmail.com`
3. Password: `admin123`
4. Copie o UID do usuário criado

### 3. Dar Permissão de Acesso
```javascript
// No console do navegador (F12)
createAdminUser('COLE_O_UID_AQUI')
```

### 4. Fazer Login
1. Acesse: `http://localhost:5173/login`
2. Email: `gabrielcalorindo@gmail.com`
3. Senha: `admin123`

**Veja o guia completo em:** [SETUP_ADMIN.md](SETUP_ADMIN.md)

## 📚 Documentação

### Geral
- **[README.md](README.md)** - Este arquivo
- **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** - Documentação técnica da migração Firebase
- **[GUIA_RAPIDO.md](GUIA_RAPIDO.md)** - Guia rápido de uso

### Admin
- **[SETUP_ADMIN.md](SETUP_ADMIN.md)** - Configuração do sistema admin
- **[AUTENTICACAO_ADMIN.md](AUTENTICACAO_ADMIN.md)** - Documentação completa de autenticação
- **[GUIA_VISUAL_ADMIN.md](GUIA_VISUAL_ADMIN.md)** - Guia visual do painel admin

### Avançado
- **[EXEMPLOS_EXPANSAO.md](EXEMPLOS_EXPANSAO.md)** - Exemplos de como expandir o sistema
- **[CHECKLIST_DEPLOY.md](CHECKLIST_DEPLOY.md)** - Checklist completo para deploy
- **[RESUMO_MIGRACAO.md](RESUMO_MIGRACAO.md)** - Resumo da migração Firebase

## 🎯 Estrutura do Projeto

```
src/
├── components/        # Componentes React
│   ├── ui/           # Componentes UI (shadcn)
│   ├── ProtectedRoute.tsx
│   └── ...
├── context/          # Contextos React
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── ProductContext.tsx
├── services/         # Serviços Firebase
│   ├── authService.ts
│   ├── productService.ts
│   └── cartService.ts
├── lib/             # Configurações
│   └── firebase.ts  # Config do Firebase
├── pages/           # Páginas da aplicação
│   ├── Login.tsx
│   ├── Admin.tsx
│   └── ...
├── types/           # Tipos TypeScript
│   ├── user.ts
│   └── product.ts
├── utils/           # Utilitários
│   └── adminHelpers.ts
└── scripts/         # Scripts auxiliares
    ├── seedProducts.ts
    └── createAdminUser.ts
```

## 🔐 Firebase

O projeto utiliza Firebase para:
- **Firestore**: Banco de dados (produtos, carrinhos, usuários)
- **Authentication**: Autenticação de usuários admin

### Coleções do Firestore

#### products
```javascript
{
  id: string,
  name: string,
  description: string,
  price: number,
  image: string,
  category: string,
  inStock: boolean
}
```

#### carts
```javascript
{
  items: CartItem[],
  updatedAt: string
}
```

#### users
```javascript
{
  email: string,
  access: boolean,
  createdAt: string
}
```

## 🛠️ Gerenciamento de Produtos

### Via Painel Admin (Recomendado)
1. Acesse `/login`
2. Faça login com credenciais admin
3. Use a interface gráfica para gerenciar produtos

### Via Console do Navegador (Desenvolvimento)
```javascript
// Listar produtos
adminHelpers.listProducts()

// Adicionar produto
adminHelpers.addProduct({ 
  id: '9', 
  name: 'Produto', 
  description: 'Descrição',
  price: 29.90,
  category: 'Categoria',
  image: '/placeholder.svg',
  inStock: true
})

// Atualizar preço
adminHelpers.updateProduct('1', { price: 19.90 })

// Deletar produto
adminHelpers.deleteProduct('9')
```

## 📱 Páginas

### Públicas
- `/` - Home com produtos em destaque
- `/produtos` - Catálogo completo com filtros
- `/carrinho` - Carrinho de compras
- `/checkout` - Finalização de compra
- `/login` - Login administrativo

### Protegidas (Requer Autenticação)
- `/admin` - Painel administrativo

## 🎨 Temas e Estilos

O projeto usa Tailwind CSS com tema customizado:
- Primary: Azul Grêmio (#0066CC)
- Accent: Amarelo (#FFD700)
- Design responsivo e moderno
- Animações suaves
- Feedback visual com toasts

## 🚀 Deploy

Veja o [CHECKLIST_DEPLOY.md](CHECKLIST_DEPLOY.md) para instruções completas.

### Deploy Rápido (Firebase Hosting)

```bash
# Build
npm run build

# Deploy
firebase deploy --only hosting
```

### Configurar Regras de Segurança

Antes do deploy, configure as regras no Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.access == true;
    }
    
    match /carts/{userId} {
      allow read, write: if true;
    }
    
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false;
    }
  }
}
```

## 📈 Próximas Melhorias

### Curto Prazo
- [ ] Upload de imagens para Firebase Storage
- [ ] Recuperação de senha
- [ ] Múltiplas imagens por produto

### Médio Prazo
- [ ] Sistema de pedidos
- [ ] Histórico de compras
- [ ] Dashboard com estatísticas
- [ ] Integração com pagamento

### Longo Prazo
- [ ] App mobile (React Native)
- [ ] Sistema de avaliações
- [ ] Chat de suporte
- [ ] Programa de fidelidade

Veja mais em [EXEMPLOS_EXPANSAO.md](EXEMPLOS_EXPANSAO.md)

## 🔑 Credenciais de Acesso

### Admin Padrão
- Email: `gabrielcalorindo@gmail.com`
- Senha: `admin123`
- Acesso: `/admin`

**⚠️ IMPORTANTE:** Altere a senha após o primeiro acesso em produção!

## 📄 Licença

Projeto PlásticosPro - Todos os direitos reservados.

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas e suporte:
- WhatsApp: +55 51 9215-5747
- Consulte a documentação nos arquivos .md
- Abra uma issue no repositório

## 🎯 Status do Projeto

✅ Sistema de e-commerce funcional  
✅ Integração com Firebase completa  
✅ Painel administrativo implementado  
✅ Sistema de autenticação ativo  
✅ Integração WhatsApp para pedidos  
✅ Sistema de catálogos PDF  
✅ Documentação completa  
🚀 Pronto para deploy!

---

Desenvolvido com ❤️ para PlásticosPro
