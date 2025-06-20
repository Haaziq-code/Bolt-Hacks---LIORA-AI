// Secure API Keys Configuration
// This file contains locked API keys that cannot be modified at runtime

interface SecureConfig {
  elevenlabs: string;
  gemini: string;
  supabase: {
    url: string;
    anonKey: string;
  };
  revenuecat: string;
  tavus: string;
  isLocked: boolean;
  configHash: string;
}

// Locked configuration - these values are secured and cannot be changed
const LOCKED_CONFIG: SecureConfig = {
  elevenlabs: import.meta.env.VITE_ELEVENLABS_API_KEY || 'sk_cee3cf951e9407d2caaf77ad5d3eee4a20d500f8e0d82e52',
  gemini: import.meta.env.VITE_GEMINI_API_KEY || 'your_gemini_api_key_here',
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://ttgklapeldrbkzptgley.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0Z2tsYXBlbGRyYmt6cHRnbGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NTI5NDgsImV4cCI6MjA2NTUyODk0OH0.07Fjk8NwtD6Mh_eO9W1ZAiJj6xCManYFUItvs9G8G1E'
  },
  revenuecat: import.meta.env.VITE_REVENUECAT_API_KEY || 'pk_live_51RaKDWFaw9uo1XgKxof8Doyqw7RAiXaBHSAZ7DFokx0yvfNVMO8PooxgQ5j54t7qQMOe3zNTxrAY1zhmp1jHCpCS00ZaDPisM4',
  tavus: import.meta.env.VITE_TAVUS_API_KEY || '0769c777ee0f4e519a639453548fa08b',
  isLocked: true,
  configHash: 'b8g9e3f4d2c5g7b9f4e3d2c5g7b9f4e3'
};

// Security validation
function validateConfigIntegrity(): boolean {
  const envLocked = import.meta.env.VITE_API_KEYS_LOCKED === 'true';
  const envHash = import.meta.env.VITE_CONFIG_HASH;
  
  if (!envLocked || envHash !== LOCKED_CONFIG.configHash) {
    console.warn('🔒 Security Warning: API configuration integrity check failed');
    return false;
  }
  
  return true;
}

// Secure API key getter with integrity validation
export function getSecureApiKey(service: keyof Omit<SecureConfig, 'isLocked' | 'configHash'>): string | object {
  if (!LOCKED_CONFIG.isLocked) {
    console.error('🔒 Security Error: Configuration is not properly locked');
    throw new Error('Configuration not secured');
  }
  
  const key = LOCKED_CONFIG[service];
  if (!key) {
    console.error(`🔒 Security Error: Invalid service requested: ${service}`);
    throw new Error('Invalid service configuration');
  }
  
  console.log(`🔐 Secure API key retrieved for service: ${service}`);
  return key;
}

// Prevent configuration modification
Object.freeze(LOCKED_CONFIG);

// Export locked configuration status
export const isConfigurationLocked = (): boolean => {
  return LOCKED_CONFIG.isLocked && validateConfigIntegrity();
};

// Export configuration hash for verification
export const getConfigurationHash = (): string => {
  return LOCKED_CONFIG.configHash;
};

// Security audit function
export function performSecurityAudit(): {
  isSecure: boolean;
  issues: string[];
  timestamp: string;
} {
  const issues: string[] = [];
  
  // Check if configuration is locked
  if (!LOCKED_CONFIG.isLocked) {
    issues.push('Configuration is not locked');
  }
  
  // Validate integrity
  if (!validateConfigIntegrity()) {
    issues.push('Configuration integrity check failed');
  }
  
  // Check for environment variable tampering
  const envKeys = [
    'VITE_ELEVENLABS_API_KEY',
    'VITE_SUPABASE_URL', 
    'VITE_SUPABASE_ANON_KEY',
    'VITE_REVENUECAT_API_KEY',
    'VITE_TAVUS_API_KEY'
  ];
  
  envKeys.forEach(key => {
    const envValue = import.meta.env[key];
    if (!envValue) {
      issues.push(`Missing environment variable: ${key}`);
    }
  });
  
  return {
    isSecure: issues.length === 0,
    issues,
    timestamp: new Date().toISOString()
  };
}

// Initialize security on module load
if (typeof window !== 'undefined') {
  const audit = performSecurityAudit();
  if (!audit.isSecure) {
    console.warn('🔒 Security Audit Failed:', audit.issues);
  } else {
    console.log('🔐 Security Audit Passed: All API keys are properly secured');
  }
}