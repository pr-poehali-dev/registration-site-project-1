import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted p-6 pt-24">
      <div className="container mx-auto max-w-2xl">
        <Card className="animate-scale-in">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={48} className="text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl">{user?.name}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2 mt-2">
              <Icon name="Mail" size={16} />
              {user?.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Роль</p>
                  <p className="text-sm text-muted-foreground">Уровень доступа</p>
                </div>
              </div>
              <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="text-sm">
                {user?.role === 'admin' ? 'Администратор' : 'Пользователь'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Key" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">ID пользователя</p>
                  <p className="text-sm text-muted-foreground">Уникальный идентификатор</p>
                </div>
              </div>
              <code className="text-sm bg-background px-3 py-1 rounded">{user?.id}</code>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Статус аккаунта</p>
                  <p className="text-sm text-muted-foreground">Активность профиля</p>
                </div>
              </div>
              <Badge variant="outline" className="text-sm border-green-500 text-green-600">
                Активен
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
