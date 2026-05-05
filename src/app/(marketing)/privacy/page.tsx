import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageLayout from '@/components/marketing/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Orbis Solutions collects, uses, and protects your personal information.',
}

const s = {
  h2: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    marginTop: '56px',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--color-border)',
    letterSpacing: '-0.01em',
  } as React.CSSProperties,
  h3: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    marginTop: '32px',
    marginBottom: '12px',
  } as React.CSSProperties,
  p: {
    color: 'var(--color-text-body)',
    fontSize: '16px',
    lineHeight: '1.75',
    marginBottom: '16px',
  } as React.CSSProperties,
  ol: {
    color: 'var(--color-text-body)',
    fontSize: '16px',
    lineHeight: '1.75',
    paddingLeft: '28px',
    marginBottom: '16px',
    listStyleType: 'lower-alpha',
  } as React.CSSProperties,
  li: {
    marginBottom: '10px',
  } as React.CSSProperties,
}

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      badgeText="Privacy Policy"
      lastUpdated="May 5, 2026"
    >

      <h2 style={s.h2}>1. Introduction and Scope</h2>
      <p style={s.p}>
        Orbis Solutions ("Orbis," "we," "us," or "our") is a general partnership registered in the
        Province of British Columbia, Canada, providing artificial intelligence workflow automation
        services to businesses. This Privacy Policy explains how Orbis collects, uses, discloses,
        and protects personal information in the course of operating its website (orbissolutions.ca)
        and delivering its services to clients.
      </p>
      <p style={s.p}>This Policy applies to:</p>
      <ol style={s.ol}>
        <li style={s.li}>Visitors to the Orbis website (orbissolutions.ca);</li>
        <li style={s.li}>Businesses that engage Orbis as clients ("Clients"); and</li>
        <li style={s.li}>
          End-customers of Orbis's Clients whose personal information is processed through Orbis's
          AI systems in the course of service delivery ("End-Customers").
        </li>
      </ol>
      <p style={s.p}>
        Orbis is subject to the Personal Information Protection Act (British Columbia) ("PIPA BC")
        as its primary applicable privacy legislation, and to the Personal Information Protection
        and Electronic Documents Act (Canada) ("PIPEDA") in respect of personal information that
        crosses provincial or national borders in the course of commercial activity. Both laws
        impose substantially similar obligations, and Orbis's practices are designed to comply with
        both frameworks simultaneously.
      </p>
      <p style={s.p}>
        If you have questions about this Policy or wish to exercise your privacy rights, please
        contact us using the information provided in Section 11.
      </p>

      <h2 style={s.h2}>2. Roles: Data Controller and Data Processor</h2>
      <p style={s.p}>
        In respect of personal information collected directly from website visitors and prospective
        clients, Orbis acts as a data controller — it determines the purposes and means of
        processing.
      </p>
      <p style={s.p}>
        In respect of personal information belonging to End-Customers that is processed through
        Orbis's AI systems on behalf of Clients, Orbis acts as a data processor — it processes
        such information solely on the instructions of the Client, who is the data controller.
        Clients are responsible for ensuring they have the appropriate legal basis and consents
        necessary to share their End-Customers' personal information with Orbis for the purpose
        of service delivery.
      </p>

      <h2 style={s.h2}>3. Personal Information We Collect</h2>

      <h3 style={s.h3}>3.1 Information Collected from Website Visitors</h3>
      <p style={s.p}>When you visit orbissolutions.ca, we may collect:</p>
      <ol style={s.ol}>
        <li style={s.li}>
          Contact form submissions, including your name, email address, business name, and the
          content of your message;
        </li>
        <li style={s.li}>
          Technical information automatically collected by web servers, including IP address,
          browser type, operating system, referring URL, and pages visited;
        </li>
        <li style={s.li}>Cookie and similar tracking data, as described in Section 9 below.</li>
      </ol>
      <p style={s.p}>
        We do not knowingly collect sensitive personal information from website visitors. If you
        are under the age of 18, please do not submit personal information through our website.
      </p>

      <h3 style={s.h3}>3.2 Information Collected from Clients</h3>
      <p style={s.p}>When a business engages Orbis as a client, we may collect:</p>
      <ol style={s.ol}>
        <li style={s.li}>
          Business contact information, including the names, email addresses, and phone numbers
          of authorised representatives;
        </li>
        <li style={s.li}>
          Billing and payment information (processed securely via Stripe; Orbis does not store
          credit card numbers);
        </li>
        <li style={s.li}>
          Business operational information necessary to configure and deliver our services,
          including service descriptions, pricing, policies, and frequently asked questions
          provided to train the AI knowledge base;
        </li>
        <li style={s.li}>
          Google Calendar access credentials and calendar data, to the extent necessary to power
          the automated appointment booking system.
        </li>
      </ol>

      <h3 style={s.h3}>3.3 End-Customer Information Processed on Behalf of Clients</h3>
      <p style={s.p}>
        Through the AI customer service chatbot and appointment booking system deployed for
        Clients, Orbis may process personal information belonging to End-Customers, including:
      </p>
      <ol style={s.ol}>
        <li style={s.li}>Names and contact details (email addresses, phone numbers);</li>
        <li style={s.li}>Appointment booking details (date, time, service type, address);</li>
        <li style={s.li}>
          Conversational data — the content of interactions between End-Customers and the AI
          chatbot;
        </li>
        <li style={s.li}>
          Google Review request data (email addresses used to deliver automated post-service
          review requests).
        </li>
      </ol>
      <p style={s.p}>
        Orbis processes End-Customer information solely for the purpose of delivering the
        contracted services to the Client. Orbis does not use End-Customer information for its
        own marketing, profiling, or analytical purposes.
      </p>

      <h2 style={s.h2}>4. How We Use Personal Information</h2>

      <h3 style={s.h3}>4.1 Website Visitors</h3>
      <p style={s.p}>We use personal information collected from website visitors to:</p>
      <ol style={s.ol}>
        <li style={s.li}>Respond to enquiries submitted through the contact form;</li>
        <li style={s.li}>Improve the content and functionality of our website;</li>
        <li style={s.li}>Comply with applicable legal obligations.</li>
      </ol>

      <h3 style={s.h3}>4.2 Clients</h3>
      <p style={s.p}>We use personal information collected from Clients to:</p>
      <ol style={s.ol}>
        <li style={s.li}>Enter into and administer our service agreement;</li>
        <li style={s.li}>Deliver, configure, and maintain the contracted AI services;</li>
        <li style={s.li}>Process billing and payments via Stripe;</li>
        <li style={s.li}>Communicate about service performance, updates, and support;</li>
        <li style={s.li}>Comply with applicable legal and regulatory obligations.</li>
      </ol>

      <h3 style={s.h3}>4.3 End-Customers (on behalf of Clients)</h3>
      <p style={s.p}>We process End-Customer information solely to:</p>
      <ol style={s.ol}>
        <li style={s.li}>Operate the AI chatbot on behalf of the Client;</li>
        <li style={s.li}>Facilitate appointment booking, rescheduling, and cancellation;</li>
        <li style={s.li}>Send automated appointment reminders;</li>
        <li style={s.li}>Send automated post-service Google Review requests;</li>
        <li style={s.li}>Fulfil any other function expressly contracted with the Client.</li>
      </ol>

      <h2 style={s.h2}>5. Legal Basis for Processing</h2>
      <p style={s.p}>
        Under PIPA BC and PIPEDA, Orbis relies on the following bases for collecting and using
        personal information:
      </p>
      <ol style={s.ol}>
        <li style={s.li}>
          Consent — for website contact forms and marketing communications, where individuals
          voluntarily provide their information;
        </li>
        <li style={s.li}>
          Contract — where processing is necessary to perform our obligations under a client
          service agreement;
        </li>
        <li style={s.li}>
          Legitimate interests — for website analytics and security purposes, where these
          interests are not overridden by the interests or rights of individuals;
        </li>
        <li style={s.li}>Legal obligation — where required by applicable law.</li>
      </ol>
      <p style={s.p}>
        End-Customers' personal information is processed on the basis of the Client's instructions
        and the Client's legal basis for collection (which Clients are responsible for ensuring
        is valid).
      </p>

      <h2 style={s.h2}>6. Disclosure of Personal Information to Third Parties</h2>
      <p style={s.p}>
        Orbis does not sell, rent, or trade personal information to any third party. We disclose
        personal information only as follows:
      </p>

      <h3 style={s.h3}>6.1 Third-Party Service Providers</h3>
      <p style={s.p}>
        Orbis uses the following third-party platforms to deliver its services. These platforms
        process personal information solely on Orbis's behalf and for the purposes described:
      </p>
      <ol style={s.ol}>
        <li style={s.li}>
          <strong>OpenAI</strong> (OpenAI, L.L.C., United States) — Powers the GPT-4o language
          model that generates AI chatbot responses. Conversational data is transmitted to
          OpenAI's API for processing. OpenAI's data processing is governed by its API Data
          Usage Policies.
        </li>
        <li style={s.li}>
          <strong>Supabase</strong> (Supabase Inc., United States) — Provides the vector
          database (pgvector) used to store the AI knowledge base and conversation logs. Data
          is stored on Supabase's cloud infrastructure.
        </li>
        <li style={s.li}>
          <strong>Google LLC</strong> (United States) — Google Calendar API is used to check
          availability and create, update, and cancel appointments. Google Drive is used
          internally by Orbis for file storage. Google's services are governed by Google's
          Privacy Policy and, where applicable, Google Workspace Terms.
        </li>
        <li style={s.li}>
          <strong>Stripe</strong> (Stripe, Inc., United States) — Processes Client billing and
          payment information. Stripe's data practices are governed by Stripe's Privacy Policy.
          Orbis does not store payment card data.
        </li>
      </ol>
      <p style={s.p}>
        By engaging Orbis's services, Clients acknowledge and consent to the use of these
        third-party platforms. Personal information transmitted to these platforms may be stored
        and processed outside Canada. Orbis takes reasonable contractual and technical steps to
        ensure these providers maintain appropriate data protection standards.
      </p>

      <h3 style={s.h3}>6.2 Legal Disclosure</h3>
      <p style={s.p}>
        Orbis may disclose personal information if required to do so by law, regulation, court
        order, or governmental authority, or where Orbis reasonably believes disclosure is
        necessary to protect the rights, property, or safety of Orbis, its clients, or others.
      </p>

      <h3 style={s.h3}>6.3 Business Transfers</h3>
      <p style={s.p}>
        In the event of a merger, acquisition, or sale of all or substantially all of Orbis's
        business assets, personal information may be transferred to the acquiring party, subject
        to equivalent privacy protections.
      </p>

      <h2 style={s.h2}>7. Data Retention</h2>

      <h3 style={s.h3}>7.1 Website Visitor Information</h3>
      <p style={s.p}>
        Contact form submissions and related correspondence are retained for as long as necessary
        to respond to the enquiry and for a reasonable period thereafter for record-keeping
        purposes, not to exceed three (3) years unless a longer period is required by law.
      </p>

      <h3 style={s.h3}>7.2 Client Information</h3>
      <p style={s.p}>
        Client information is retained for the duration of the active client relationship and
        for a period of seven (7) years following the end of the relationship, to satisfy tax,
        accounting, and legal record-keeping obligations under applicable Canadian law.
      </p>

      <h3 style={s.h3}>7.3 End-Customer Information (Active Contracts)</h3>
      <p style={s.p}>
        Conversational logs and appointment data generated through the AI systems are retained
        for the duration of the active client contract. Upon termination or expiration of a
        client contract, the Client has thirty (30) days to request an export of End-Customer
        data held by Orbis. Following the expiry of this window, or upon completion of an
        approved export, all End-Customer data is permanently and securely deleted.
      </p>
      <p style={{
        ...s.p,
        background: 'var(--color-bg-subtle)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        fontSize: '14px',
        color: 'var(--color-text-muted)',
      }}>
        <strong style={{ color: 'var(--color-text-body)' }}>Note:</strong> Orbis intends to
        implement automated rolling deletion of conversational logs older than ninety (90) days
        as a future operational enhancement. This Policy will be updated to reflect that change
        once implemented.
      </p>

      <h3 style={s.h3}>7.4 Secure Deletion</h3>
      <p style={s.p}>
        When personal information is no longer required, Orbis deletes or anonymises it in a
        secure manner designed to prevent unauthorised recovery.
      </p>

      <h2 style={s.h2}>8. Security Safeguards</h2>
      <p style={s.p}>
        Orbis employs reasonable technical and organisational safeguards to protect personal
        information against unauthorised access, disclosure, alteration, or destruction, including:
      </p>
      <ol style={s.ol}>
        <li style={s.li}>
          Access controls restricting data access to authorised Orbis personnel only;
        </li>
        <li style={s.li}>
          Database-level access controls (Row Level Security) applied within Supabase to ensure
          data isolation between clients;
        </li>
        <li style={s.li}>
          Encryption of personal data in transit using industry-standard TLS (Transport Layer
          Security) protocols for all connections to third-party APIs and internal systems;
        </li>
        <li style={s.li}>
          Internal file storage on enterprise-grade cloud infrastructure (Google Drive) with
          built-in encryption at rest;
        </li>
        <li style={s.li}>
          Self-hosted workflow automation server with access limited to authorised personnel.
        </li>
      </ol>
      <p style={s.p}>
        No system of data security is impenetrable. Orbis cannot guarantee the absolute security
        of personal information. In the event of a security breach involving personal information
        that creates a real risk of significant harm, Orbis will notify affected individuals and
        the Office of the Information and Privacy Commissioner for BC (OIPC BC) as required by
        applicable law.
      </p>

      <h2 style={s.h2}>9. Cookies and Tracking Technologies</h2>
      <p style={s.p}>
        The Orbis website may use cookies and similar technologies. Cookies are small data files
        stored on your device. We use cookies for the following purposes:
      </p>
      <ol style={s.ol}>
        <li style={s.li}>
          Essential cookies — necessary for the website to function correctly (e.g., session
          management);
        </li>
        <li style={s.li}>
          Analytics cookies — to understand how visitors interact with our website (e.g., pages
          visited, time on site). Analytics data is aggregated and not linked to individual
          identities.
        </li>
      </ol>
      <p style={s.p}>
        Under PIPA BC, implied consent is generally sufficient for routine cookie usage that is
        not sensitive in nature. By continuing to use our website after reviewing this notice,
        you consent to our use of cookies as described. You may disable cookies through your
        browser settings, though doing so may affect the functionality of certain parts of our
        website.
      </p>
      <p style={s.p}>
        We do not use cookies for targeted advertising. Orbis products are ad-free.
      </p>

      <h2 style={s.h2}>10. Your Privacy Rights</h2>
      <p style={s.p}>
        Under PIPA BC and PIPEDA, individuals have the right to:
      </p>
      <ol style={s.ol}>
        <li style={s.li}>Request access to personal information Orbis holds about them;</li>
        <li style={s.li}>
          Request correction of inaccurate or incomplete personal information;
        </li>
        <li style={s.li}>
          Withdraw consent to processing, subject to legal or contractual restrictions;
        </li>
        <li style={s.li}>Request information about Orbis's privacy practices.</li>
      </ol>
      <p style={s.p}>
        End-Customers wishing to exercise rights in respect of personal information held by
        Orbis on behalf of a Client should, where possible, direct their request to the relevant
        Client (as data controller). Orbis will assist Clients in responding to such requests as
        required by our contractual obligations.
      </p>
      <p style={s.p}>
        To exercise any of the rights described above, please submit a written request to the
        contact details in Section 11. Orbis will respond within thirty (30) calendar days. We
        may require verification of identity before processing access or correction requests.
      </p>

      <h2 style={s.h2}>11. Contact Information and Privacy Officer</h2>
      <p style={s.p}>
        For questions, concerns, or requests relating to this Privacy Policy or Orbis's handling
        of personal information, please contact:
      </p>
      <div style={{
        background: 'var(--color-bg-subtle)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        marginBottom: '20px',
        fontSize: '15px',
        color: 'var(--color-text-body)',
        lineHeight: '1.75',
      }}>
        <strong style={{ color: 'var(--color-text-primary)' }}>Orbis Solutions</strong><br />
        Kelowna, British Columbia, Canada<br />
        Email:{' '}
        <a href="mailto:info@orbissolutions.ca" style={{ color: 'var(--color-brand)', textDecoration: 'underline' }}>
          info@orbissolutions.ca
        </a>
      </div>
      <p style={s.p}>
        As a general partnership, both partners share accountability for privacy compliance. For
        formal privacy complaints, if you are not satisfied with Orbis's response, you have the
        right to contact the Office of the Information and Privacy Commissioner for British
        Columbia (OIPC BC) at{' '}
        <a href="https://www.oipc.bc.ca" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand)', textDecoration: 'underline' }}>
          www.oipc.bc.ca
        </a>.
      </p>

      <h2 style={s.h2}>12. Changes to This Policy</h2>
      <p style={s.p}>
        Orbis reserves the right to update or amend this Privacy Policy at any time. Material
        changes will be communicated by posting an updated version on our website with a revised
        "Last Updated" date. Where changes affect the processing of personal information in a
        material way, we will provide additional notice as required by applicable law. Continued
        use of our website or services following the posting of changes constitutes acceptance
        of the revised Policy.
      </p>

      <h2 style={s.h2}>13. Governing Law</h2>
      <p style={s.p}>
        This Privacy Policy is governed by the laws of the Province of British Columbia and the
        federal laws of Canada applicable therein, including PIPA BC and PIPEDA.
      </p>

      <p style={{ ...s.p, marginTop: '40px', color: 'var(--color-text-muted)', fontSize: '14px' }}>
        For our{' '}
        <Link href="/terms" style={{ color: 'var(--color-brand)', textDecoration: 'underline' }}>
          Terms of Service
        </Link>
        , please visit the dedicated page.
      </p>

    </LegalPageLayout>
  )
}
