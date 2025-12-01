import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { LogIn, UserPlus } from 'lucide-react';

export default function NotLoggedIn() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-subtle">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <LogIn className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Authentication Required</CardTitle>
            <CardDescription>
              You need to be signed in to access this page
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <Button onClick={() => navigate('/auth')} className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            
            <Button onClick={() => navigate('/auth/signup')} variant="outline" className="w-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Create Account
            </Button>

            <Button onClick={() => navigate('/')} variant="ghost" className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
