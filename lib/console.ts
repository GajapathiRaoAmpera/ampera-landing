export type Status = "done" | "running" | "queued" | "approval";
export type Agent = {
  id: string;
  tab: string;
  prompt: string;
  steps: { label: string; status: Status }[];
};

// Illustrative flows written from the real accelerator / case-study descriptions. No metrics, no client data.
export const agents: Agent[] = [
  {
    id: "market",
    tab: "Market Intelligence",
    prompt: "Track competitor pricing and tell sales what changed.",
    steps: [
      { label: "collect_pricing_sources", status: "done" },
      { label: "detect_price_changes", status: "done" },
      { label: "draft_pricing_actions", status: "running" },
      { label: "brief_sales_team", status: "approval" },
      { label: "update_account_guidance", status: "queued" },
    ],
  },
  {
    id: "accessibility",
    tab: "Accessibility",
    prompt: "Audit our web pages and prepare an accessibility conformance report.",
    steps: [
      { label: "scan_pages_and_flows", status: "done" },
      { label: "prioritize_issues", status: "done" },
      { label: "guide_remediation", status: "running" },
      { label: "draft_vpat_acr", status: "queued" },
      { label: "expert_review", status: "approval" },
    ],
  },
  {
    id: "soc",
    tab: "SOC Response",
    prompt: "Triage new security alerts and propose remediation.",
    steps: [
      { label: "ingest_alerts", status: "done" },
      { label: "correlate_and_rank_threats", status: "done" },
      { label: "propose_remediation", status: "running" },
      { label: "approve_response_action", status: "approval" },
      { label: "report_coverage", status: "queued" },
    ],
  },
  {
    id: "engineering",
    tab: "Engineering Analytics",
    prompt: "Find which parameters drive failures in the latest test runs.",
    steps: [
      { label: "ingest_test_logs", status: "done" },
      { label: "apply_standard_schema", status: "done" },
      { label: "run_sensitivity_analysis", status: "running" },
      { label: "flag_anomalies", status: "queued" },
      { label: "engineer_review", status: "approval" },
    ],
  },
];
