import type { Metadata } from "next";
import { Target, Lightbulb, Heart, Shield, Zap, Globe, Brain, Wrench, Rocket } from "lucide-react";
import { FadeUp, Stagger, StaggerItem } from "@/components/marketing/motion";

export const metadata: Metadata = {
  title: "About Orbis Solutions",
  description:
    "Learn about Orbis Solutions — done-for-you AI agents for service businesses.",
};

const teamAttributes = [
  {
    icon: Brain,
    title: "AI & Automation",
    description: "Deep expertise in language models, integrations, and workflow design that actually holds up in production.",
  },
  {
    icon: Wrench,
    title: "Built for Service Businesses",
    description: "Every system we ship is tailored to trades, contractors, and field services — not generic SaaS demos.",
  },
  {
    icon: Rocket,
    title: "End-to-End Delivery",
    description: "We handle the full build — from discovery to launch to ongoing management. You don't need to coordinate anyone.",
  },
];

const values = [
  {
    icon: Target,
    title: "Results First",
    description:
      "We measure success by the tangible business outcomes we deliver, not by the sophistication of our models.",
  },
  {
    icon: Lightbulb,
    title: "Intellectual Honesty",
    description:
      "We tell clients what they need to hear, not what they want to hear. Clear-eyed analysis drives better decisions.",
  },
  {
    icon: Heart,
    title: "Client Partnership",
    description:
      "We build long-term partnerships, not transactional engagements. Your success is our success.",
  },
  {
    icon: Shield,
    title: "Responsible AI",
    description:
      "We champion ethical AI development — transparent, fair, auditable, and aligned with human values.",
  },
  {
    icon: Zap,
    title: "Speed to Value",
    description:
      "We move with urgency. Rapid iteration and quick wins build confidence while larger transformations take shape.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description:
      "AI opportunities are global. Our team brings diverse expertise across geographies, industries, and cultures.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "120px 0 80px", background: "var(--color-bg)" }}>
        <Stagger
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <StaggerItem>
            <span
              className="badge-accent"
              style={{ display: "inline-flex", marginBottom: "20px" }}
            >
              About Orbis Solutions
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1
              className="t-h1"
              style={{ color: "var(--text-primary)", marginBottom: "20px" }}
            >
              We exist to make AI work for every{" "}
              <span className="text-gradient">service business</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="t-body-lg" style={{ color: "var(--text-secondary)" }}>
              Founded in Canada, Orbis Solutions emerged from a simple
              observation: small service businesses were losing jobs every night
              to unanswered calls and slow follow-up. We built Orbis to close that
              gap — done-for-you AI agents that never sleep.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Mission */}
      <section
        style={{
          padding: "80px 0",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "64px",
              alignItems: "center",
            }}
            className="about-grid"
          >
            <FadeUp>
              <span
                className="badge-accent"
                style={{ display: "inline-flex", marginBottom: "16px" }}
              >
                Our Mission
              </span>
              <h2
                className="t-h2"
                style={{
                  color: "var(--text-primary)",
                  marginBottom: "20px",
                  marginTop: "16px",
                }}
              >
                Giving service businesses an edge they could only get by hiring
                someone
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  color: "var(--text-secondary)",
                  fontSize: "16px",
                  lineHeight: 1.7,
                }}
              >
                <p>
                  For too long, the transformative power of AI has been
                  accessible only to large technology companies with massive
                  engineering teams. Orbis Solutions is changing that.
                </p>
                <p>
                  Our mission is to give every service business — regardless of
                  size — a fully managed AI agent that handles the customer
                  interactions that fall through the cracks after hours.
                </p>
                <p>
                  We believe AI should feel like a trusted team member, not a
                  tool. The best outcomes happen when technology handles the
                  routine so people can focus on the work that matters.
                </p>
              </div>
            </FadeUp>
            <Stagger
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {[
                { value: "24/7", label: "Always-on availability" },
                { value: "2–4 wks", label: "Average time to launch" },
                { value: "62%", label: "Calls unanswered after hours" },
                { value: "3×", label: "More leads closed with fast response" },
              ].map((stat, i) => (
                <StaggerItem key={i}>
                  <div
                    style={{
                      background: "var(--color-bg)",
                      border: "1px solid var(--border-base)",
                      borderRadius: "var(--r-lg)",
                      padding: "24px",
                      textAlign: "center",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "var(--color-brand)",
                        fontVariantNumeric: "tabular-nums",
                        marginBottom: "6px",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.4,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
        <style>{`.about-grid { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Team */}
      <section
        id="team"
        style={{
          padding: "96px 0",
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
        >
          <FadeUp style={{ textAlign: "center", marginBottom: "56px" }}>
            <span
              className="badge-accent"
              style={{ display: "inline-flex", marginBottom: "16px" }}
            >
              Our Team
            </span>
            <h2
              className="t-h2"
              style={{ color: "var(--text-primary)", marginTop: "16px", marginBottom: "20px" }}
            >
              Built by people who know what they're doing
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "17px",
                lineHeight: 1.7,
                maxWidth: "640px",
                margin: "0 auto",
              }}
            >
              Orbis is a small, focused team with deep experience in AI engineering, workflow
              automation, and building tools that service businesses actually use. We don't do
              org charts — we do the work.
            </p>
          </FadeUp>
          <Stagger
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
            className="values-grid"
          >
            {teamAttributes.map((attr, i) => (
              <StaggerItem key={i}>
                <div
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--border-base)",
                    borderRadius: "var(--r-lg)",
                    padding: "28px",
                    height: "100%",
                  }}
                >
                  <div className="icon-box" style={{ marginBottom: "16px" }}>
                    <attr.icon style={{ width: "20px", height: "20px" }} />
                  </div>
                  <h3
                    style={{
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      fontSize: "15px",
                      marginBottom: "8px",
                    }}
                  >
                    {attr.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {attr.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Values */}
      <section
        id="values"
        style={{ padding: "96px 0", borderTop: "1px solid var(--border-subtle)" }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
        >
          <FadeUp style={{ textAlign: "center", marginBottom: "56px" }}>
            <span
              className="badge-accent"
              style={{ display: "inline-flex", marginBottom: "16px" }}
            >
              Values
            </span>
            <h2
              className="t-h2"
              style={{ color: "var(--text-primary)", marginTop: "16px" }}
            >
              What we stand for
            </h2>
          </FadeUp>
          <Stagger
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
            className="values-grid"
          >
            {values.map((value, i) => (
              <StaggerItem key={i}>
                <div
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--border-base)",
                    borderRadius: "var(--r-lg)",
                    padding: "28px",
                    height: "100%",
                  }}
                >
                  <div className="icon-box" style={{ marginBottom: "16px" }}>
                    <value.icon style={{ width: "20px", height: "20px" }} />
                  </div>
                  <h3
                    className="t-h4"
                    style={{ color: "var(--text-primary)", marginBottom: "8px" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <style>{`
        .values-grid {
          @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr) !important; }
          @media (max-width: 600px) { grid-template-columns: 1fr !important; }
        }
        .about-grid {
          @media (max-width: 768px) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
