export const metadata = {
  title: 'cocok.in Admin',
  description: 'Admin dashboard for cocok.in marketplace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#020617' }}>{children}</body>
    </html>
  );
}
