import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Index = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted">
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4">
            <Icon name="Sparkles" size={48} className="text-primary" />
          </div>
          
          <h1 className="text-6xl font-bold text-foreground tracking-tight">
            Добро пожаловать!
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isAuthenticated 
              ? `Привет, ${user?.name}! Рады видеть тебя снова.`
              : 'Современное приложение с минималистичным дизайном для управления пользователями'
            }
          </p>

          {!isAuthenticated ? (
            <div className="flex gap-4 justify-center pt-8">
              <Button size="lg" asChild className="hover-scale">
                <Link to="/register">
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Начать работу
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="hover-scale">
                <Link to="/login">
                  <Icon name="LogIn" size={20} className="mr-2" />
                  Войти
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex gap-4 justify-center pt-8">
              <Button size="lg" asChild className="hover-scale">
                <Link to="/profile">
                  <Icon name="User" size={20} className="mr-2" />
                  Мой профиль
                </Link>
              </Button>
              {user?.role === 'admin' && (
                <Button size="lg" variant="outline" asChild className="hover-scale">
                  <Link to="/admin">
                    <Icon name="Shield" size={20} className="mr-2" />
                    Админ-панель
                  </Link>
                </Button>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <Card className="p-6 space-y-4 hover-scale bg-card/50 backdrop-blur">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Быстро</h3>
              <p className="text-muted-foreground">
                Молниеносная скорость работы и отзывчивый интерфейс
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-scale bg-card/50 backdrop-blur">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Безопасно</h3>
              <p className="text-muted-foreground">
                Надежная защита данных и контроль доступа
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-scale bg-card/50 backdrop-blur">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="Layout" size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Просто</h3>
              <p className="text-muted-foreground">
                Чистый и понятный дизайн для комфортной работы
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
