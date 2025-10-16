/**
 * Supabase Service Index
 * Main export file for all Supabase-related functionality
 */

// Export clients
export { supabase } from './client'
export { createClient } from './server'

// Export authentication functions
export {
  getCurrentUser,
  signUp,
  signIn,
  signOut,
  resetPassword,
  updatePassword,
  onAuthStateChange,
  getSession,
  refreshSession
} from './auth'

// Export user profile functions
export {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  useTokens,
  addTokens,
  updateSubscription,
  getUserProfileByEmail,
  deleteUserProfile,
  getAllUserProfiles
} from './userProfiles'

// Export middleware
export { updateSession } from './middleware'
