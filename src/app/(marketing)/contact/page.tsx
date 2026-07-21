"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Send,
  Mail,
  Clock,
  CheckCircle,
  MessageSquare,
  FileText,
} from "lucide-react";
import { contactSchema, ContactFormData } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "admin@orbissolutions.ca",
    sub: "We respond within 24 hours",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon–Fri, 9am–6pm PST",
    sub: "We will follow up the same day",
  },
];

type Tab = "chat" | "form";

// Runs inside the iframe's own JS context — completely isolated from FloatingChatbot.
const CHATBOT_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>html,body{margin:0;padding:0;height:100%;overflow:hidden;}</style>
</head>
<body>
  <n8nchatui-inpage></n8nchatui-inpage>
  <div style="position:absolute;left:0;right:0;bottom:0;height:34px;background:#ffffff;z-index:2147483647;pointer-events:none;"></div>
  <script type="module">
    import Chatbot from "https://cdn.n8nchatui.com/v1/embed.js";
    Chatbot.initFull({
      "n8nChatUrl": "https://n8n.orbissolutions.ca/webhook/5ba0f854-d981-41b3-a37f-4b7ab3530a1d/chat",
      "metadata": {},
      "theme": {
        "button": { "iconColor": "#fff9f6", "backgroundColor": "#4169FF" },
        "chatWindow": {
          "borderRadiusStyle": "rounded",
          "avatarBorderRadius": 50,
          "messageBorderRadius": 6,
          "showTitle": true,
          "title": "Orbis Solutions ChatBot",
          "titleAvatarSrc": "https://storage.googleapis.com/orbis-solutions-assets/Orbis%20Chatbot%20Icon%20(Zoomed).png",
          "avatarSize": 43,
          "welcomeMessage": "Hi there! I can get you booked in for a free demo, or answer any questions you have about what we do. What can I help you with?",
          "errorMessage": "Sorry! Running into some technical issues. Please feel free to reach out to us directly at orbissolutions.ai@gmail.com.",
          "backgroundColor": "#ffffff",
          "height": 0,
          "width": 0,
          "fontSize": 18,
          "starterPrompts": ["I'd like to book a free live demo", "I have questions about Orbis' services"],
          "starterPromptFontSize": 18,
          "renderHTML": false,
          "clearChatOnReload": true,
          "showScrollbar": true,
          "botMessage": {
            "backgroundColor": "#4169FF",
            "textColor": "#fafafa",
            "showAvatar": true,
            "avatarSrc": "https://storage.googleapis.com/orbis-solutions-assets/Orbis%20Chatbot%20Icon%20(Zoomed).png",
            "showCopyToClipboardIcon": false
          },
          "userMessage": {
            "backgroundColor": "#fff6f3",
            "textColor": "#050505",
            "showAvatar": false,
            "avatarSrc": "https://www.svgrepo.com/show/532363/user-alt-1.svg"
          },
          "textInput": {
            "placeholder": "Type your query",
            "backgroundColor": "#ffffff",
            "textColor": "#1e1e1f",
            "sendButtonColor": "#4169FF",
            "maxChars": 300,
            "maxCharsWarningMessage": "You exceeded the characters limit. Please input less than 300 characters.",
            "autoFocus": false,
            "borderRadius": 6,
            "sendButtonBorderRadius": 50
          }
        }
      }
    });
  </script>
