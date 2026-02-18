import { Header } from './Header';
import { Footer } from './Footer';

export function ReaderLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary transition-theme">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
