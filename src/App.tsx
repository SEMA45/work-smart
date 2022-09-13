import { FC, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Auth/SignIn";
import Landing from "./Pages/Landing/Landing";
import AppShell from "./Pages/App Shell/AppShell";
import Dashboard from "./Pages/Dashboard/Dashboard";

const App: FC = () => {
  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="h-screen w-screen bg-slate-900 gap-4 flex flex-col items-center justify-center">
              {/* <!--card--> */}
            </div>
          }
        >
          <Routes>
            {/**Sign In ======================== */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/app" element={<AppShell />}>
              <Route path="" element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
