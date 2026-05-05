import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageLayout from '@/components/marketing/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using the Orbis Solutions website.',
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
  capsBox: {
    background: 'var(--color-bg-subtle)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px 24px',
    marginBottom: '16px',
    fontSize: '14px',
    color: 'var(--color-text-body)',
    lineHeight: '1.75',
  } as React.CSSProperties,
}

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      badgeText="Terms of Service"
      lastUpdated="May 5, 2026"
    >

      {/* Important notice callout */}
      <div style={{
        background: 'var(--color-brand-muted)',
        border: '1px solid var(--color-brand-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        marginBottom: '40px',
        fontSize: '14px',
        color: 'var(--color-text-body)',
        lineHeight: '1.75',
      }}>
        <strong style={{ color: 'var(--color-brand)' }}>Important:</strong> Please read these
        Terms of Service carefully before using the Orbis Solutions website or engaging
        Orbis's services. By accessing or using this website, you agree to be bound by these
        Terms.
      </div>

      <h2 style={s.h2}>1. Acceptance of Terms</h2>
      <p style={s.p}>
        These Terms of Service ("Terms") constitute a legally binding agreement between you
        ("you" or "User") and Orbis Solutions ("Orbis," "we," "us," or "our"), a general
        partnership registered in the Province of British Columbia, Canada.
      </p>
      <p style={s.p}>
        By accessing or using the Orbis website located at orbissolutions.ca (the "Website"),
        you acknowledge that you have read, understood, and agree to be bound by these Terms
        and our{' '}
        <Link href="/privacy" style={{ color: 'var(--color-brand)', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        , which is incorporated herein by reference. If you do not agree to these Terms, you
        must immediately cease using the Website.
      </p>
      <p style={s.p}>
        These Terms apply to all visitors, users, and prospective clients of the Website. They
        govern your use of the Website only. The terms and conditions governing Orbis's service
        delivery to clients are set out separately in the applicable Client Service Agreement.
      </p>

      <h2 style={s.h2}>2. About Orbis Solutions</h2>
      <p style={s.p}>
        Orbis Solutions is an artificial intelligence workflow automation company that designs
        and deploys AI-powered business tools, including customer service chatbots, appointment
        booking systems, and automated workflow solutions, for business clients. The Website
        serves as an informational and marketing resource describing Orbis's services and
        facilitating initial contact with prospective clients.
      </p>
      <p style={s.p}>
        Nothing on this Website constitutes a binding offer of services. Engagement of Orbis's
        services requires the execution of a separate written Client Service Agreement.
      </p>

      <h2 style={s.h2}>3. Website Use and Acceptable Conduct</h2>

      <h3 style={s.h3}>3.1 Permitted Use</h3>
      <p style={s.p}>
        You may use this Website for lawful purposes only and in accordance with these Terms.
        You may access and view the Website's content for personal, informational, and business
        evaluation purposes.
      </p>

      <h3 style={s.h3}>3.2 Prohibited Conduct</h3>
      <p style={s.p}>You agree not to:</p>
      <ol style={s.ol}>
        <li style={s.li}>
          Use the Website in any way that violates any applicable federal, provincial, or local
          law or regulation;
        </li>
        <li style={s.li}>
          Transmit or facilitate the transmission of any unsolicited commercial communications,
          spam, or harmful content;
        </li>
        <li style={s.li}>
          Attempt to gain unauthorised access to any part of the Website, its underlying
          systems, or any related networks or servers;
        </li>
        <li style={s.li}>
          Use any automated means (including bots, scrapers, or crawlers) to access, collect,
          or extract content from the Website without Orbis's prior written consent;
        </li>
        <li style={s.li}>
          Impersonate Orbis, any Orbis representative, or any other person or entity;
        </li>
        <li style={s.li}>Upload or transmit viruses, malware, or any other malicious code;</li>
        <li style={s.li}>
          Interfere with or disrupt the integrity or performance of the Website or the data
          contained therein;
        </li>
        <li style={s.li}>
          Engage in any conduct that could damage, disable, overburden, or impair the Website
          or its servers.
        </li>
      </ol>

      <h3 style={s.h3}>3.3 Contact Form</h3>
      <p style={s.p}>
        Information submitted through the Website's contact form is subject to our{' '}
        <Link href="/privacy" style={{ color: 'var(--color-brand)', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        . You agree to provide accurate and truthful information when contacting us and not to
        misrepresent your identity or affiliation.
      </p>

      <h2 style={s.h2}>4. Intellectual Property</h2>

      <h3 style={s.h3}>4.1 Orbis Content</h3>
      <p style={s.p}>
        All content on this Website, including but not limited to text, graphics, logos, icons,
        images, audio clips, digital downloads, data compilations, and software, is the property
        of Orbis Solutions or its content suppliers and is protected by Canadian and international
        copyright, trademark, and other intellectual property laws (collectively, "Orbis
        Content").
      </p>

      <h3 style={s.h3}>4.2 Limited License</h3>
      <p style={s.p}>
        Orbis grants you a limited, non-exclusive, non-transferable, revocable licence to access
        and use the Website and view Orbis Content for your personal, non-commercial,
        informational purposes only. This licence does not permit you to:
      </p>
      <ol style={s.ol}>
        <li style={s.li}>
          Reproduce, distribute, publicly display, or create derivative works of any Orbis
          Content without prior written permission;
        </li>
        <li style={s.li}>Use any Orbis Content for commercial purposes;</li>
        <li style={s.li}>
          Remove or alter any copyright, trademark, or other proprietary notices;
        </li>
        <li style={s.li}>
          Frame or mirror any part of the Website without Orbis's express written consent.
        </li>
      </ol>

      <h3 style={s.h3}>4.3 Trademarks</h3>
      <p style={s.p}>
        "Orbis Solutions" and associated logos and branding are trademarks of Orbis Solutions.
        Nothing on this Website should be construed as granting any licence to use any trademark
        displayed on the Website without the written permission of Orbis or the applicable
        trademark owner.
      </p>

      <h3 style={s.h3}>4.4 Feedback</h3>
      <p style={s.p}>
        If you submit any feedback, suggestions, ideas, or comments regarding the Website or our
        services ("Feedback"), you grant Orbis a non-exclusive, royalty-free, perpetual,
        irrevocable, worldwide licence to use, reproduce, modify, and incorporate such Feedback
        into its products and services without any obligation to compensate you or maintain
        confidentiality.
      </p>

      <h2 style={s.h2}>5. Disclaimer of Warranties</h2>

      <h3 style={s.h3}>5.1 Website Content</h3>
      <div style={s.capsBox}>
        The Website and all content therein are provided on an "as is" and "as available" basis
        without warranties of any kind, either express or implied, including but not limited to
        implied warranties of merchantability, fitness for a particular purpose, accuracy, title,
        or non-infringement.
      </div>

      <h3 style={s.h3}>5.2 No Professional Advice</h3>
      <div style={s.capsBox}>
        The content on this Website is provided for general informational purposes only and does
        not constitute legal, financial, technical, or professional advice of any kind. You
        should not rely on any content on this Website as a substitute for professional advice
        tailored to your specific circumstances. Orbis expressly disclaims any liability arising
        from reliance on Website content.
      </div>

      <h3 style={s.h3}>5.3 Accuracy and Completeness</h3>
      <p style={s.p}>
        Orbis makes reasonable efforts to ensure that content on the Website is accurate and
        current. However, Orbis does not warrant that the Website will be error-free, complete,
        or up-to-date. Orbis reserves the right to correct any errors or omissions at any time
        without notice.
      </p>

      <h3 style={s.h3}>5.4 Third-Party Links</h3>
      <p style={s.p}>
        The Website may contain links to third-party websites. These links are provided for your
        convenience only. Orbis has no control over the content of third-party websites and
        accepts no responsibility for them or for any loss or damage that may arise from your use
        of them. The inclusion of a link does not imply any endorsement by Orbis of the linked
        website.
      </p>

      <h2 style={s.h2}>6. Limitation of Liability</h2>

      <h3 style={s.h3}>6.1 General Limitation</h3>
      <div style={s.capsBox}>
        To the fullest extent permitted by applicable law, in no event shall Orbis Solutions,
        its partners, officers, employees, or agents be liable to you for any indirect,
        incidental, consequential, special, exemplary, or punitive damages of any kind arising
        out of or in connection with your use of, or inability to use, the Website or any
        content thereon, even if Orbis has been advised of the possibility of such damages.
      </div>

      <h3 style={s.h3}>6.2 Cap on Liability</h3>
      <div style={s.capsBox}>
        To the fullest extent permitted by applicable law, Orbis's total aggregate liability to
        you for any claims arising out of or related to these Terms or your use of the Website
        shall not exceed one hundred Canadian dollars (CAD $100.00).
      </div>

      <h3 style={s.h3}>6.3 Exclusions</h3>
      <p style={s.p}>
        Some jurisdictions do not allow the exclusion or limitation of certain warranties or
        liabilities. In such jurisdictions, Orbis's liability is limited to the maximum extent
        permitted by law.
      </p>

      <h2 style={s.h2}>7. Indemnification</h2>
      <p style={s.p}>
        You agree to indemnify, defend, and hold harmless Orbis Solutions and its partners,
        employees, and agents from and against any and all claims, actions, proceedings,
        damages, losses, liabilities, costs, and expenses (including reasonable legal fees)
        arising out of or relating to: (a) your use of or access to the Website; (b) your
        violation of these Terms; (c) your violation of any applicable law or regulation; or
        (d) any content or information you submit, post, or transmit through the Website.
      </p>

      <h2 style={s.h2}>8. Privacy</h2>
      <p style={s.p}>
        Your use of the Website is subject to Orbis's{' '}
        <Link href="/privacy" style={{ color: 'var(--color-brand)', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        , which is incorporated into these Terms by reference. By using the Website, you consent
        to the collection and use of your personal information as described in the Privacy Policy.
      </p>

      <h2 style={s.h2}>9. Availability and Modifications</h2>

      <h3 style={s.h3}>9.1 Website Availability</h3>
      <p style={s.p}>
        Orbis makes no representation that the Website will be available at all times or without
        interruption. The Website may be temporarily unavailable due to maintenance, technical
        issues, or circumstances beyond Orbis's control. Orbis shall not be liable for any loss
        resulting from the Website's unavailability.
      </p>

      <h3 style={s.h3}>9.2 Modifications to Website</h3>
      <p style={s.p}>
        Orbis reserves the right to modify, suspend, or discontinue the Website or any part
        thereof at any time, with or without notice, and without liability to you.
      </p>

      <h3 style={s.h3}>9.3 Modifications to Terms</h3>
      <p style={s.p}>
        Orbis reserves the right to modify these Terms at any time. Changes will be effective
        upon posting of the updated Terms to the Website with a revised "Last Updated" date.
        Your continued use of the Website following the posting of changes constitutes your
        acceptance of the revised Terms. If you do not agree to any revised Terms, you must
        cease using the Website.
      </p>

      <h2 style={s.h2}>10. Governing Law and Jurisdiction</h2>
      <p style={s.p}>
        These Terms shall be governed by and construed in accordance with the laws of the
        Province of British Columbia and the federal laws of Canada applicable therein, without
        regard to its conflict of laws principles. Any dispute arising out of or in connection
        with these Terms or your use of the Website shall be subject to the exclusive
        jurisdiction of the courts of the Province of British Columbia.
      </p>

      <h2 style={s.h2}>11. Services Governed by Separate Agreement</h2>
      <p style={s.p}>
        For greater clarity, these Terms govern your use of the Website only. The engagement,
        delivery, scope, payment, intellectual property, liability, and all other terms and
        conditions relating to Orbis's AI automation services are governed exclusively by the
        written Client Service Agreement executed between Orbis and each client. In the event
        of any conflict between these Terms and a Client Service Agreement, the Client Service
        Agreement shall prevail with respect to the relevant services.
      </p>

      <h2 style={s.h2}>12. General Provisions</h2>

      <h3 style={s.h3}>12.1 Entire Agreement</h3>
      <p style={s.p}>
        These Terms, together with the{' '}
        <Link href="/privacy" style={{ color: 'var(--color-brand)', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        , constitute the entire agreement between you and Orbis with respect to your use of the
        Website and supersede all prior agreements, understandings, and representations relating
        to the same.
      </p>

      <h3 style={s.h3}>12.2 Severability</h3>
      <p style={s.p}>
        If any provision of these Terms is held to be invalid, illegal, or unenforceable under
        applicable law, that provision shall be modified to the minimum extent necessary to make
        it enforceable or severed if modification is not possible, and all remaining provisions
        shall remain in full force and effect.
      </p>

      <h3 style={s.h3}>12.3 Waiver</h3>
      <p style={s.p}>
        Failure by Orbis to enforce any provision of these Terms shall not constitute a waiver
        of Orbis's right to enforce that provision or any other provision in the future.
      </p>

      <h3 style={s.h3}>12.4 No Assignment</h3>
      <p style={s.p}>
        You may not assign or transfer your rights or obligations under these Terms without
        Orbis's prior written consent. Orbis may assign its rights and obligations under these
        Terms freely.
      </p>

      <h3 style={s.h3}>12.5 Contact</h3>
      <p style={s.p}>For questions or concerns regarding these Terms, please contact:</p>
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

    </LegalPageLayout>
  )
}
