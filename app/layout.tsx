import { PropsWithChildren } from 'react';
import '@/app/_styles/globals.css';

import Header from './_components/Header';
import { VideoPlayerProvider } from './_components/VideoPlayerContext';
import BackgroundVideoTest from './_components/BackgroundVideoYoutube';

export const metadata = {
  title: 'Next Trailers',
};

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <Header />
        <main className="mx-auto w-full">
          <VideoPlayerProvider>
            <BackgroundVideoTest />
            {children}
          </VideoPlayerProvider>
        </main>
      </body>
    </html>
  );
}

export default Layout;
