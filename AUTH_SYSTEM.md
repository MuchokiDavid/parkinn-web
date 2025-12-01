# ParkBnB Authentication System

## Overview
Complete authentication system with consistent UI/UX across all auth pages.

## File Structure & Purpose

### `/src/pages/auth/`

#### 1. **Login.tsx** (Main Entry Point)
- **Purpose**: Sign in existing users
- **Features**:
  - Email/password form
  - Demo account quick-fill buttons (Guest, Host, Admin)
  - Link to forgot password
  - Link to signup
  - Auto-redirect if already logged in
  - Role-based dashboard routing
- **Route**: `/auth`

#### 2. **Signup.tsx** (User Registration)
- **Purpose**: Create new user accounts
- **Features**:
  - Full name, email, password, confirm password fields
  - Password validation (min 6 chars, matching)
  - Link back to login
  - Redirects to activation page on success
- **Route**: `/auth/signup`
- **Flow**: Signup → Activate → Login

#### 3. **Forgot.tsx** (Password Reset Request)
- **Purpose**: Request password reset email
- **Features**:
  - Email input form
  - Success state showing confirmation
  - Option to try another email
  - Link back to login
- **Route**: `/auth/forgot`
- **Flow**: Forgot → Email sent → Check inbox → Reset

#### 4. **Reset.tsx** (Password Reset)
- **Purpose**: Reset password with token from email
- **Features**:
  - New password and confirm password fields
  - Token validation from URL query params
  - Password matching validation
  - Auto-redirect to login on success
- **Route**: `/auth/reset?token=xxx`
- **Flow**: Email link → Reset form → Login

#### 5. **Activate.tsx** (Account Activation)
- **Purpose**: Activate new account via email link
- **Features**:
  - Loading state with spinner
  - Success state with checkmark
  - Error state with X icon
  - Token validation from URL
  - Buttons to proceed based on status
- **Route**: `/auth/activate?token=xxx`
- **Flow**: Signup → Email link → Activate → Login

#### 6. **NotLoggedIn.tsx** (Auth Required)
- **Purpose**: Redirect page for unauthenticated users
- **Features**:
  - Clear message about auth requirement
  - Sign in button
  - Create account button
  - Back to home button
- **Route**: `/auth/not-logged-in`
- **Usage**: Redirect here from ProtectedRoute when user not authenticated

#### 7. **Unauthorised.tsx** (Access Denied)
- **Purpose**: Show when user lacks permission for a page
- **Features**:
  - Access denied message
  - Go to user's dashboard button (role-based)
  - Back to home button
- **Route**: `/auth/unauthorised`
- **Usage**: Redirect here when user has wrong role for a route

## Authentication Store (`/src/stores/authStore.ts`)

### State
```typescript
{
  user: User | null;              // Current user object
  token: string | null;           // Auth token (legacy)
  accessToken: string | null;     // JWT access token
  refreshToken: string | null;    // JWT refresh token
  isAuthenticated: boolean;       // Auth status
}
```

### Methods
- `login(email, password)` - Authenticate user
- `signup(email, password)` - Register new user
- `forgotPassword(email)` - Request password reset
- `resetPassword(token, newPassword)` - Reset password
- `updatePassword(token, current, new)` - Change password
- `updateProfile(user)` - Update user info
- `logout()` - Clear auth state

### Persistence
- Uses Zustand persist middleware
- Stores in localStorage as 'parkbnb-auth'
- Auto-rehydrates on app load

## User Roles & Routing

### Guest Role
- **Dashboard**: `/guest`
- **Access**: View bookings, search listings, make reservations

### Host Role
- **Dashboard**: `/host`
- **Access**: Manage listings, view bookings, track earnings

### Admin Role
- **Dashboard**: `/admin`
- **Access**: Platform overview, user management, analytics

## Authentication Flow

### Login Flow
```
/auth → Enter credentials → Login → Redirect to role dashboard
```

### Signup Flow
```
/auth/signup → Fill form → Submit → /auth/activate → Check email → 
Click link → Account activated → /auth → Login
```

### Forgot Password Flow
```
/auth → Forgot password? → /auth/forgot → Enter email → 
Check inbox → Click link → /auth/reset?token=xxx → 
Enter new password → /auth → Login
```

### Protected Route Flow
```
User visits protected route → Check auth → 
  If not authenticated → /auth/not-logged-in
  If wrong role → /auth/unauthorised
  If authorized → Show page
```

## UI Consistency

All auth pages share:
- Same Card layout with shadow-elegant
- ParkingCircle icon in header
- Consistent spacing and typography
- Primary color scheme
- Responsive design (max-w-md)
- Header component at top
- Gradient background (bg-gradient-subtle)
- Toast notifications for feedback

## Integration with Backend

### Current State (MVP)
- Mock authentication with hardcoded users
- Simulated API delays (500ms)
- localStorage persistence
- No real email sending

### Production Ready Steps
1. Replace mock API calls with real endpoints:
   - POST `/api/auth/login`
   - POST `/api/auth/signup`
   - POST `/api/auth/forgot-password`
   - POST `/api/auth/reset-password`
   - POST `/api/auth/activate`
   - POST `/api/auth/logout`
   - GET `/api/auth/me` (verify token)

2. Implement JWT token refresh logic
3. Add email service integration
4. Add OAuth providers (Google, Facebook)
5. Implement rate limiting
6. Add CAPTCHA for signup/login
7. Add 2FA support
8. Add session management
9. Add password strength requirements
10. Add account lockout after failed attempts

## Security Considerations

### Current Implementation
- Passwords stored in plain text (MOCK ONLY)
- No HTTPS enforcement
- No CSRF protection
- No rate limiting

### Production Requirements
- Hash passwords with bcrypt/argon2
- Enforce HTTPS
- Implement CSRF tokens
- Add rate limiting
- Validate all inputs
- Sanitize user data
- Use secure cookies for tokens
- Implement token expiration
- Add refresh token rotation
- Log authentication events

## Testing

### Test Accounts
```
Guest:  guest@parkbnb.test / guest123
Host:   host@parkbnb.test  / host123
Admin:  admin@parkbnb.test / admin123
```

### Test Scenarios
1. Login with valid credentials
2. Login with invalid credentials
3. Signup new account
4. Request password reset
5. Reset password with token
6. Activate account with token
7. Access protected route without auth
8. Access route with wrong role
9. Logout and verify state cleared
10. Refresh page and verify auth persists

## Future Enhancements

1. **Social Login**: Google, Facebook, Apple
2. **Magic Links**: Passwordless email login
3. **2FA**: SMS or authenticator app
4. **Remember Me**: Extended session option
5. **Account Deletion**: Self-service account removal
6. **Email Verification**: Verify email on signup
7. **Profile Management**: Edit profile page
8. **Security Settings**: Change password, view sessions
9. **Login History**: Track login attempts
10. **Account Recovery**: Security questions, backup codes
