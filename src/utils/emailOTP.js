// Email OTP Utility using EmailJS
// Free tier: 200 emails/month — sufficient for partner onboarding
import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Replace these with your real EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_codehtml';   // Create at https://dashboard.emailjs.com
const EMAILJS_TEMPLATE_ID = 'template_otp';       // OTP template with {{to_name}}, {{to_email}}, {{otp_code}}
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // Public key from EmailJS dashboard

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const OTP_STORAGE_KEY = 'codehtml_otp_data';

/**
 * Generate a 6-digit numeric OTP
 */
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP email via EmailJS
 * @param {string} email - Recipient email
 * @param {string} otp - The OTP code
 * @param {string} name - Recipient name
 * @returns {Promise<boolean>} - Success status
 */
export async function sendOTPEmail(email, otp, name) {
  // Store OTP data in sessionStorage with timestamp
  const otpData = {
    otp,
    email: email.toLowerCase().trim(),
    createdAt: Date.now(),
    expiresAt: Date.now() + OTP_EXPIRY_MS
  };
  sessionStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(otpData));

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: name,
        to_email: email,
        otp_code: otp,
        from_name: 'CodeHTML Partner System',
        reply_to: 'Contact@Codehtml.in'
      },
      EMAILJS_PUBLIC_KEY
    );
    return true;
  } catch (error) {
    console.error('EmailJS OTP send failed:', error);
    // Even if EmailJS fails, we still stored the OTP
    // In development/demo mode, the OTP is logged below
    console.log(`[DEV MODE] OTP for ${email}: ${otp}`);
    return false;
  }
}

/**
 * Validate the entered OTP against the stored value
 * @param {string} enteredOtp - The OTP entered by the user
 * @returns {{ valid: boolean, expired: boolean, error: string|null }}
 */
export function validateOTP(enteredOtp) {
  const stored = sessionStorage.getItem(OTP_STORAGE_KEY);
  
  if (!stored) {
    return { valid: false, expired: false, error: 'No OTP found. Please request a new one.' };
  }

  const otpData = JSON.parse(stored);

  // Check expiry
  if (Date.now() > otpData.expiresAt) {
    clearOTP();
    return { valid: false, expired: true, error: 'OTP has expired. Please request a new one.' };
  }

  // Check match
  if (enteredOtp.trim() === otpData.otp) {
    return { valid: true, expired: false, error: null };
  }

  return { valid: false, expired: false, error: 'Invalid OTP. Please check and try again.' };
}

/**
 * Clear stored OTP data
 */
export function clearOTP() {
  sessionStorage.removeItem(OTP_STORAGE_KEY);
}

/**
 * Get remaining seconds before OTP expires
 * @returns {number} Seconds remaining, or 0 if expired/no OTP
 */
export function getOTPTimeRemaining() {
  const stored = sessionStorage.getItem(OTP_STORAGE_KEY);
  if (!stored) return 0;
  
  const otpData = JSON.parse(stored);
  const remaining = Math.max(0, Math.floor((otpData.expiresAt - Date.now()) / 1000));
  return remaining;
}
