import { useLocation,Link } from "react-router-dom";
import { useEffect } from "react";

import { DashboardLayout } from "@/components/DashboardLayout";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Detect dashboard route
  const isDashboard = location.pathname.startsWith("/dashboard");

  const content = (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <Link to={isDashboard?"/dashboard":"/"} className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </Link>
      </div>
    </div>
  );

  return isDashboard ? (
    <DashboardLayout>{content}</DashboardLayout>
  ) : (
    <>
      <Header />
      {content}
      <Footer />
    </>
  );
};

export default NotFound;
