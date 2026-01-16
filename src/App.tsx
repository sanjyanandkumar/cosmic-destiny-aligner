import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
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
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminGuard from "@/components/AdminGuard";
import AdminOrders from "@/pages/admin/AdminOrders";
import RegisterPage from "./pages/RegisterPage";
import ScrollToTop from "@/components/ScrollToTop";
import ConsultingDetailsPage from "./pages/ConsultingDetailsPage";
import InstallPage from "./pages/InstallPage";
import VerticalDetails from "./pages/VerticalDetails"
import ConsultingAdditionalPage from "./pages/ConsultingAdditionalPage";
import SampleReportsPage from "./pages/SampleReportsPage";
import MoreWellnessPackages from "./pages/MoreWellnessPackages";
import CreateProductPage from "@/pages/admin/CreateProductPage";
import ProductListPage from "./pages/admin/AdminProductList";
import EditProductPage from "./pages/admin/EditProductPage";
import MirrorPage from "./pages/MirrorPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
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
            <Route path="/mirror" element={<MirrorPage />} />
            <Route path="/wardrobe" element={<WardrobePage />} />
            <Route path="/wardrobe/:productId" element={<ProductDetailPage />} />
            <Route path="/leisure" element={<LeisurePage />} />
            <Route path="/leisure/:experienceId" element={<LeisureDetailsPage />} />
            <Route path="/leisure/more" element={<MoreWellnessPackages />} />
            <Route path="/eduseam" element={<EduSeamPage />} />
            <Route path="/consulting/:experienceId" element={<ConsultingDetailsPage />} />
            {/* Additional consulting programs */}
            <Route path="/consulting/additional" element={<ConsultingAdditionalPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/install" element={<InstallPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sample-reports" element={<SampleReportsPage />} />
            <Route
              path="/admin/orders"
              element={
                <AdminGuard>
                  <AdminOrders />
                </AdminGuard>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminGuard>
                  <ProductListPage />
                </AdminGuard>
              }
            />

            <Route
              path="/admin/products/new"
              element={
                <AdminGuard>
                  <CreateProductPage />
                </AdminGuard>
              }
            />
            <Route
              path="/admin/products/:id/edit"
              element={
                <AdminGuard>
                  <EditProductPage />
                </AdminGuard>
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>

        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