</body>
</html>`;

export default function ContactPage() {
  const [tab, setTab] = useState<Tab>("form");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send message");
      }
      setSubmitted(true);
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#ffffff",
    border: "1px solid var(--color-border)",
    borderRadius: "10px",
    color: "var(--color-text-primary)",
    fontSize: "14px",
    padding: "11px 14px",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 150ms ease, box-shadow 150ms ease",
    fontFamily: "inherit",
  };

  return (
    <div style={{ background: "var(--color-bg)", position: "relative" }}>
      {/* Subtle top wash */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "420px",
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(65, 105, 255, 0.06) 0%, rgba(65, 105, 255, 0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero */}
      <section
        style={{
          position: "relative",
          padding: "32px 0 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <h1
            style={{
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: "14px",
            }}
          >
            Let&apos;s start a{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4169ff 0%, #6b8eff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              conversation
            </span>
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Chat with our AI agent live, or send us a message. Either way, we&apos;ll get back to you fast.
          </p>
        </div>
      </section>

      {/* Tab switcher */}
      <section
        style={{
          position: "relative",
          padding: "0 24px 22px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            background: "#ffffff",
            border: "1px solid var(--color-border)",
            borderRadius: "100px",
            padding: "4px",
            gap: "2px",
            boxShadow: "0 1px 3px rgba(15, 23, 41, 0.04)",
          }}
        >
          {[
            { id: "form" as Tab, label: "Send a Message", Icon: FileText },
            { id: "chat" as Tab, label: "Chat with Us", Icon: MessageSquare },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                borderRadius: "100px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "inherit",
                transition: "all 200ms ease",
                background: tab === id ? "var(--color-brand)" : "transparent",
                color: tab === id ? "#ffffff" : "var(--color-text-muted)",
                boxShadow:
                  tab === id ? "0 4px 12px rgba(65, 105, 255, 0.22)" : "none",
              }}
            >
              <Icon style={{ width: "15px", height: "15px" }} />
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab content */}
      <section style={{ position: "relative", padding: "0 24px 112px" }}>
        {/* Chatbot tab */}
        <div
          style={{
            display: tab === "chat" ? "flex" : "none",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "880px",
              height: "760px",
              borderRadius: "16px",
              border: "1px solid var(--color-border)",
              overflow: "hidden",
              background: "#ffffff",
              boxShadow:
                "0 20px 60px rgba(15, 23, 41, 0.08), 0 4px 12px rgba(15, 23, 41, 0.04)",
            }}
          >
            <iframe
              srcDoc={CHATBOT_HTML}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
              title="Orbis Solutions ChatBot"
            />
          </div>
        </div>

        {/* Form tab */}
        {tab === "form" && (
          <div
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Contact info cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
              className="contact-info-row"
            >
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--color-border)",
                    borderRadius: "14px",
                    padding: "20px",
                    boxShadow: "0 1px 3px rgba(15, 23, 41, 0.03)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "var(--color-brand-muted)",
                      border: "1px solid var(--color-brand-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "14px",
                    }}
                  >
                    <item.icon
                      style={{
                        width: "18px",
                        height: "18px",
                        color: "var(--color-brand)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      color: "var(--color-text-body)",
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    {item.value}
                  </div>
                  <div
                    style={{
                      color: "var(--color-text-faint)",
                      fontSize: "12px",
                    }}
                  >
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Form / success state */}
            {submitted ? (
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: "48px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: "20px",
                  minHeight: "320px",
                  boxShadow: "0 1px 3px rgba(15, 23, 41, 0.03)",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(0, 200, 150, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircle
                    style={{
                      width: "28px",
                      height: "28px",
                      color: "var(--color-positive)",
                    }}
                  />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      marginBottom: "8px",
                    }}
                  >
                    Message Sent
                  </h3>
                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "15px",
                    }}
                  >
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-ghost"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: "32px",
                  boxShadow: "0 1px 3px rgba(15, 23, 41, 0.03)",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    marginBottom: "24px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Send us a message
                </h2>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                    className="form-row"
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "var(--color-text-body)",
                          marginBottom: "6px",
                        }}
                      >
                        Full Name *
                      </label>
                      <input
                        placeholder="John Smith"
                        style={inputStyle}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p
                          style={{
                            color: "#ef4444",
                            fontSize: "12px",
                            marginTop: "4px",
                          }}
                        >
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "var(--color-text-body)",
                          marginBottom: "6px",
                        }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        style={inputStyle}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p
                          style={{
                            color: "#ef4444",
                            fontSize: "12px",
                            marginTop: "4px",
                          }}
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--color-text-body)",
                        marginBottom: "6px",
                      }}
                    >
                      Company
                    </label>
                    <input
                      placeholder="Your Business Name"
                      style={inputStyle}
                      {...register("company")}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--color-text-body)",
                        marginBottom: "6px",
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      placeholder="Tell us about your business and what you'd like an AI agent to handle..."
                      rows={6}
                      style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p
                        style={{
                          color: "#ef4444",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      padding: "14px",
                      fontSize: "15px",
                      gap: "8px",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          style={{
                            width: "16px",
                            height: "16px",
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTopColor: "white",
                            borderRadius: "50%",
                            animation: "spin 0.7s linear infinite",
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send style={{ width: "16px", height: "16px" }} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 600px) {
          .contact-info-row { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
