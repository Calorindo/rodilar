import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { catalogService } from '@/services/catalogService';
import { useProducts } from '@/context/ProductContext';
import { Catalog } from '@/types/catalog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Package } from 'lucide-react';

export default function Catalogos() {
  const { products, isLoading: productsLoading } = useProducts();
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCatalog, setSelectedCatalog] = useState<string | null>(null);

  useEffect(() => {
    loadCatalogs();
  }, []);

  const loadCatalogs = async () => {
    try {
      setIsLoading(true);
      const catalogsData = await catalogService.getAll();
      setCatalogs(catalogsData);
    } catch (error) {
      console.error('Erro ao carregar catálogos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCatalogData = selectedCatalog
    ? catalogs.find(c => c.id === selectedCatalog)
    : null;

  const catalogProducts = selectedCatalogData
    ? products.filter(p => selectedCatalogData.productIds.includes(p.id))
    : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-hero-gradient py-16">
          <div className="container">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gremio-white text-center">
              Catálogos
            </h1>
            <p className="text-gremio-white/80 text-center mt-4 max-w-lg mx-auto">
              Explore nossos catálogos organizados por categoria e necessidade.
            </p>
          </div>
        </section>

        {/* Catalogs Section */}
        <section className="py-12">
          <div className="container">
            {isLoading || productsLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Carregando catálogos...</p>
              </div>
            ) : catalogs.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">
                  Nenhum catálogo disponível no momento.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Catalogs List */}
                <div className="lg:col-span-1 space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Nossos Catálogos</h2>
                  
                  {catalogs.map((catalog) => (
                    <Card
                      key={catalog.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedCatalog === catalog.id
                          ? 'border-primary shadow-md'
                          : ''
                      }`}
                      onClick={() => setSelectedCatalog(catalog.id)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          {catalog.name}
                        </CardTitle>
                        <CardDescription>
                          {catalog.productIds.length} produto(s)
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {catalog.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Products Display */}
                <div className="lg:col-span-2">
                  {selectedCatalogData ? (
                    <>
                      <div className="mb-6">
                        <h2 className="text-3xl font-bold">{selectedCatalogData.name}</h2>
                        <p className="text-muted-foreground mt-2">
                          {selectedCatalogData.description}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {catalogProducts.length} produto(s) neste catálogo
                        </p>
                      </div>

                      {catalogProducts.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2">
                          {catalogProducts.map((product, index) => (
                            <div
                              key={product.id}
                              className="animate-fade-in-up opacity-0"
                              style={{
                                animationDelay: `${index * 50}ms`,
                                animationFillMode: 'forwards',
                              }}
                            >
                              <ProductCard product={product} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">
                            Este catálogo ainda não possui produtos.
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                      <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-lg">
                        Selecione um catálogo para ver os produtos
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
