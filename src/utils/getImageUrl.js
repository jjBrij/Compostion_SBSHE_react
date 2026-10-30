// src/utils/getImageUrl.js

export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    // Fallback image if no image is uploaded in Django Admin
    return 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop';
  }

  // If Django returns an absolute URL (starts with http), use it directly
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `http://127.0.0.1:8000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};