'use client';

// pages/error.js

const ErrorPage = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>¡Oops! Algo salió mal.</h1>
      <p>No se pudo completar la autenticación con Spotify.</p>
      <a href="/">Volver a intentar</a>
    </div>
  );
};

export default ErrorPage;