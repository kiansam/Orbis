import { createServerClient } from "@supabase/ssr";
import { Mail, Building, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { ContactSubmission } from "@/lib/types";

function getAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } },
  );
}

export default async function AdminContactPage() {
  const supabase = getAdminClient();

  const { data: submissions } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const typedSubmissions = (submissions || []) as ContactSubmission[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Contact Inbox</h1>
        <p className="text-foreground-muted mt-1">
          {typedSubmissions.length} total submissions
        </p>
      </div>

      {typedSubmissions.length === 0 ? (
        <div className="text-center py-24">
          <Mail className="w-12 h-12 text-foreground-muted mx-auto mb-4" />
          <p className="text-foreground-muted">No contact submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {typedSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-background-card border border-border rounded-xl p-6 space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-accent text-sm font-bold">
                        {submission.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-foreground font-semibold">
                        {submission.name}
                      </div>
                      <div className="flex items-center gap-3 text-foreground-muted text-xs">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {submission.email}
                        </span>
                        {submission.company && (
                          <span className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {submission.company}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-foreground-muted text-xs flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  {formatDate(submission.created_at)}
                </div>
              </div>

              <div className="bg-background-secondary rounded-lg p-4 text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {submission.message}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${submission.email}?subject=Re: Your Orbis Solutions inquiry`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-muted text-accent text-xs rounded-lg hover:bg-accent/20 transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  Reply via Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
