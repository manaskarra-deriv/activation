// API configuration
const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  // Log API URL to help with debugging
  logApiUrl: function() {
    console.log('Using API URL:', this.apiUrl);
    return this.apiUrl;
  }
};

// Log on initial load to help debug connection issues
console.log('Environment API URL:', process.env.REACT_APP_API_URL);
console.log('Using API URL:', config.apiUrl);

export default config; 