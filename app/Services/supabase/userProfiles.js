import { supabase } from './client'

/**
 * User Profiles Database Operations
 * Handles all CRUD operations for user_profiles table
 */

/**
 * Get user profile by user ID
 * @param {string} userId - The user's UUID
 * @returns {Promise<Object|null>} User profile object or null if not found
 */
export async function getUserProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getUserProfile:', error)
    return null
  }
}

/**
 * Create a new user profile
 * @param {Object} profileData - Profile data object
 * @param {string} profileData.id - User ID (UUID)
 * @param {string} profileData.email - User email
 * @param {number} [profileData.tokens_available=100] - Available tokens
 * @param {number} [profileData.tokens_used=0] - Used tokens
 * @param {string} [profileData.subscription_tier='free'] - Subscription tier
 * @param {string} [profileData.stripe_customer_id] - Stripe customer ID
 * @param {string} [profileData.stripe_subscription_id] - Stripe subscription ID
 * @returns {Promise<Object|null>} Created profile or null if failed
 */
export async function createUserProfile(profileData) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([profileData])
      .select()
      .single()

    if (error) {
      console.error('Error creating user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in createUserProfile:', error)
    return null
  }
}

/**
 * Update user profile
 * @param {string} userId - User ID (UUID)
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object|null>} Updated profile or null if failed
 */
export async function updateUserProfile(userId, updates) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in updateUserProfile:', error)
    return null
  }
}

/**
 * Update user's token usage
 * @param {string} userId - User ID (UUID)
 * @param {number} tokensToUse - Number of tokens to use
 * @returns {Promise<Object|null>} Updated profile or null if failed
 */
export async function useTokens(userId, tokensToUse) {
  try {
    // First, get current profile to check available tokens
    const currentProfile = await getUserProfile(userId)
    if (!currentProfile) {
      throw new Error('User profile not found')
    }

    if (currentProfile.tokens_available < tokensToUse) {
      throw new Error('Insufficient tokens available')
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        tokens_available: currentProfile.tokens_available - tokensToUse,
        tokens_used: currentProfile.tokens_used + tokensToUse
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating token usage:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in useTokens:', error)
    return null
  }
}

/**
 * Add tokens to user's account
 * @param {string} userId - User ID (UUID)
 * @param {number} tokensToAdd - Number of tokens to add
 * @returns {Promise<Object|null>} Updated profile or null if failed
 */
export async function addTokens(userId, tokensToAdd) {
  try {
    const currentProfile = await getUserProfile(userId)
    if (!currentProfile) {
      throw new Error('User profile not found')
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        tokens_available: currentProfile.tokens_available + tokensToAdd
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error adding tokens:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in addTokens:', error)
    return null
  }
}

/**
 * Update subscription tier
 * @param {string} userId - User ID (UUID)
 * @param {string} tier - New subscription tier ('free' or 'pro')
 * @param {string} [stripeCustomerId] - Stripe customer ID
 * @param {string} [stripeSubscriptionId] - Stripe subscription ID
 * @returns {Promise<Object|null>} Updated profile or null if failed
 */
export async function updateSubscription(userId, tier, stripeCustomerId = null, stripeSubscriptionId = null) {
  try {
    const updates = { subscription_tier: tier }
    
    if (stripeCustomerId) {
      updates.stripe_customer_id = stripeCustomerId
    }
    
    if (stripeSubscriptionId) {
      updates.stripe_subscription_id = stripeSubscriptionId
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating subscription:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in updateSubscription:', error)
    return null
  }
}

/**
 * Get user profile by email
 * @param {string} email - User email
 * @returns {Promise<Object|null>} User profile object or null if not found
 */
export async function getUserProfileByEmail(email) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      console.error('Error fetching user profile by email:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getUserProfileByEmail:', error)
    return null
  }
}

/**
 * Delete user profile (use with caution)
 * @param {string} userId - User ID (UUID)
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export async function deleteUserProfile(userId) {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', userId)

    if (error) {
      console.error('Error deleting user profile:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in deleteUserProfile:', error)
    return false
  }
}

/**
 * Get all user profiles (admin function - use with caution)
 * @returns {Promise<Array>} Array of user profiles
 */
export async function getAllUserProfiles() {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all user profiles:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getAllUserProfiles:', error)
    return []
  }
}
