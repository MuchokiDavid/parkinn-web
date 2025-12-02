import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';
import { User, Mail, Phone, MapPin, Lock, Shield, Car, Truck, Package, Music } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import { jsonReq } from '@/lib/apiClient';

// Profile Schema
const profileSchema = z.object({
  firstname: z.string().min(2, 'First name must be at least 2 characters'),
  lastname: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address').readonly(),
  phone_number: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number').optional().or(z.literal('')),
  middlename: z.string().optional(),
  username: z.string().min(3, 'Username must be at least 3 characters').readonly(),
});

// Password Schema
const passwordSchema = z.object({
  current_password: z.string().min(8, 'Current password is required'),
  new_password: z.string().min(8, 'New password must be at least 8 characters'),
  confirm_password: z.string().min(8, 'Confirm password must be at least 8 characters'),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

// Role-specific schemas (example for different roles)
const motoristSchema = z.object({
  vehicle_model: z.string().optional(),
  license_plate: z.string().optional(),
  max_passengers: z.number().min(1).max(10).optional(),
});

const djSchema = z.object({
  equipment: z.string().optional(),
  music_genres: z.array(z.string()).optional(),
  experience_years: z.number().min(0).max(50).optional(),
});

const deliverySchema = z.object({
  vehicle_type: z.enum(['car', 'bike', 'truck']).optional(),
  max_weight: z.number().min(1).max(1000).optional(),
  delivery_zones: z.array(z.string()).optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;
type MotoristForm = z.infer<typeof motoristSchema>;
type DJForm = z.infer<typeof djSchema>;
type DeliveryForm = z.infer<typeof deliverySchema>;

// Role configuration for tabs and fields
const roleConfig = {
  MOTORIST: {
    name: 'Motorist',
    icon: Car,
    color: 'bg-blue-100 text-blue-800',
    schema: motoristSchema,
    fields: [
      { name: 'vehicle_model', label: 'Vehicle Model', type: 'text', icon: Car },
      { name: 'license_plate', label: 'License Plate', type: 'text', icon: Car },
      { name: 'max_passengers', label: 'Max Passengers', type: 'number', icon: User },
    ],
  },
  DJ: {
    name: 'DJ',
    icon: Music,
    color: 'bg-purple-100 text-purple-800',
    schema: djSchema,
    fields: [
      { name: 'equipment', label: 'Equipment', type: 'text', icon: Music },
      { name: 'music_genres', label: 'Music Genres', type: 'text', icon: Music },
      { name: 'experience_years', label: 'Experience (years)', type: 'number', icon: Shield },
    ],
  },
  DELIVERY: {
    name: 'Delivery',
    icon: Package,
    color: 'bg-green-100 text-green-800',
    schema: deliverySchema,
    fields: [
      { name: 'vehicle_type', label: 'Vehicle Type', type: 'select', icon: Truck },
      { name: 'max_weight', label: 'Max Weight (kg)', type: 'number', icon: Package },
      { name: 'delivery_zones', label: 'Delivery Zones', type: 'text', icon: MapPin },
    ],
  },
} as const;

export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const queryClient = useQueryClient();
  const [originalProfile, setOriginalProfile] = React.useState<ProfileForm | null>(null);

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    watch: watchProfile,
    reset: resetProfile,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
      middlename: user?.middlename || '',
      username: user?.username || '',
    },
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  // Fetch profile data
  const { data: profileData, isLoading, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await jsonReq.get('/profile/');
      setOriginalProfile(response.data);
      return response.data;
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<ProfileForm>) => {
      // Use lodash to find changed fields
      const changedFields = _.reduce(data, (result, value, key) => {
        if (!_.isEqual(value, originalProfile?.[key as keyof ProfileForm])) {
          result[key] = value;
        }
        return result;
      }, {} as Record<string, any>);

      if (_.isEmpty(changedFields)) {
        throw new Error('No changes detected');
      }

      // Only send changed fields
      return await jsonReq.patch('/profile/', changedFields);
    },
    onSuccess: (response) => {
      toast.success('Profile updated successfully!');
      setOriginalProfile(response.data);
      updateUser(response.data);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message || 'Failed to update profile');
    },
  });

  // Update password mutation
  const updatePasswordMutation = useMutation({
    mutationFn: async (data: PasswordForm) => {
      return await jsonReq.post('/profile/change-password/', {
        current_password: data.current_password,
        new_password: data.new_password,
      });
    },
    onSuccess: () => {
      toast.success('Password updated successfully!');
      resetPassword();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update password');
    },
  });

  // Watch profile form for changes
  const profileValues = watchProfile();
  const hasProfileChanges = originalProfile && !_.isEqual(profileValues, originalProfile);

  // Handle profile submission
  const onSubmitProfile = async (data: ProfileForm) => {
    await updateProfileMutation.mutateAsync(data);
  };

  // Handle password submission
  const onSubmitPassword = async (data: PasswordForm) => {
    await updatePasswordMutation.mutateAsync(data);
  };

  // Reset profile form
  const handleResetProfile = () => {
    if (originalProfile) {
      resetProfile(originalProfile);
    }
  };

  // Get role-specific tab
  const getRoleTab = () => {
    if (!user?.role || !(user.role in roleConfig)) return null;

    const roleInfo = roleConfig[user.role as keyof typeof roleConfig];
    const RoleIcon = roleInfo.icon;

    return (
      <TabsTrigger value="role" className="flex items-center gap-2">
        <RoleIcon className="h-4 w-4" />
        {roleInfo.name} Settings
      </TabsTrigger>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading profile</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>
        {user?.role && (
          <Badge className={roleConfig[user.role as keyof typeof roleConfig]?.color || 'bg-gray-100 text-gray-800'}>
            {user.role}
          </Badge>
        )}
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Password
          </TabsTrigger>
          {getRoleTab()}
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Statistics
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                {hasProfileChanges && (
                  <Button variant="outline" size="sm" onClick={handleResetProfile}>
                    Reset Changes
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstname"
                        placeholder="John"
                        className="pl-9"
                        {...registerProfile('firstname')}
                      />
                    </div>
                    {profileErrors.firstname && (
                      <p className="text-sm text-destructive">{profileErrors.firstname.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastname">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastname"
                        placeholder="Doe"
                        className="pl-9"
                        {...registerProfile('lastname')}
                      />
                    </div>
                    {profileErrors.lastname && (
                      <p className="text-sm text-destructive">{profileErrors.lastname.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="middlename">Middle Name (Optional)</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="middlename"
                        placeholder="Middle"
                        className="pl-9"
                        {...registerProfile('middlename')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        className="pl-9 bg-muted"
                        readOnly
                        disabled
                        {...registerProfile('username')}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="pl-9 bg-muted"
                      readOnly
                      disabled
                      {...registerProfile('email')}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Contact admin to change email</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone_number"
                      type="tel"
                      placeholder="+1234567890"
                      className="pl-9"
                      {...registerProfile('phone_number')}
                    />
                  </div>
                  {profileErrors.phone_number && (
                    <p className="text-sm text-destructive">{profileErrors.phone_number.message}</p>
                  )}
                </div>

                <Separator />

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={!hasProfileChanges || isProfileSubmitting}
                  >
                    {isProfileSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                  {hasProfileChanges && (
                    <Button type="button" variant="outline" onClick={handleResetProfile}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="current_password"
                      type="password"
                      placeholder="Enter current password"
                      className="pl-9"
                      {...registerPassword('current_password')}
                    />
                  </div>
                  {passwordErrors.current_password && (
                    <p className="text-sm text-destructive">{passwordErrors.current_password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="new_password"
                      type="password"
                      placeholder="Enter new password"
                      className="pl-9"
                      {...registerPassword('new_password')}
                    />
                  </div>
                  {passwordErrors.new_password && (
                    <p className="text-sm text-destructive">{passwordErrors.new_password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm_password"
                      type="password"
                      placeholder="Confirm new password"
                      className="pl-9"
                      {...registerPassword('confirm_password')}
                    />
                  </div>
                  {passwordErrors.confirm_password && (
                    <p className="text-sm text-destructive">{passwordErrors.confirm_password.message}</p>
                  )}
                </div>

                <Button type="submit" disabled={isPasswordSubmitting}>
                  {isPasswordSubmitting ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Role-specific Tab */}
        {user?.role && user.role in roleConfig && (
          <TabsContent value="role">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const RoleIcon = roleConfig[user.role as keyof typeof roleConfig].icon;
                    return <RoleIcon className="h-5 w-5" />;
                  })()}
                  {roleConfig[user.role as keyof typeof roleConfig].name} Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Configure your {roleConfig[user.role as keyof typeof roleConfig].name.toLowerCase()}-specific settings.
                    These will be implemented based on your backend API.
                  </p>
                  {/* Add role-specific form fields here */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {roleConfig[user.role as keyof typeof roleConfig].fields.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name}>{field.label}</Label>
                        <div className="relative">
                          <field.icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          {field.type === 'select' ? (
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                              <option value="">Select vehicle type</option>
                              <option value="car">Car</option>
                              <option value="bike">Bike</option>
                              <option value="truck">Truck</option>
                            </select>
                          ) : (
                            <Input
                              id={field.name}
                              type={field.type}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              className="pl-9"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button>Save Role Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Statistics Tab */}
        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Bookings</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Spent</span>
                <span className="font-semibold">$240</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-semibold">Jan 2024</span>
              </div>
              {user?.role === 'MOTORIST' && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Rides</span>
                    <span className="font-semibold">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Average Rating</span>
                    <span className="font-semibold">4.8 ★</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
