import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';
import { ParkingCircle } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Auth() {
  const navigate = useNavigate();
  const { login, user } = useAuthStore();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already logged in
  if (user) {
    const dashboardRoute = user.role === 'admin' ? '/admin' : user.role === 'host' ? '/host' : '/guest';
    navigate(dashboardRoute, { replace: true });
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      
      const userData = useAuthStore.getState().user;
      const dashboardRoute = userData?.role === 'admin' ? '/admin' : userData?.role === 'host' ? '/host' : '/guest';
      navigate(dashboardRoute);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const fillDemoCredentials = (role: 'guest' | 'host' | 'admin') => {
    const credentials = {
      guest: { email: 'guest@parkbnb.test', password: 'guest123' },
      host: { email: 'host@parkbnb.test', password: 'host123' },
      admin: { email: 'admin@parkbnb.test', password: 'admin123' },
    };
    setValue('email', credentials[role].email);
    setValue('password', credentials[role].password);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-subtle">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <ParkingCircle className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Welcome to ParkBnB</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register('email')}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/auth/forgot" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <PasswordInput
                  id="password"
                  placeholder="Enter your password"
                  {...register('password')}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Demo Accounts</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('guest')}
                >
                  Guest
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('host')}
                >
                  Host
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('admin')}
                >
                  Admin
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{' '}
              <Link to="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
            
            <p className="text-center text-xs text-muted-foreground mt-2">
              Demo MVP - Click a demo account button to auto-fill credentials
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
