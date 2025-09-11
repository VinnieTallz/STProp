/**
 * Security utilities for the Smart Lock Manager
 */

export class SecurityUtils {
  /**
   * Sanitize API key for logging (show only first/last few characters)
   */
  public static sanitizeApiKey(apiKey: string): string {
    if (!apiKey || apiKey.length < 8) return '***';
    return `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`;
  }

  /**
   * Validate API key format
   */
  public static validateApiKeyFormat(apiKey: string): boolean {
    return /^seam_[a-zA-Z0-9_-]+$/.test(apiKey);
  }

  /**
   * Generate secure random ID
   */
  public static generateSecureId(): string {
    return crypto.randomUUID();
  }

  /**
   * Hash sensitive data for audit logs
   */
  public static async hashSensitiveData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Validate workspace ID format
   */
  public static validateWorkspaceId(workspaceId: string): boolean {
    return /^[a-zA-Z0-9_-]+$/.test(workspaceId) && workspaceId.length > 5;
  }

  /**
   * Rate limiting helper
   */
  public static createRateLimiter(maxRequests: number, windowMs: number) {
    const requests: number[] = [];
    
    return () => {
      const now = Date.now();
      const windowStart = now - windowMs;
      
      // Remove old requests
      while (requests.length > 0 && requests[0] < windowStart) {
        requests.shift();
      }
      
      if (requests.length >= maxRequests) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      
      requests.push(now);
      return true;
    };
  }
}