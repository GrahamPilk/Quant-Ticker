# Supabase Integration

This directory contains all the Supabase-related functionality for the QuantTicker application.

## Files Overview

- `client.js` - Client-side Supabase client configuration
- `server.js` - Server-side Supabase client configuration for Next.js
- `middleware.js` - Authentication middleware for route protection
- `auth.js` - Authentication helper functions
- `userProfiles.js` - User profile database operations
- `index.js` - Main export file
- `migrations/001_create_user_profiles.sql` - Database migration for user_profiles table
- `schema.sql` - Complete database schema

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

1. Run the migration file `001_create_user_profiles.sql` in your Supabase SQL editor
2. This will create the `user_profiles` table with the following structure:
   - `id` (UUID, Primary Key, references auth.users)
   - `email` (Text)
   - `tokens_available` (Integer, default: 0)
   - `tokens_used` (Integer, default: 0)
   - `subscription_tier` (Text, default: 'free', values: 'free', 'pro')
   - `stripe_customer_id` (Text, nullable)
   - `stripe_subscription_id` (Text, nullable)
   - `created_at` (Timestamp with timezone)
   - `updated_at` (Timestamp with timezone)

## Features

- **Automatic Profile Creation**: When a user signs up, a profile is automatically created
- **Row Level Security**: Users can only access their own profile data
- **Token Management**: Built-in functions for managing user tokens
- **Subscription Management**: Support for Stripe integration
- **Real-time Updates**: Automatic timestamp updates

## Usage Examples

```javascript
import { 
  getUserProfile, 
  useTokens, 
  updateSubscription,
  signUp,
  signIn 
} from './app/Services/supabase'

// Get user profile
const profile = await getUserProfile(userId)

// Use tokens
const updatedProfile = await useTokens(userId, 5)

// Update subscription
const profile = await updateSubscription(userId, 'pro', stripeCustomerId)

// Authentication
const user = await signUp('user@example.com', 'password')
const session = await signIn('user@example.com', 'password')
```

## Security

- Row Level Security (RLS) is enabled on the user_profiles table
- Users can only view, update, and insert their own profile data
- All database operations include proper error handling
- Authentication state is managed through Supabase Auth
