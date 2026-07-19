import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Lightbulb,
  Heart,
  Shield,
  Brain,
  Wrench,
  Rocket,
  MapPin,
} from "lucide-react";
import { FadeUp, Stagger, StaggerItem } from "@/components/marketing/motion";

export const metadata: Metadata = {
  title: "About Orbis Solutions",
  description:
    "Orbis Solutions is a British Columbia team building done-for-you AI agents for service businesses.",
};

const teamAttributes = [
  {
    icon: Brain,
    title: "AI & Automation",
    description:
      "Deep expertise in language models, integrations, and workflow design that holds up in production, not just demos.",
  },
  {
    icon: Wrench,
    title: "Built for Service Businesses",
    description:
      "Every system we ship is tailored to trades, contractors, and field services — not generic SaaS templates.",
  },
  {
    icon: Rocket,
    title: "End-to-End Delivery",
    description:
      "We handle the full build — from discovery to launch to ongoing management. You don't coordinate anyone.",
  },
];

const values = [
  {
    icon: Target,
    title: "Results First",
    description:
      "We measure success by tangible business outcomes — booked jobs, captured leads, hours reclaimed — not model sophistication.",
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
      "We build long-term partnerships, not transactional engagements. When your business does better, we do better.",
  },
  {
    icon: Shield,
    title: "Responsible AI",
    description:
      "We build systems that are transparent, auditable, and aligned with your business — not black boxes you have to trust blindly.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--color-bg)" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          padding: "96px 0 72px",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 55% at 50% 0%, rgba(65, 105, 255, 0.06) 0%, rgba(65, 105, 255, 0) 70%)",
            pointerEvents: "none",
          }}
        />
        <Stagger
          style={{
            position: "relative",
            maxWidth: "820px",
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <StaggerItem>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--color-brand-muted)",
                color: "var(--color-brand)",
                border: "1px solid var(--color-brand-border)",
                borderRadius: "var(--radius-pill)",
                fontSize: "12px",
                fontWeight: 600,
                padding: "4px 14px",
                letterSpacing: "0.04em",
                marginBottom: "20px",
              }}
            >
              <MapPin style={{ width: "12px", height: "12px" }} />
              Based in British Columbia, Canada
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1
              style={{
                fontSize: "clamp(34px, 4.4vw, 52px)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.028em",
                lineHeight: 1.08,
                marginBottom: "20px",
              }}
            >
              We build AI that actually works for{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #4169ff 0%, #6b8eff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                service businesses
              </span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p
              style={{
                fontSize: "17px",
                color: "var(--color-text-muted)",
                lineHeight: 1.65,
                maxWidth: "620px",
                margin: "0 auto",
              }}
            >
              Orbis Solutions was started with a simple observation: service
              businesses were losing jobs every night to unanswered calls and
              slow follow-up. We built Orbis to close that gap — done-for-you AI
              agents that never sleep, tailored to how your business actually
              operates.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Mission */}
      <section
        style={{
          padding: "88px 0",
          background: "var(--color-bg-subtle)",
          borderTop: "1px solid var(--color-border-subtle)",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "72px",
              alignItems: "center",
            }}
            className="about-grid"
          >
            <FadeUp>
              <p
                className="eyebrow"
                style={{ marginBottom: "14px", color: "var(--color-brand)" }}
              >
                Our Mission
              </p>
              <h2
                style={{
                  fontSize: "clamp(28px, 3.2vw, 40px)",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.14,
                  marginBottom: "20px",
                }}
              >
                Giving service businesses an edge they could only get by hiring
                someone.
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  color: "var(--color-text-body)",
                  fontSize: "16px",
                  lineHeight: 1.7,
                }}
              >
                <p>
                  For too long, the transformative power of AI has been
                  accessible only to large companies with dedicated engineering
                  teams. Orbis Solutions exists to change that.
                </p>
                <p>
                  Our mission is to give every service business — regardless of
                  size — a fully managed AI agent that handles the customer
                  interactions falling through the cracks after hours.
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
                { value: "100%", label: "Built and managed by our team" },
                { value: "BC", label: "Canadian-owned and operated" },
              ].map((stat, i) => (
                <StaggerItem key={i}>
                  <div
                    style={{
                      background: "#ffffff",
                      border: "1px solid var(--color-border)",
                      borderRadius: "14px",
                      padding: "26px 20px",
                      textAlign: "center",
                      height: "100%",
                      boxShadow: "0 1px 3px rgba(15, 23, 41, 0.03)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "30px",
                        fontWeight: 700,
                        color: "var(--color-brand)",
                        fontVariantNumeric: "tabular-nums",
                        marginBottom: "8px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--color-text-muted)",
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
      </section>

      {/* Team */}
      <section
        id="team"
        style={{
          padding: "104px 0",
          background: "#ffffff",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
        >
          <FadeUp style={{ textAlign: "center", marginBottom: "56px" }}>
            <p
              className="eyebrow"
              style={{ marginBottom: "12px", color: "var(--color-brand)" }}
            >
              Our Team
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 3.2vw, 40px)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.14,
                marginBottom: "18px",
              }}
            >
              Built by people who know what they&apos;re doing.
            </h2>
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "16px",
                lineHeight: 1.65,
                maxWidth: "620px",
                margin: "0 auto",
              }}
            >
              Orbis is a small, focused team with deep experience in AI
              engineering, workflow automation, and building tools that service
              businesses actually use. We don&apos;t do org charts — we do the
              work.
            </p>
          </FadeUp>
          <Stagger
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
            className="about-cards-grid"
          >
            {teamAttributes.map((attr, i) => (
              <StaggerItem key={i}>
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--color-border)",
                    borderRadius: "16px",
                    padding: "28px",
                    height: "100%",
                    boxShadow: "0 1px 3px rgba(15, 23, 41, 0.03)",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "var(--color-brand-muted)",
                      border: "1px solid var(--color-brand-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                    }}
                  >
                    <attr.icon
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "var(--color-brand)",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      fontSize: "16px",
                      marginBottom: "8px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {attr.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14.5px",
                      color: "var(--color-text-body)",
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
        style={{
          padding: "104px 0",
          background: "var(--color-bg-subtle)",
          borderTop: "1px solid var(--color-border-subtle)",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
        >
          <FadeUp style={{ textAlign: "center", marginBottom: "56px" }}>
            <p
              className="eyebrow"
              style={{ marginBottom: "12px", color: "var(--color-brand)" }}
            >
              Values
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 3.2vw, 40px)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.14,
              }}
            >
              What we stand for.
            </h2>
          </FadeUp>
          <Stagger
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
            className="about-values-grid"
          >
            {values.map((value, i) => (
              <StaggerItem key={i}>
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--color-border)",
                    borderRadius: "16px",
                    padding: "28px",
                    height: "100%",
                    boxShadow: "0 1px 3px rgba(15, 23, 41, 0.03)",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "var(--color-brand-muted)",
                      border: "1px solid var(--color-brand-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                    }}
                  >
                    <value.icon
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "var(--color-brand)",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      marginBottom: "10px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14.5px",
                      color: "var(--color-text-body)",
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

      {/* CTA strip */}
      <section
        style={{
          padding: "96px 0",
          background: "#ffffff",
          textAlign: "center",
        }}
      >
        <FadeUp>
          <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 24px" }}>
            <h2
              style={{
                fontSize: "clamp(26px, 3vw, 36px)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "16px",
                lineHeight: 1.15,
              }}
            >
              Want to see what we&apos;d build for you?
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                marginBottom: "28px",
                lineHeight: 1.6,
              }}
            >
              A 30-minute call is enough to know if it&apos;s a fit.
            </p>
            <Link
              href="/contact"
              className="btn-primary"
              style={{ padding: "13px 30px", fontSize: "15px" }}
            >
              Book a Demo
            </Link>
          </div>
        </FadeUp>
      </section>

      <style>{`
        .about-grid {
          @media (max-width: 900px) { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        .about-cards-grid {
          @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr) !important; }
          @media (max-width: 600px) { grid-template-columns: 1fr !important; }
        }
        .about-values-grid {
          @media (max-width: 640px) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
