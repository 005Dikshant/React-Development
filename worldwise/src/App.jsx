import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { CityProvider } from "./contexts/CityContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

export default function App() {
  return (
    <CityProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="cities/:id" element={<City />} />
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CityProvider>
  );
}

/*
Without Code Splitting:

dist/index.html                   0.45 kB │ gzip:   0.29 kB
dist/assets/index-d9508afd.css   30.06 kB │ gzip:   5.11 kB
dist/assets/index-7f20cf2e.js   508.22 kB │ gzip: 148.13 kB

With Code splitting help of lazy loading

dist/index.html                           0.45 kB │ gzip:   0.29 kB
dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
dist/assets/Homepage-380f4eeb.css         0.51 kB │ gzip:   0.30 kB
dist/assets/AppLayout-b9f1b3f4.css        1.91 kB │ gzip:   0.70 kB
dist/assets/index-57e43bd0.css           26.39 kB │ gzip:   4.42 kB
dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
dist/assets/PageNotFound-09f57ad3.js      0.15 kB │ gzip:   0.15 kB
dist/assets/Logo-cc709839.js              0.21 kB │ gzip:   0.19 kB
dist/assets/PageNav-edf3ef99.js           0.47 kB │ gzip:   0.26 kB
dist/assets/Pricing-0d278110.js           0.64 kB │ gzip:   0.40 kB
dist/assets/Homepage-579cb506.js          0.67 kB │ gzip:   0.41 kB
dist/assets/Product-cb10c744.js           0.85 kB │ gzip:   0.48 kB
dist/assets/Login-e0264d86.js             1.01 kB │ gzip:   0.53 kB
dist/assets/AppLayout-780da476.js       156.94 kB │ gzip:  46.19 kB
dist/assets/index-3cd2fa0b.js           349.73 kB │ gzip: 101.52 kB

*/
