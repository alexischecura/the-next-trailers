import { PropsWithChildren } from 'react';
import '@/app/_styles/globals.css';

import Header from './_components/Header';

export const metadata = {
  title: 'Next Trailers',
};

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-blue-950">
        <Header />
        <main className="mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}

export default Layout;
