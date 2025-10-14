interface GuardrailsGovernanceProps {
  hasApprovalWorkflows: boolean;
}

export default function GuardrailsGovernance({ hasApprovalWorkflows }: GuardrailsGovernanceProps) {
  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-8">Guardrails & Governance</h2>
      <p className="text-lg text-gray-400 mb-8">
        AI Workers operate within enterprise-grade controls, ensuring compliance, security, and audit trails.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Approval Workflows */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-blue-900/30 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Approval Workflows</h3>
              <p className="text-sm text-gray-400">
                AI Workers integrate with your existing approval processes. They can route requests through managers,
                security teams, or compliance officers based on your policies.
              </p>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-300">Multi-level approval chains</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-300">Conditional routing rules</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-300">Auto-escalation for timeouts</span>
            </div>
          </div>
        </div>

        {/* Role-Based Policies */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-purple-900/30 rounded-lg">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Role-Based Access Control</h3>
              <p className="text-sm text-gray-400">
                Define what AI Workers can and cannot do based on request type, user role, department, and resource sensitivity.
              </p>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-300">Granular permission policies</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-300">Department-level restrictions</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-300">Resource sensitivity tagging</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Guardrails */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
        <h3 className="font-bold text-white mb-6">Additional Enterprise Guardrails</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Audit Logs */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h4 className="font-semibold text-white">Immutable Audit Logs</h4>
            </div>
            <p className="text-sm text-gray-400">
              Every action logged with timestamp, user context, and outcome. SIEM-compatible exports.
            </p>
          </div>

          {/* Rate Limiting */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="font-semibold text-white">Rate Limiting</h4>
            </div>
            <p className="text-sm text-gray-400">
              Configurable thresholds prevent runaway automation. Circuit breakers for anomaly detection.
            </p>
          </div>

          {/* Data Residency */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="font-semibold text-white">Data Residency</h4>
            </div>
            <p className="text-sm text-gray-400">
              Choose deployment region. PII handling complies with GDPR, CCPA, and industry standards.
            </p>
          </div>
        </div>
      </div>

      {/* Current State Indicator */}
      {hasApprovalWorkflows ? (
        <div className="mt-6 bg-green-900/20 border border-green-800/30 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-semibold text-white mb-2">Your Organization is Ready</h3>
              <p className="text-sm text-gray-300">
                You already have approval workflows in place. AI Workers will integrate seamlessly with your existing governance model.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-semibold text-white mb-2">Recommendation: Add Approval Workflows</h3>
              <p className="text-sm text-gray-300">
                We recommend implementing basic approval routing before deploying AI Workers. This ensures proper governance
                and gives stakeholders confidence in autonomous operations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
