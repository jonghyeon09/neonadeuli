import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Main from '@/components/common/Main';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '너나들이',
  description:
    '대화형 AI 챗봇과 다양한 콘텐츠로 한국의 국가유산과 역사를 재미있게 탐구하는 문화 콘텐츠 서비스',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Main>
          {children}
          {modal}
        </Main>
      </body>
    </html>
  );
}
