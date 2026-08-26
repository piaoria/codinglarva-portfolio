import Header from "@/components/layout/Header";
import CustomCursor from "@/components/layout/CustomCursor";
import { HeaderColorProvider } from "@/contexts/HeaderColorContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { ToastProvider } from "@/contexts/ToastContext";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeaderColorProvider>
      <CustomCursor />
      <ModalProvider>
        <ToastProvider>
          <div className="portfolio-shell min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">{children}</div>
          </div>
        </ToastProvider>
      </ModalProvider>
    </HeaderColorProvider>
  );
}
