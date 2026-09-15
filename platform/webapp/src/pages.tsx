import { FormEvent, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { api, DEMO_CUSTOMER_ID, Envelope, ListEnvelope, setSession } from './api';
import { roleHome } from './shell';

type Goal = {
  goalId: string;
  type: string;
  targetAmount: number;
  currency?: string;
  status: string;
};
type Constraint = { constraintId: string; type: string; value: string };
type Account = {
  accountId: string;
  provider: string;
  accountType: string;
  balance: number;
  hostInstitutionProduct?: boolean;
};
type Offer = {
  offerId: string;
  provider: string;
  productType: string;
  headlineRate: number;
  hostInstitutionProduct: boolean;
};
type Proposal = {
  proposalId: string;
  customerId: string;
  actionType: string;
  status: string;
  material: boolean;
  estimatedBenefit?: number;
  explanationId?: string;
  hostInstitutionLosing?: boolean;
  suitability?: { result: string; perimeter?: string };
};
type Action = {
  actionId: string;
  proposalId: string;
  status: string;
  executedAt: string;
  policyVersion?: string;
};
type Explanation = {
  explanationId: string;
  proposalId: string;
  plainLanguage: string;
  factors: Array<{ name: string; contribution: number }>;
  policyVersion?: string;
};
type Complaint = {
  complaintId: string;
  customerId: string;
  actionId: string;
  status: string;
  freezeAutomation: boolean;
  narrative?: string;
};
type Outcome = {
  customerId: string;
  period: string;
  feesAvoided: number;
  interestDifferential: number;
  goalProgressPct?: number;
  baselineLabel?: string;
};
type ModelVersion = {
  modelVersionId: string;
  name: string;
  version: string;
  status: string;
  propensityNotes?: string;
};
type Vendor = {
  vendorId: string;
  vendorName: string;
  capability: string;
  concentrationScore: number;
  killSwitchActive: boolean;
  failoverBehaviour?: string;
};
type Fairness = {
  cohorts: Array<{
    cohortLabel: string;
    recommendationRate: number;
    approvalRate: number;
    thresholdBreached?: boolean;
  }>;
  remediationOpenCount?: number;
  generatedAt: string;
};
type Automation = {
  customerId: string;
  automationStatus: string;
  pausedCategories?: string[];
};

function money(n?: number) {
  if (n == null || Number.isNaN(n)) return '—';
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);
}

export function HomeRedirect() {
  return <Navigate to={roleHome(localStorage.getItem('autara.role') ?? 'customer')} replace />;
}

