import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { toast } from 'sonner';
import { ParkingCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function Activate() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    const activateAccount = async () => {
      if (!token) {
        setStatus('error');
        toast.error('Invalid activation link');
        return;
      }

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
        toast.success('Account activated successfully!');
      } catch (error) {
        setStatus('error');
        toast.error('Activation failed');
      }
    };

    activateAccount();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-subtle">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {status === 'loading' && <Loader2 className="h-12 w-12 text-primary animate-spin" />}
              {status === 'success' && <CheckCircle className="h-12 w-12 text-green-500" />}
              {status === 'error' && <XCircle className="h-12 w-12 text-destructive" />}
            </div>
            <CardTitle className="text-2xl">
              {status === 'loading' && 'Activating Account'}
              {status === 'success' && 'Account Activated!'}
              {status === 'error' && 'Activation Failed'}
            </CardTitle>
            <CardDescription>
              {status === 'loading' && 'Please wait while we activate your account...'}
              {status === 'success' && 'Your account is now active. You can sign in.'}
              {status === 'error' && 'The activation link is invalid or expired.'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {status === 'success' && (
              <Button onClick={() => navigate('/auth')} className="w-full">
                Go to Sign In
              </Button>
            )}
            
            {status === 'error' && (
              <div className="space-y-2">
                <Button onClick={() => navigate('/auth/signup')} className="w-full">
                  Create New Account
                </Button>
                <Button onClick={() => navigate('/auth')} variant="outline" className="w-full">
                  Back to Sign In
                </Button>
              </div>
            )}

            {status === 'loading' && (
              <p className="text-center text-sm text-muted-foreground">
                This may take a few moments...
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
