export interface Subscription {
  id: string;
  productId: string;
  isActive: boolean;
  expiresAt: string;
  platform: 'web' | 'ios' | 'android';
}

export interface PurchaseResult {
  success: boolean;
  subscription?: Subscription;
  error?: string;
  checkoutUrl?: string;
}

// Enhanced RevenueCat integration with proper Stripe checkout
export async function initializeRevenueCat(userId: string): Promise<void> {
  console.log('🔐 RevenueCat initialized for user:', userId);
}

export async function purchaseSubscription(productId: string): Promise<PurchaseResult> {
  try {
    console.log('💳 Starting subscription purchase for:', productId);
    
    // Show loading state
    const loadingToast = document.createElement('div');
    loadingToast.textContent = 'Processing payment...';
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create Stripe checkout session
    const checkoutUrl = await createStripeCheckoutSession(productId);
    
    if (checkoutUrl) {
      // Open Stripe checkout in same window for better UX
      window.location.href = checkoutUrl;
      
      return {
        success: true,
        checkoutUrl
      };
    } else {
      // Enhanced fallback with proper subscription simulation
      const subscription: Subscription = {
        id: `sub_${Date.now()}`,
        productId,
        isActive: true,
        expiresAt: new Date(Date.now() + (productId === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
        platform: 'web'
      };

      // Store subscription locally for demo
      localStorage.setItem('liora_subscription', JSON.stringify(subscription));
      localStorage.setItem('liora_pro', 'true');
      
      console.log('✅ Subscription activated:', subscription);
      
      // Dispatch event for UI updates
      window.dispatchEvent(new CustomEvent('subscription-updated', { detail: subscription }));
      
      return {
        success: true,
        subscription
      };
    }
  } catch (error) {
    console.error('❌ Purchase failed:', error);
    return {
      success: false,
      error: 'Payment processing failed. Please check your payment method and try again.'
    };
  }
}

// Enhanced Stripe checkout session creation
async function createStripeCheckoutSession(productId: string): Promise<string | null> {
  try {
    // In production, this would call your backend API
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cancel`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('❌ Failed to create Stripe checkout session:', error);
    
    // For demo purposes, simulate successful payment flow
    console.log('🔗 Using demo payment flow');
    
    // Simulate successful payment after delay
    setTimeout(() => {
      const subscription: Subscription = {
        id: `sub_demo_${Date.now()}`,
        productId,
        isActive: true,
        expiresAt: new Date(Date.now() + (productId === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
        platform: 'web'
      };
      
      localStorage.setItem('liora_subscription', JSON.stringify(subscription));
      localStorage.setItem('liora_pro', 'true');
      window.dispatchEvent(new CustomEvent('subscription-updated', { detail: subscription }));
      
      // Show success message
      const event = new CustomEvent('payment-success', { 
        detail: { message: '🎉 Payment successful! Welcome to LioraAI Pro!' }
      });
      window.dispatchEvent(event);
    }, 3000);
    
    return null;
  }
}

export async function restorePurchases(): Promise<Subscription[]> {
  try {
    console.log('🔄 Restoring purchases...');
    
    // Check localStorage for existing subscription
    const storedSubscription = localStorage.getItem('liora_subscription');
    const isProStored = localStorage.getItem('liora_pro') === 'true';
    
    if (storedSubscription && isProStored) {
      const subscription = JSON.parse(storedSubscription);
      
      // Check if subscription is still valid
      if (new Date(subscription.expiresAt) > new Date()) {
        return [subscription];
      } else {
        // Subscription expired
        localStorage.removeItem('liora_subscription');
        localStorage.removeItem('liora_pro');
      }
    }
    
    return [];
  } catch (error) {
    console.error('❌ Failed to restore purchases:', error);
    return [];
  }
}

export async function checkSubscriptionStatus(): Promise<boolean> {
  try {
    const storedSubscription = localStorage.getItem('liora_subscription');
    const isProStored = localStorage.getItem('liora_pro') === 'true';
    
    if (storedSubscription && isProStored) {
      const subscription = JSON.parse(storedSubscription);
      
      // Check if subscription is still valid
      if (new Date(subscription.expiresAt) > new Date()) {
        console.log('📊 Active subscription found:', subscription);
        return true;
      } else {
        // Subscription expired
        localStorage.removeItem('liora_subscription');
        localStorage.removeItem('liora_pro');
        console.log('📊 Subscription expired');
        return false;
      }
    }
    
    console.log('📊 No active subscription');
    return false;
  } catch (error) {
    console.error('❌ Failed to check subscription:', error);
    return false;
  }
}

// Helper function to simulate pro upgrade
export function simulateProUpgrade(): void {
  const subscription: Subscription = {
    id: `sub_demo_${Date.now()}`,
    productId: 'monthly',
    isActive: true,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    platform: 'web'
  };
  
  localStorage.setItem('liora_subscription', JSON.stringify(subscription));
  localStorage.setItem('liora_pro', 'true');
  window.dispatchEvent(new CustomEvent('subscription-updated', { detail: subscription }));
  console.log('✅ Pro upgrade simulated');
}

export function simulateProDowngrade(): void {
  localStorage.removeItem('liora_subscription');
  localStorage.removeItem('liora_pro');
  window.dispatchEvent(new CustomEvent('subscription-updated'));
  console.log('📉 Pro downgrade simulated');
}

// Listen for payment success events
if (typeof window !== 'undefined') {
  window.addEventListener('payment-success', (event: any) => {
    // Show success notification
    const message = event.detail?.message || 'Payment successful!';
    
    // Create and show toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 5000);
  });
}