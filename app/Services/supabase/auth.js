import { supabase } from './client'

/**
 * Authentication Helper Functions
 * Handles user authentication and session management
 */

/**
 * Get current user session
 * @returns {Promise<Object|null>} Current user object or null
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Error getting current user:', error)
      return null
    }
    
    return user
  } catch (error) {
    console.error('Error in getCurrentUser:', error)
    return null
  }
}

/**
 * Sign up a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} [metadata] - Additional user metadata
 * @returns {Promise<Object>} Result object with success, data, and error
 */
export async function signUp(email, password, metadata = {}) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })

    if (error) {
      console.error('Error signing up:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }

    return {
      success: true,
      error: null,
      data
    }
  } catch (error) {
    console.error('Error in signUp:', error)
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
      data: null
    }
  }
}

/**
 * Sign in with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Result object with success, data, and error
 */
export async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('Error signing in:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }

    return {
      success: true,
      error: null,
      data
    }
  } catch (error) {
    console.error('Error in signIn:', error)
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
      data: null
    }
  }
}

/**
 * Sign out current user
 * @returns {Promise<Object>} Result object with success and error
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Error signing out:', error)
      return {
        success: false,
        error: error.message
      }
    }
    
    return {
      success: true,
      error: null
    }
  } catch (error) {
    console.error('Error in signOut:', error)
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    }
  }
}

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export async function resetPassword(email) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })

    if (error) {
      console.error('Error resetting password:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in resetPassword:', error)
    return false
  }
}

/**
 * Update user password
 * @param {string} newPassword - New password
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export async function updatePassword(newPassword) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      console.error('Error updating password:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in updatePassword:', error)
    return false
  }
}

/**
 * Listen to auth state changes
 * @param {Function} callback - Callback function to handle auth state changes
 * @returns {Function} Unsubscribe function
 */
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback)
}

/**
 * Get current session
 * @returns {Promise<Object|null>} Session object or null
 */
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Error getting session:', error)
      return null
    }
    
    return session
  } catch (error) {
    console.error('Error in getSession:', error)
    return null
  }
}

/**
 * Refresh current session
 * @returns {Promise<Object|null>} Refreshed session or null
 */
export async function refreshSession() {
  try {
    const { data, error } = await supabase.auth.refreshSession()
    
    if (error) {
      console.error('Error refreshing session:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error in refreshSession:', error)
    return null
  }
}