export function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('customer@demo.local');
  const [password, setPassword] = useState('sandbox-cust-8x');
  const [error, setError] = useState('');
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const res = await api<
        Envelope<{ accessToken: string; operator: { role: string; displayName: string } }>
      >('/v0/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      setSession(res.data.accessToken, res.data.operator.role, res.data.operator.displayName);
      nav(roleHome(res.data.operator.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  }
  return (
    <div className="login-hero">
      <form className="login" onSubmit={onSubmit}>
        <div className="brand-mark">Autara</div>
        <h1>Self-driving finance you can pause</h1>
        <p className="login-sub">Glass-cockpit autopilot for household money.</p>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <button className="primary" type="submit">
          Sign in
        </button>
        <p className="hint">
          Demo: customer@demo.local / sandbox-cust-8x · adviser@demo.local / sandbox-adv-8xx ·
          conduct@demo.local / sandbox-cond-8x
        </p>
      </form>
    </div>
  );
}

export function AutopilotPage() {
  const [automation, setAutomation] = useState<Automation | null>(null);
  const [pending, setPending] = useState(0);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function load() {
    setError('');
    try {
      const [auto, props, out] = await Promise.all([
        api<Envelope<Automation>>(`/v1/customers/${DEMO_CUSTOMER_ID}/automation`).catch(() => null),
        api<ListEnvelope<Proposal>>('/v1/proposals?status=pending&material=true').catch(() => null),
        api<Envelope<Outcome>>(`/v1/customers/${DEMO_CUSTOMER_ID}/outcomes`).catch(() => null),
      ]);
      if (auto) setAutomation(auto.data);
      setPending(props?.data.items.length ?? 0);
      if (out) setOutcome(out.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function pauseAll() {
    setBusy(true);
    try {
      const res = await api<Envelope<Automation>>(`/v1/customers/${DEMO_CUSTOMER_ID}/automation/pause`, {
        method: 'POST',
        body: JSON.stringify({ categories: ['all'] }),
      });
      setAutomation(res.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function resume() {
    setBusy(true);
    try {
      const res = await api<Envelope<Automation>>(`/v1/customers/${DEMO_CUSTOMER_ID}/automation/resume`, {
        method: 'POST',
        body: '{}',
      });
      setAutomation(res.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  const status = automation?.automationStatus ?? 'active';
  const paused = status === 'paused' || status === 'disabled';

  return (
    <div>
      <div className="brand-mark subtle">Autara</div>
      <h1 className="page-title">Autopilot</h1>
      {error ? <div className="banner alert">{error}</div> : null}
      <div className={`autopilot-bar ${paused ? 'paused' : 'active'}`}>
        <div>
          <div className="instrument-label">Status</div>
          <div className="instrument-value">{paused ? 'Paused' : 'On'}</div>
        </div>
        <div>
          <div className="instrument-label">Material waiting</div>
          <div className="instrument-value confirm">{pending}</div>
        </div>
        <div>
          <div className="instrument-label">Fees avoided</div>
          <div className="instrument-value">{money(outcome?.feesAvoided)}</div>
        </div>
        <button
          type="button"
          className={paused ? 'primary' : 'pause-btn'}
          disabled={busy}
          onClick={() => void (paused ? resume() : pauseAll())}
        >
          {paused ? 'Resume' : 'Pause all'}
        </button>
      </div>
      <div className="panel-row">
        <div className="panel">
          <h2>Next routine actions</h2>
          <p className="muted">Quiet sweeps and bill scheduling run below perception when goals are set.</p>
          <Link to="/goals">Edit goals</Link>
        </div>
        <div className="panel">
          <h2>Confirm queue</h2>
          <p className="muted">
            {pending === 0
              ? 'No material actions waiting.'
              : `${pending} capital-moving proposal${pending === 1 ? '' : 's'} need your confirm.`}
          </p>
          <Link to="/confirm">Open confirm queue</Link>
        </div>
      </div>
    </div>
  );
}

export function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [error, setError] = useState('');
  const [type, setType] = useState('emergencyBuffer');
  const [amount, setAmount] = useState('5000');

  async function load() {
    try {
      const [g, c] = await Promise.all([
        api<ListEnvelope<Goal>>(`/v1/customers/${DEMO_CUSTOMER_ID}/goals`),
        api<ListEnvelope<Constraint>>(`/v1/customers/${DEMO_CUSTOMER_ID}/constraints`),
      ]);
      setGoals(g.data.items);
      setConstraints(c.data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function addGoal(e: FormEvent) {
    e.preventDefault();
    try {
      await api(`/v1/customers/${DEMO_CUSTOMER_ID}/goals`, {
        method: 'POST',
        body: JSON.stringify({ type, targetAmount: Number(amount), currency: 'USD' }),
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <div>
      <div className="brand-mark subtle">Autara</div>
      <h1 className="page-title">Goals and hard constraints</h1>
      {error ? <div className="banner alert">{error}</div> : null}
      {goals.length === 0 ? (
        <div className="banner confirm">Agent blocked until minimum goals exist.</div>
      ) : null}
      <div className="panel-row">
        <div className="panel">
          <h2>Goals</h2>
          {goals.map((g) => (
            <div key={g.goalId} className="card-row">
              <span className="chip">{g.type}</span>
              <span>{money(g.targetAmount)}</span>
              <span className="muted mono">{g.status}</span>
            </div>
          ))}
          <form className="inline-form" onSubmit={(e) => void addGoal(e)}>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="emergencyBuffer">Emergency buffer</option>
              <option value="debtPaydown">Debt paydown</option>
              <option value="savingsRate">Savings rate</option>
              <option value="feeMinimisation">Fee minimisation</option>
            </select>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button className="primary" type="submit">
              Add goal
            </button>
          </form>
        </div>
        <div className="panel">
          <h2>Hard constraints</h2>
          {constraints.length === 0 ? <p className="muted">No hard limits yet.</p> : null}
          {constraints.map((c) => (
            <div key={c.constraintId} className="card-row">
              <span className="chip constraint">{c.type}</span>
              <span className="mono">{c.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api<ListEnvelope<Account>>(`/v1/customers/${DEMO_CUSTOMER_ID}/accounts`),
      api<ListEnvelope<Offer>>(`/v1/customers/${DEMO_CUSTOMER_ID}/product-offers`),
    ])
      .then(([a, o]) => {
        setAccounts(a.data.items);
        setOffers(o.data.items);
      })
      .catch((e) => setError(String(e.message)));
  }, []);

  return (
    <div>
      <h1 className="page-title">Multi-provider graph</h1>
      {error ? <div className="banner alert">{error}</div> : null}
      <div className="panel">
        <h2>Accounts</h2>
        {accounts.length === 0 ? (
          <p className="muted">Connect accounts to build the graph. Partial views show clear gaps.</p>
        ) : null}
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Type</th>
              <th>Balance</th>
              <th>Shelf</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.accountId}>
                <td>{a.provider}</td>
                <td>{a.accountType}</td>
                <td>{money(a.balance)}</td>
                <td>{a.hostInstitutionProduct ? 'Host' : 'External'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel">
        <h2>Comparable offers</h2>
        <p className="muted">Better external fits still surface (BR-4).</p>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Product</th>
              <th>Rate</th>
              <th>Host?</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((o) => (
              <tr key={o.offerId} className={!o.hostInstitutionProduct ? 'highlight-external' : ''}>
                <td>{o.provider}</td>
                <td>{o.productType}</td>
                <td>{o.headlineRate}%</td>
                <td>{o.hostInstitutionProduct ? 'Host' : 'External'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProposalCard({
  p,
  onConfirm,
  onDecline,
}: {
  p: Proposal;
  onConfirm: () => void;
  onDecline: () => void;
}) {
  return (
    <div className={`confirm-card ${p.material ? 'material' : ''}`}>
      <div className="card-row">
        <span className="chip">{p.actionType}</span>
        {p.material ? <span className="chip confirm">Material</span> : <span className="chip signal">Routine</span>}
        {p.hostInstitutionLosing ? <span className="chip external">External win</span> : null}
        {p.suitability ? (
          <span className={`chip suitability-${p.suitability.result}`}>{p.suitability.result}</span>
        ) : null}
      </div>
      <p>
        Estimated benefit: <strong>{money(p.estimatedBenefit)}</strong>
      </p>
      <p className="mono muted">{p.proposalId}</p>
      <div className="btn-row">
        <button type="button" className="primary" onClick={onConfirm}>
          Confirm
        </button>
        <button type="button" onClick={onDecline}>
          Decline
        </button>
        {p.explanationId ? <Link to={`/explanations`}>View rationale</Link> : null}
      </div>
    </div>
  );
}

export function ConfirmQueuePage() {
  const [rows, setRows] = useState<Proposal[]>([]);
  const [error, setError] = useState('');

  async function load() {
    try {
      const res = await api<ListEnvelope<Proposal>>('/v1/proposals?status=pending');
      setRows(res.data.items.filter((p) => p.material));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function confirm(id: string) {
    try {
      await api(`/v1/proposals/${id}/confirm`, { method: 'POST', body: '{}' });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  async function decline(id: string) {
    try {
      await api(`/v1/proposals/${id}/decline`, { method: 'POST', body: '{}' });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div>
      <h1 className="page-title">Confirm queue</h1>
      {error ? <div className="banner alert">{error}</div> : null}
      {rows.length === 0 && !error ? (
        <div className="panel">No material actions waiting.</div>
      ) : null}
      {rows.map((p) => (
        <ProposalCard
          key={p.proposalId}
          p={p}
          onConfirm={() => void confirm(p.proposalId)}
          onDecline={() => void decline(p.proposalId)}
        />
      ))}
    </div>
  );
}

export function ExplanationsPage() {
  const [rows, setRows] = useState<Explanation[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api<ListEnvelope<Explanation>>(`/v1/explanations?customerId=${DEMO_CUSTOMER_ID}`)
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(String(e.message)));
  }, []);

  return (
    <div>
      <div className="brand-mark subtle">Autara</div>
      <h1 className="page-title">Explanation ledger</h1>
      {error ? <div className="banner alert">{error}</div> : null}
      {rows.length === 0 && !error ? <div className="panel">No explanations yet.</div> : null}
      {rows.map((x) => (
        <div key={x.explanationId} className="panel">
          <p>{x.plainLanguage || <span className="alert-text">Missing rationale (BR-3)</span>}</p>
          <ul className="factor-list">
            {(x.factors ?? []).map((f) => (
              <li key={f.name}>
                {f.name} <span className="mono">{f.contribution}</span>
              </li>
            ))}
          </ul>
          <div className="card-row">
            <span className="mono muted">{x.explanationId}</span>
            {x.policyVersion ? <span className="chip mono">policy {x.policyVersion}</span> : null}
            <Link to="/complaints">File complaint</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OutcomesPage() {
  const [report, setReport] = useState<Outcome | null>(null);
  const [overview, setOverview] = useState<{
    activeCustomers: number;
    totalFeesAvoided: number;
    medianGoalProgressPct: number;
  } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api<Envelope<Outcome>>(`/v1/customers/${DEMO_CUSTOMER_ID}/outcomes`).catch(() => null),
      api<Envelope<{ activeCustomers: number; totalFeesAvoided: number; medianGoalProgressPct: number }>>(
        '/v1/outcomes/overview',
      ).catch(() => null),
    ])
      .then(([r, o]) => {
        if (r) setReport(r.data);
        if (o) setOverview(o.data);
      })
      .catch((e) => setError(String(e.message)));
  }, []);

  return (
    <div>
      <h1 className="page-title">Outcomes vs baseline</h1>
      {error ? <div className="banner alert">{error}</div> : null}
      {!report && !overview && !error ? (
        <div className="panel">Insufficient history — early empty state.</div>
      ) : null}
      {report ? (
        <div className="panel outcome-compare">
          <div>
            <div className="instrument-label">Fees avoided</div>
            <div className="instrument-value signal">{money(report.feesAvoided)}</div>
          </div>
          <div>
            <div className="instrument-label">Interest differential</div>
            <div className="instrument-value">{money(report.interestDifferential)}</div>
          </div>
          <div>
            <div className="instrument-label">Goal progress</div>
            <div className="instrument-value">{report.goalProgressPct ?? 0}%</div>
          </div>
          <p className="muted">{report.baselineLabel ?? 'vs no-automation baseline'}</p>
        </div>
      ) : null}
      {overview ? (
        <div className="panel">
          <h2>Institution telemetry</h2>
          <div className="card-row">
            <span>Active customers: {overview.activeCustomers}</span>
            <span>Total fees avoided: {money(overview.totalFeesAvoided)}</span>
            <span>Median goal progress: {overview.medianGoalProgressPct}%</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function AdviserQueuePage() {
  const [rows, setRows] = useState<Proposal[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api<ListEnvelope<Proposal>>('/v1/adviser/exception-queue')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(String(e.message)));
  }, []);

  return (
    <div>
      <h1 className="page-title">Adviser exception queue</h1>
      {error ? <div className="banner alert">{error}</div> : null}
      {rows.length === 0 && !error ? (
        <div className="panel">Queue healthy — no suitability edge cases stranded.</div>
      ) : null}
      {rows.map((p) => (
        <div key={p.proposalId} className="panel coach-row">
          <div className="card-row">
            <span className="chip">{p.actionType}</span>
            <span className="chip">{p.status}</span>
            {p.suitability ? <span className={`chip suitability-${p.suitability.result}`}>{p.suitability.result}</span> : null}
          </div>
          <p className="mono muted">{p.proposalId}</p>
          <p className="muted">Same rationale the customer sees — dual-pane review.</p>
          <Link to="/explanations">Open explanation</Link>
        </div>
      ))}
    </div>
  );
}

export function ComplaintsPage() {
  const [rows, setRows] = useState<Complaint[]>([]);
  const [error, setError] = useState('');
  const [actionId, setActionId] = useState('');
  const [narrative, setNarrative] = useState('');

  async function load() {
    try {
      const res = await api<ListEnvelope<Complaint>>('/v1/complaints');
      setRows(res.data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function openCase(e: FormEvent) {
    e.preventDefault();
    try {
      await api('/v1/complaints', {
        method: 'POST',
        body: JSON.stringify({
          customerId: DEMO_CUSTOMER_ID,
          actionId,
          narrative,
        }),
      });
      setActionId('');
      setNarrative('');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <div>
      <h1 className="page-title">Complaints and freeze</h1>
      {error ? <div className="banner alert">{error}</div> : null}
      {rows.some((c) => c.freezeAutomation) ? (
        <div className="banner alert">Automation frozen — decision packet preserved.</div>
      ) : null}
      <div className="panel">
        <h2>Open complaint</h2>
        <form className="stack-form" onSubmit={(e) => void openCase(e)}>
          <label>
            Action id
            <input value={actionId} onChange={(e) => setActionId(e.target.value)} required />
          </label>
          <label>
            Narrative
            <textarea value={narrative} onChange={(e) => setNarrative(e.target.value)} required rows={3} />
          </label>
          <button className="primary" type="submit">
            Freeze & open case
          </button>
        </form>
      </div>
      {rows.map((c) => (
        <div key={c.complaintId} className="panel">
          <div className="card-row">
            <span className="chip">{c.status}</span>
            {c.freezeAutomation ? <span className="chip alert">Frozen</span> : null}
          </div>
          <p>{c.narrative}</p>
          <p className="mono muted">{c.complaintId}</p>
        </div>
      ))}
    </div>
  );
}

export function FairnessPage() {
  const [snap, setSnap] = useState<Fairness | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Envelope<Fairness>>('/v1/governance/fairness')
      .then((r) => setSnap(r.data))
      .catch((e) => setError(String(e.message)));
  }, []);

  return (
    <div>
      <h1 className="page-title">Fairness monitoring</h1>
      {error ? <div className="banner alert">{error}</div> : null}
      {!snap && !error ? <div className="panel">No snapshot yet for this jurisdiction.</div> : null}
      {snap ? (
        <div className="panel">
          <p className="muted">Generated {snap.generatedAt}</p>
          <p>Open remediations: {snap.remediationOpenCount ?? 0}</p>
          <table>
            <thead>
              <tr>
                <th>Cohort</th>
                <th>Recommend rate</th>
                <th>Approval rate</th>
                <th>Breach</th>
              </tr>
            </thead>
            <tbody>
              {(snap.cohorts ?? []).map((c) => (
                <tr key={c.cohortLabel}>
                  <td>{c.cohortLabel}</td>
                  <td>{c.recommendationRate}</td>
                  <td>{c.approvalRate}</td>
                  <td>{c.thresholdBreached ? <span className="chip alert">Yes</span> : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export function GovernancePage() {
  const [models, setModels] = useState<ModelVersion[]>([]);
  const [error, setError] = useState('');

  async function load() {
    try {
      const res = await api<ListEnvelope<ModelVersion>>('/v1/governance/model-versions');
      setModels(res.data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function approve(id: string) {
    try {
      await api(`/v1/governance/model-versions/${id}/approve`, { method: 'POST', body: '{}' });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  async function rollback(id: string) {
    try {
      await api(`/v1/governance/model-versions/${id}/rollback`, { method: 'POST', body: '{}' });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div>
      <h1 className="page-title">Model and policy governance</h1>
      {error ? <div className="banner alert">{error}</div> : null}
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Version</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.modelVersionId}>
                <td>{m.name}</td>
                <td className="mono">{m.version}</td>
                <td>
                  <span className="chip">{m.status}</span>
                </td>
                <td className="btn-row">
                  <button type="button" className="primary" onClick={() => void approve(m.modelVersionId)}>
                    Approve
                  </button>
                  <button type="button" onClick={() => void rollback(m.modelVersionId)}>
                    Rollback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {models.length === 0 && !error ? <p className="muted">Unapproved versions cannot drive production.</p> : null}
      </div>
    </div>
  );
}

export function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [error, setError] = useState('');

  async function load() {
    try {
      const res = await api<ListEnvelope<Vendor>>('/v1/governance/vendors');
      setVendors(res.data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function kill(id: string) {
    try {
      await api(`/v1/governance/vendors/${id}/kill-switch`, { method: 'POST', body: '{}' });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div>
      <h1 className="page-title">Vendor inventory</h1>
      {error ? <div className="banner alert">{error}</div> : null}
      {vendors.some((v) => v.killSwitchActive) ? (
        <div className="banner alert">Outage mode — kill-switch engaged on at least one vendor.</div>
      ) : null}
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Capability</th>
              <th>Concentration</th>
              <th>Failover</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.vendorId}>
                <td>{v.vendorName}</td>
                <td>{v.capability}</td>
                <td>{v.concentrationScore}</td>
                <td className="muted">{v.failoverBehaviour ?? '—'}</td>
                <td>
                  <button type="button" className="pause-btn" onClick={() => void kill(v.vendorId)}>
                    Kill-switch
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ActionsPage() {
  const [rows, setRows] = useState<Action[]>([]);
  const [error, setError] = useState('');

  async function load() {
    try {
      const res = await api<ListEnvelope<Action>>(`/v1/actions?customerId=${DEMO_CUSTOMER_ID}`);
      setRows(res.data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function reverse(id: string) {
    try {
      await api(`/v1/actions/${id}/reverse`, { method: 'POST', body: '{}' });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div>
      <h1 className="page-title">Executed actions</h1>
      {error ? <div className="banner alert">{error}</div> : null}
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Status</th>
              <th>Executed</th>
              <th>Policy</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.actionId}>
                <td className="mono">{a.actionId}</td>
                <td>
                  <span className="chip">{a.status}</span>
                </td>
                <td>{a.executedAt}</td>
                <td className="mono muted">{a.policyVersion ?? '—'}</td>
                <td>
                  {a.status === 'executed' ? (
                    <button type="button" onClick={() => void reverse(a.actionId)}>
                      Reverse
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
