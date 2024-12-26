import React, { useEffect } from 'react';
import './GoogleSignup.css'

function GoogleSignup() {
  useEffect(() => {
    // Load Google Identity Services library
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID',
        callback: handleCredentialResponse,
        context: 'signup',
        auto_prompt: false,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large' }
      );
    };
  }, []);

  // Handle Google Callback
  const handleCredentialResponse = (response) => {
    console.log('Encoded JWT ID token:', response.credential);

    fetch('/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          window.location.href = '/dashboard';
        } else {
          alert('Google Signup failed');
        }
      })
      .catch((error) => {
        console.error('Error during Google signup:', error);
      });
  };

  return (
    <div id='google-signup'>
      <p>Or Signup with Google</p>
      <div className='google-button' id="google-signin-button"></div>
    </div>
  );
}

export default GoogleSignup;