// This is a simple authentication system that uses localStorage
// In a real application, you would use a more secure authentication method

// Encrypted credentials (do not store plaintext credentials in code)
// These are not actually encrypted, but in a real app you would use proper encryption
const ENCRYPTED_USERNAME = "YW5pbW1vbWVu" // Base64 encoded
const ENCRYPTED_PASSWORD_HASH = "JDJiJDEwJHhYeEVVSEpnNVpnOWZGVzRTdWZlWnVkRzlDRWZPQnlFZHdQVFRKWmhHRXRJNXFKRXZxLlBX" // Bcrypt hash (simulated)

// Check if the provided credentials match the stored credentials
export function authenticate(username: string, password: string): boolean {
  // In a real app, you would use proper encryption and hashing
  // This is just a simple example
  const isValid =
    username === atob(ENCRYPTED_USERNAME) &&
    // This is a simplified check - in a real app you would use bcrypt.compare
    password === "animmomen765987543987A!"

  if (isValid) {
    // Store authentication state in localStorage
    localStorage.setItem("auth_token", generateToken())
    return true
  }

  return false
}

// Check if the user is authenticated
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("auth_token")
}

// Logout the user
export function logout(): void {
  localStorage.removeItem("auth_token")
}

// Generate a simple token
function generateToken(): string {
  return (
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString()
  )
}

