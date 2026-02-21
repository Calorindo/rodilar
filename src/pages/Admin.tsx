import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import { productService } from '@/services/productService';
import { userService } from '@/services/userService';
import { catalogService } from '@/services/catalogService';
import { settingsService } from '@/services/settingsService';
import { Product } from '@/types/product';
import { UserData } from '@/types/user';
import { Catalog } from '@/types/catalog';
import { Settings } from '@/types/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { LogOut, Plus, Edit, Trash2, Package, Users, Shield, ShieldOff, BookOpen, Settings as SettingsIcon, MessageCircle } from 'lucide-react';

export default function Admin() {
  const { user, hasAccess, logout, loading: authLoading } = useAuth();
  const { products, refreshProducts, isLoading: productsLoading } = useProducts();
  const navigate = useNavigate();
  
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isCatalogDialogOpen, setIsCatalogDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCatalog, setEditingCatalog] = useState<Catalog | null>(null);
  const [users, setUsers] = useState<(UserData & { uid: string })[]>([]);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCatalogs, setLoadingCatalogs] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  
  const [productFormData, setProductFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    image: '/placeholder.svg',
    category: '',
    inStock: true,
  });

  const [userFormData, setUserFormData] = useState({
    email: '',
    password: '',
    access: true,
  });

  const [catalogFormData, setCatalogFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (!authLoading && (!user || !hasAccess)) {
      navigate('/login');
    }
  }, [user, hasAccess, authLoading, navigate]);

  useEffect(() => {
    loadUsers();
    loadCatalogs();
    loadSettings();
  }, []);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const usersData = await userService.getAll();
      setUsers(usersData);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadCatalogs = async () => {
    try {
      setLoadingCatalogs(true);
      const catalogsData = await catalogService.getAll();
      setCatalogs(catalogsData);
    } catch (error) {
      console.error('Erro ao carregar catálogos:', error);
      toast.error('Erro ao carregar catálogos');
    } finally {
      setLoadingCatalogs(false);
    }
  };

  const loadSettings = async () => {
    try {
      setLoadingSettings(true);
      const settingsData = await settingsService.getSettings();
      setSettings(settingsData);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      toast.error('Erro ao carregar configurações');
    } finally {
      setLoadingSettings(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleOpenProductDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductFormData(product);
    } else {
      setEditingProduct(null);
      setProductFormData({
        name: '',
        description: '',
        price: 0,
        image: '/placeholder.svg',
        category: '',
        inStock: true,
      });
    }
    setIsProductDialogOpen(true);
  };

  const handleOpenUserDialog = () => {
    setUserFormData({
      email: '',
      password: '',
      access: true,
    });
    setIsUserDialogOpen(true);
  };

  const handleOpenCatalogDialog = (catalog?: Catalog) => {
    if (catalog) {
      setEditingCatalog(catalog);
      setCatalogFormData({
        name: catalog.name,
        description: catalog.description,
      });
      setSelectedProducts(catalog.productIds || []);
    } else {
      setEditingCatalog(null);
      setCatalogFormData({
        name: '',
        description: '',
      });
      setSelectedProducts([]);
    }
    setIsCatalogDialogOpen(true);
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const productData: Product = {
        id: editingProduct?.id || `${Date.now()}`,
        name: productFormData.name!,
        description: productFormData.description!,
        price: Number(productFormData.price),
        image: productFormData.image!,
        category: productFormData.category!,
        inStock: productFormData.inStock!,
      };

      await productService.save(productData);
      await refreshProducts();
      
      toast.success(editingProduct ? 'Produto atualizado!' : 'Produto criado!');
      setIsProductDialogOpen(false);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      toast.error('Erro ao salvar produto');
    }
  };

  const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await userService.create(
        userFormData.email,
        userFormData.password,
        userFormData.access
      );
      
      await loadUsers();
      toast.success('Usuário criado com sucesso!');
      setIsUserDialogOpen(false);
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Este email já está em uso');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Senha muito fraca (mínimo 6 caracteres)');
      } else {
        toast.error('Erro ao criar usuário');
      }
    }
  };

  const handleSubmitCatalog = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const catalogData: Catalog = {
        id: editingCatalog?.id || `catalog_${Date.now()}`,
        name: catalogFormData.name,
        description: catalogFormData.description,
        productIds: selectedProducts,
        createdAt: editingCatalog?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await catalogService.save(catalogData);
      await loadCatalogs();
      
      toast.success(editingCatalog ? 'Catálogo atualizado!' : 'Catálogo criado!');
      setIsCatalogDialogOpen(false);
    } catch (error) {
      console.error('Erro ao salvar catálogo:', error);
      toast.error('Erro ao salvar catálogo');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    
    try {
      await productService.delete(productId);
      await refreshProducts();
      toast.success('Produto deletado!');
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      toast.error('Erro ao deletar produto');
    }
  };

  const handleToggleUserAccess = async (uid: string, currentAccess: boolean) => {
    try {
      await userService.updateAccess(uid, !currentAccess);
      await loadUsers();
      toast.success(`Acesso ${!currentAccess ? 'concedido' : 'revogado'}!`);
    } catch (error) {
      console.error('Erro ao atualizar acesso:', error);
      toast.error('Erro ao atualizar acesso');
    }
  };

  const handleDeleteUser = async (uid: string, email: string) => {
    if (uid === user?.uid) {
      toast.error('Você não pode deletar seu próprio usuário!');
      return;
    }

    if (!confirm(`Tem certeza que deseja deletar o usuário ${email}?`)) return;
    
    try {
      await userService.delete(uid);
      await loadUsers();
      toast.success('Usuário deletado!');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      toast.error('Erro ao deletar usuário');
    }
  };

  const handleDeleteCatalog = async (catalogId: string, catalogName: string) => {
    if (!confirm(`Tem certeza que deseja deletar o catálogo "${catalogName}"?`)) return;
    
    try {
      await catalogService.delete(catalogId);
      await loadCatalogs();
      toast.success('Catálogo deletado!');
    } catch (error) {
      console.error('Erro ao deletar catálogo:', error);
      toast.error('Erro ao deletar catálogo');
    }
  };

  const handleToggleProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!settings) return;
    
    try {
      // Limpar o número removendo espaços, hífens e parênteses
      const cleanNumber = settings.whatsappNumber.replace(/[\s\-\(\)]/g, '');
      
      // Validar se contém apenas números
      if (!/^\d+$/.test(cleanNumber)) {
        toast.error('O número deve conter apenas dígitos');
        return;
      }
      
      // Validar tamanho mínimo (código país + DDD + número)
      if (cleanNumber.length < 12) {
        toast.error('Número muito curto. Use o formato: 5551999999999');
        return;
      }
      
      await settingsService.updateSettings({
        whatsappNumber: cleanNumber,
      });
      
      // Atualizar o estado com o número limpo
      setSettings(prev => prev ? { ...prev, whatsappNumber: cleanNumber } : null);
      
      toast.success('Configurações atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      toast.error('Erro ao atualizar configurações');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!user || !hasAccess) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              Ver Loja
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content with Tabs */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-4 mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="catalogs" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Catálogos
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">Produtos</h2>
                <p className="text-muted-foreground mt-1">
                  {products.length} produto(s) cadastrado(s)
                </p>
              </div>
              
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleOpenProductDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmitProduct} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome do Produto</Label>
                      <Input
                        id="name"
                        value={productFormData.name}
                        onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={productFormData.description}
                        onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Preço (R$)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={productFormData.price}
                          onChange={(e) => setProductFormData({ ...productFormData, price: parseFloat(e.target.value) })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Select
                          value={productFormData.category}
                          onValueChange={(value) => setProductFormData({ ...productFormData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Baldes">Baldes</SelectItem>
                            <SelectItem value="Organizadores">Organizadores</SelectItem>
                            <SelectItem value="Lixeiras">Lixeiras</SelectItem>
                            <SelectItem value="Potes">Potes</SelectItem>
                            <SelectItem value="Garrafas">Garrafas</SelectItem>
                            <SelectItem value="Cozinha">Cozinha</SelectItem>
                            <SelectItem value="Lavanderia">Lavanderia</SelectItem>
                            <SelectItem value="Bacias">Bacias</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">URL da Imagem</Label>
                      <Input
                        id="image"
                        value={productFormData.image}
                        onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                        placeholder="/placeholder.svg"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={productFormData.inStock}
                        onChange={(e) => setProductFormData({ ...productFormData, inStock: e.target.checked })}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="inStock" className="cursor-pointer">
                        Produto em estoque
                      </Label>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1">
                        {editingProduct ? 'Atualizar' : 'Criar'} Produto
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsProductDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Products List */}
            {productsLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Carregando produtos...</p>
              </div>
            ) : products.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Nenhum produto cadastrado</p>
                  <Button onClick={() => handleOpenProductDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Cadastrar Primeiro Produto
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {product.category}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenProductDialog(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            product.inStock
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {product.inStock ? 'Em estoque' : 'Fora de estoque'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Catalogs Tab */}
          <TabsContent value="catalogs" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">Catálogos</h2>
                <p className="text-muted-foreground mt-1">
                  {catalogs.length} catálogo(s) cadastrado(s)
                </p>
              </div>
              
              <Dialog open={isCatalogDialogOpen} onOpenChange={setIsCatalogDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleOpenCatalogDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Catálogo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingCatalog ? 'Editar Catálogo' : 'Novo Catálogo'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmitCatalog} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="catalogName">Nome do Catálogo</Label>
                      <Input
                        id="catalogName"
                        value={catalogFormData.name}
                        onChange={(e) => setCatalogFormData({ ...catalogFormData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="catalogDescription">Descrição</Label>
                      <Textarea
                        id="catalogDescription"
                        value={catalogFormData.description}
                        onChange={(e) => setCatalogFormData({ ...catalogFormData, description: e.target.value })}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Produtos do Catálogo</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Selecione os produtos que farão parte deste catálogo
                      </p>
                      
                      {products.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4 text-center border rounded-lg">
                          Nenhum produto cadastrado. Cadastre produtos primeiro.
                        </p>
                      ) : (
                        <div className="border rounded-lg p-4 max-h-96 overflow-y-auto space-y-2">
                          {products.map((product) => (
                            <div key={product.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded">
                              <Checkbox
                                id={`product-${product.id}`}
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => handleToggleProduct(product.id)}
                              />
                              <Label
                                htmlFor={`product-${product.id}`}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">{product.category}</p>
                                  </div>
                                  <span className="text-sm font-semibold text-primary">
                                    R$ {product.price.toFixed(2)}
                                  </span>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-sm text-muted-foreground mt-2">
                        {selectedProducts.length} produto(s) selecionado(s)
                      </p>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1">
                        {editingCatalog ? 'Atualizar' : 'Criar'} Catálogo
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCatalogDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Catalogs List */}
            {loadingCatalogs ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Carregando catálogos...</p>
              </div>
            ) : catalogs.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Nenhum catálogo cadastrado</p>
                  <Button onClick={() => handleOpenCatalogDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Cadastrar Primeiro Catálogo
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {catalogs.map((catalog) => {
                  const catalogProducts = products.filter(p => catalog.productIds.includes(p.id));
                  
                  return (
                    <Card key={catalog.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-primary" />
                              {catalog.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {catalog.productIds.length} produto(s)
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleOpenCatalogDialog(catalog)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteCatalog(catalog.id, catalog.name)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          {catalog.description}
                        </p>
                        
                        {catalogProducts.length > 0 ? (
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">
                              Produtos:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {catalogProducts.slice(0, 5).map((product) => (
                                <span
                                  key={product.id}
                                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                                >
                                  {product.name}
                                </span>
                              ))}
                              {catalogProducts.length > 5 && (
                                <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                                  +{catalogProducts.length - 5} mais
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            Nenhum produto vinculado
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">Usuários</h2>
                <p className="text-muted-foreground mt-1">
                  {users.length} usuário(s) cadastrado(s)
                </p>
              </div>
              
              <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleOpenUserDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Novo Usuário</DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmitUser} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userFormData.email}
                        onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        value={userFormData.password}
                        onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                        required
                        minLength={6}
                      />
                      <p className="text-xs text-muted-foreground">Mínimo 6 caracteres</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="access"
                        checked={userFormData.access}
                        onChange={(e) => setUserFormData({ ...userFormData, access: e.target.checked })}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="access" className="cursor-pointer">
                        Conceder acesso ao painel admin
                      </Label>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1">
                        Criar Usuário
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsUserDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Users List */}
            {loadingUsers ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Carregando usuários...</p>
              </div>
            ) : users.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Nenhum usuário cadastrado</p>
                  <Button onClick={handleOpenUserDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Cadastrar Primeiro Usuário
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {users.map((userData) => (
                  <Card key={userData.uid}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          userData.access ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {userData.access ? (
                            <Shield className="h-6 w-6 text-green-600" />
                          ) : (
                            <ShieldOff className="h-6 w-6 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{userData.email}</p>
                          <p className="text-sm text-muted-foreground">
                            {userData.access ? 'Acesso concedido' : 'Sem acesso'}
                          </p>
                          {userData.uid === user?.uid && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              Você
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={userData.access ? "outline" : "default"}
                          onClick={() => handleToggleUserAccess(userData.uid, userData.access)}
                          disabled={userData.uid === user?.uid}
                        >
                          {userData.access ? 'Revogar Acesso' : 'Conceder Acesso'}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteUser(userData.uid, userData.email)}
                          disabled={userData.uid === user?.uid}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">Configurações</h2>
              <p className="text-muted-foreground mt-1">
                Configure as opções do sistema
              </p>
            </div>

            {loadingSettings ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Carregando configurações...</p>
              </div>
            ) : (
              <div className="max-w-2xl">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      WhatsApp
                    </CardTitle>
                    <CardDescription>
                      Configure o número do WhatsApp para onde os pedidos serão enviados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateSettings} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="whatsappNumber">Número do WhatsApp</Label>
                        <Input
                          id="whatsappNumber"
                          type="text"
                          placeholder="5551999999999"
                          value={settings?.whatsappNumber || ''}
                          onChange={(e) => setSettings(prev => ({
                            whatsappNumber: e.target.value,
                            updatedAt: prev?.updatedAt || new Date().toISOString()
                          }))}
                          required
                        />
                        <p className="text-sm text-muted-foreground">
                          <strong>Formato correto:</strong> Apenas números - Código do país + DDD + Número
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ✅ Correto: <code className="bg-muted px-1 py-0.5 rounded">5551992155747</code>
                        </p>
                        <p className="text-xs text-destructive">
                          ❌ Errado: <code className="bg-muted px-1 py-0.5 rounded">55 51 9215-5747</code> (com espaços/hífens)
                        </p>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                        <p className="text-sm font-semibold">Preview do número:</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {settings?.whatsappNumber ? 
                            `https://wa.me/${settings.whatsappNumber.replace(/[\s\-\(\)]/g, '')}` : 
                            'Não configurado'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Este número será usado para:
                        </p>
                        <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                          <li>Receber pedidos do checkout</li>
                          <li>Botão de contato no header</li>
                          <li>Botão de contato no footer</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                          💡 Dica importante:
                        </p>
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                          O sistema irá remover automaticamente espaços, hífens e parênteses ao salvar. 
                          Mas é recomendado inserir apenas números para evitar erros.
                        </p>
                      </div>

                      <Button type="submit" className="w-full">
                        Salvar Configurações
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
