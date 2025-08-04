import { Montserrat } from 'next/font/google';
import "./globals.css";
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Choose the weights you need
  variable: '--font-montserrat', // Optional: for Tailwind custom font
});

export const metadata = {
  title: "CoreFocus",
  description: "CoreFocus, a productivity web-app to help you hit your targets and master your habits",
};

export default function RootLayout({ children }) {
  return (
  <html lang="en" className={`${montserrat.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-...." // Optional: add integrity for security
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <AuthProvider>
          <Toaster position='top-right'/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
