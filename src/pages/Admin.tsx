import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const mockUsers = [
  { id: '1', name: 'Админ', email: 'admin@example.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Пользователь', email: 'user@example.com', role: 'user', status: 'active' },
  { id: '3', name: 'Иван Иванов', email: 'ivan@example.com', role: 'user', status: 'active' },
  { id: '4', name: 'Мария Петрова', email: 'maria@example.com', role: 'user', status: 'inactive' },
];

const Admin = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted p-6 pt-24">
      <div className="container mx-auto max-w-6xl space-y-6">
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="Shield" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Админ-панель</h1>
              <p className="text-muted-foreground">Управление пользователями и системой</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 animate-scale-in">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Всего пользователей</CardDescription>
              <CardTitle className="text-4xl">{mockUsers.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} />
                <span>Активных: {mockUsers.filter(u => u.status === 'active').length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Администраторов</CardDescription>
              <CardTitle className="text-4xl">
                {mockUsers.filter(u => u.role === 'admin').length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="ShieldCheck" size={16} />
                <span>С полным доступом</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Новых за месяц</CardDescription>
              <CardTitle className="text-4xl">2</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="TrendingUp" size={16} />
                <span>+50% к прошлому</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Список пользователей</CardTitle>
            <CardDescription>Все зарегистрированные пользователи системы</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                        {u.role === 'admin' ? 'Администратор' : 'Пользователь'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={u.status === 'active' ? 'border-green-500 text-green-600' : 'border-gray-400 text-gray-600'}
                      >
                        {u.status === 'active' ? 'Активен' : 'Неактивен'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
