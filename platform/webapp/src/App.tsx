import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth, Shell } from './shell';
import {
  AccountsPage,
  ActionsPage,
  AdviserQueuePage,
  AutopilotPage,
  ComplaintsPage,
  ConfirmQueuePage,
  ExplanationsPage,
  FairnessPage,
  GoalsPage,
  GovernancePage,
  HomeRedirect,
  LoginPage,
  OutcomesPage,
  VendorsPage,
} from './pages';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<Shell />}>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/autopilot" element={<AutopilotPage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/confirm" element={<ConfirmQueuePage />} />
            <Route path="/explanations" element={<ExplanationsPage />} />
            <Route path="/outcomes" element={<OutcomesPage />} />
            <Route path="/actions" element={<ActionsPage />} />
            <Route path="/adviser" element={<AdviserQueuePage />} />
            <Route path="/complaints" element={<ComplaintsPage />} />
            <Route path="/fairness" element={<FairnessPage />} />
            <Route path="/governance" element={<GovernancePage />} />
            <Route path="/vendors" element={<VendorsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
