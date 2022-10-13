import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { AppHeader } from "@/components/AppHeader";
import { Fallback } from "@/components/Fallback";

const HomePage = lazy(() => import("@/pages/HomePage"));
const VehiclesPage = lazy(() => import("@/pages/VehiclesPage"));
const VehicleDetailsPage = lazy(() => import("@/pages/VehicleDetailsPage"));
const AddVehiclePage = lazy(() => import("@/pages/AddVehiclePage"));

export function App() {
  return (
    <>
      <AppHeader />
      <Container component="main" maxWidth="xl" sx={{ my: 2 }}>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
            <Route path="/vehicles/add" element={<AddVehiclePage />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}
