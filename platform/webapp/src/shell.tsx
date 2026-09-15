import { Navigate, Outlet, NavLink, useLocation } from 'react-router-dom';
import { clearSession, getDisplayName, getRole, getToken } from './api';

type NavItem = { to: string; label: string; roles?: string[]; shell?: 'customer' | 'ops' };

const NAV: NavItem[] = [
  { to: '/autopilot', label: 'Autopilot', roles: ['customer', 'admin'], shell: 'customer' },
  { to: '/goals', label: 'Goals', roles: ['customer', 'admin'], shell: 'customer' },
  { to: '/accounts', label: 'Accounts', roles: ['customer', 'admin'], shell: 'customer' },
  { to: '/confirm', label: 'Confirm queue', roles: ['customer', 'adviser', 'admin'], shell: 'customer' },
  { to: '/explanations', label: 'Explanations', roles: ['customer', 'adviser', 'conduct', 'admin'], shell: 'customer' },
  { to: '/outcomes', label: 'Outcomes', roles: ['customer', 'product_owner', 'admin'], shell: 'customer' },
  { to: '/adviser', label: 'Adviser queue', roles: ['adviser', 'admin'], shell: 'ops' },
  { to: '/complaints', label: 'Complaints', roles: ['conduct', 'adviser', 'admin', 'customer'], shell: 'ops' },
  { to: '/fairness', label: 'Fairness', roles: ['conduct', 'admin'], shell: 'ops' },
  { to: '/governance', label: 'Models & policy', roles: ['conduct', 'admin'], shell: 'ops' },
  { to: '/vendors', label: 'Vendors', roles: ['admin', 'ops'], shell: 'ops' },
];

export function roleHome(role: string) {
  switch (role) {
    case 'adviser':
      return '/adviser';
    case 'conduct':
      return '/governance';
    case 'product_owner':
      return '/outcomes';
    case 'admin':
      return '/vendors';
    case 'ops':
      return '/vendors';
    default:
      return '/autopilot';
  }
}

export function RequireAuth() {
  if (!getToken()) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function Shell() {
  const role = getRole();
  const loc = useLocation();
  const links = NAV.filter((n) => !n.roles || n.roles.includes(role) || role === 'admin');
  const customerLinks = links.filter((n) => n.shell === 'customer');
  const opsLinks = links.filter((n) => n.shell === 'ops');
  const showOps = opsLinks.length > 0;

  return (
    <div className="shell">
      <nav className="nav">
        <div className="brand">Autara</div>
        <div className="nav-section">Customer</div>
        {customerLinks.map((l) => (
          <NavLink key={l.to} to={l.to} className={loc.pathname.startsWith(l.to) ? 'active' : ''}>
            {l.label}
          </NavLink>
        ))}
        {showOps ? (
          <>
            <div className="nav-section">Institution</div>
            {opsLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={loc.pathname.startsWith(l.to) ? 'active' : ''}>
                {l.label}
              </NavLink>
            ))}
          </>
        ) : null}
        <div className="nav-user">
          {getDisplayName()} · {role}
        </div>
        <button
          type="button"
          onClick={() => {
            clearSession();
            window.location.href = '/login';
          }}
        >
          Sign out
        </button>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
