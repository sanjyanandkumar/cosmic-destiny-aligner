import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import PhilosophyPage from "./pages/PhilosophyPage";
import LeadershipPage from "./pages/LeadershipPage";
import AwardsPage from "./pages/AwardsPage";
import ContactPage from "./pages/ContactPage";
import ConsultingPage from "./pages/ConsultingPage";
import WardrobePage from "./pages/WardrobePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LeisureDetailsPage from "./pages/LeisureDetailsPage";
import EduSeamPage from "./pages/EduSeamPage";
import LeisurePage from "./pages/LeisurePage";
import OrdersPage from "./pages/OrdersPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminGuard from "@/components/AdminGuard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminOrders from "@/pages/admin/AdminOrders";
import RegisterPage from "./pages/RegisterPage";
import ScrollToTop from "@/components/ScrollToTop";
import BackgroundMusic from "./components/BackgroundMusic";
import ConsultingDetailsPage from "./pages/ConsultingDetailsPage";
import InstallPage from "./pages/InstallPage";
import VerticalDetails from "./pages/VerticalDetails"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/verticaldet" element={<VerticalDetails />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/consulting" element={<ConsultingPage />} />
          <Route path="/wardrobe" element={<WardrobePage />} />
          <Route path="/wardrobe/:productId" element={<ProductDetailPage />} />
          <Route path="/leisure" element={<LeisurePage />} />
          <Route path="/leisure/:experienceId" element={<LeisureDetailsPage />} />
          <Route path="/eduseam" element={<EduSeamPage />} />
          <Route path="/consulting/:experienceId" element={<ConsultingDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/install" element={<InstallPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin/products"
            element={
              <AdminGuard>
                <AdminProducts />
              </AdminGuard>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminGuard>
                <AdminOrders />
              </AdminGuard>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* 🎵 Persistent Music Player */}
        <BackgroundMusic />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
