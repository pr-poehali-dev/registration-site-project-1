import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Запуск новой версии платформы",
    description: "Представляем обновленную версию с улучшенным интерфейсом и новыми функциями для пользователей.",
    date: "2024-11-20",
    category: "Обновления",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
    author: "Иван Петров"
  },
  {
    id: 2,
    title: "Новые возможности для бизнеса",
    description: "Добавлены инструменты аналитики и отчетности для корпоративных клиентов.",
    date: "2024-11-18",
    category: "Бизнес",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    author: "Мария Сидорова"
  },
  {
    id: 3,
    title: "Партнерство с ведущими компаниями",
    description: "Заключены соглашения о сотрудничестве с крупными игроками рынка.",
    date: "2024-11-15",
    category: "Партнерство",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    author: "Алексей Смирнов"
  },
  {
    id: 4,
    title: "Безопасность данных на первом месте",
    description: "Внедрены дополнительные меры защиты и шифрования пользовательских данных.",
    date: "2024-11-12",
    category: "Безопасность",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",
    author: "Елена Козлова"
  },
  {
    id: 5,
    title: "Расширение команды",
    description: "Мы ищем талантливых специалистов для присоединения к нашей команде.",
    date: "2024-11-10",
    category: "Карьера",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
    author: "Дмитрий Волков"
  },
  {
    id: 6,
    title: "Мобильное приложение уже доступно",
    description: "Скачайте наше приложение в App Store и Google Play для удобного доступа.",
    date: "2024-11-08",
    category: "Продукт",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
    author: "Ольга Новикова"
  }
];

const categories = ["Все", "Обновления", "Бизнес", "Партнерство", "Безопасность", "Карьера", "Продукт"];

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Все" || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Новости и обновления
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Следите за последними событиями, обновлениями и достижениями нашей компании
          </p>
        </div>

        <div className="mb-8 space-y-4 animate-fade-in">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск новостей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Icon name="Search" className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground">Новости не найдены</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news, index) => (
              <Card 
                key={news.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">
                    {news.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Icon name="Calendar" size={16} />
                    <span>{new Date(news.date).toLocaleDateString('ru-RU')}</span>
                    <span>•</span>
                    <Icon name="User" size={16} />
                    <span>{news.author}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {news.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {news.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full group">
                    Читать далее
                    <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
