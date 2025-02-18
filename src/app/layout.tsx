// src/app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// Remove the geistMono font import if you don’t need it
// import 'path-to-geistMono-font'; // This line is no longer necessary if you don't want geistMono font
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Add any additional head metadata if needed */}
      </head>
      <body>
        {/* You can customize the body layout further if needed */}
        {children}  {/* Renders the content of your pages */}
      </body>
    </html>
  );
}
