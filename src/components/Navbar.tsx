import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  onLogout: () => void;
}

const Navbar = ({ isAuthenticated, isAdmin, onLogout }: NavbarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <Icon name="Rocket" size={18} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">App</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant={isActive('/news') ? 'default' : 'ghost'}
              asChild
              className="transition-all"
            >
              <Link to="/news">
                <Icon name="Newspaper" size={18} className="mr-2" />
                Новости
              </Link>
            </Button>

            {!isAuthenticated ? (
              <>
                <Button
                  variant={isActive('/login') ? 'default' : 'ghost'}
                  asChild
                  className="transition-all"
                >
                  <Link to="/login">Вход</Link>
                </Button>
                <Button
                  variant={isActive('/register') ? 'default' : 'ghost'}
                  asChild
                  className="transition-all"
                >
                  <Link to="/register">Регистрация</Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={isActive('/profile') ? 'default' : 'ghost'}
                  asChild
                  className="transition-all"
                >
                  <Link to="/profile">
                    <Icon name="User" size={18} className="mr-2" />
                    Профиль
                  </Link>
                </Button>
                
                {isAdmin && (
                  <Button
                    variant={isActive('/admin') ? 'default' : 'ghost'}
                    asChild
                    className="transition-all"
                  >
                    <Link to="/admin">
                      <Icon name="Shield" size={18} className="mr-2" />
                      Админ
                    </Link>
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className="transition-all"
                >
                  <Icon name="LogOut" size={18} className="mr-2" />
                  Выход
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;