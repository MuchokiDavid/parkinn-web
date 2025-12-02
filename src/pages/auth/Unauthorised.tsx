import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { useAuthStore } from '@/stores/authStore';
import { ShieldAlert } from 'lucide-react';

export default function Unauthorised() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleGoToDashboard = () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const dashboardRoute = user.role === 'admin' ? '/admin' : user.role === 'host' ? '/host' : '/guest';
    navigate(dashboardRoute);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-subtle">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <ShieldAlert className="h-12 w-12 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this page
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button onClick={()=>navigate("/dashboard")} className="w-full">
              Go to My Dashboard
            </Button>

            <Button onClick={() => navigate('/')} variant="outline" className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
