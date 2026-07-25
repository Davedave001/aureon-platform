import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";
import { recentUsers } from "@/lib/admin-data";

const statusTone: Record<string, string> = {
  Active: "border-bull/30 bg-bull/10 text-bull",
  Suspended: "border-bear/30 bg-bear/10 text-bear",
};

const verificationTone: Record<string, string> = {
  Verified: "border-bull/30 bg-bull/10 text-bull",
  Pending: "border-gold/30 bg-gold/10 text-gold",
  Rejected: "border-bear/30 bg-bear/10 text-bear",
};

export function RecentUsersTable() {
  return (
    <SectionCard title="Recent Users" viewAllHref="/admin">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="py-1.5 pr-3 font-medium">User</th>
              <th className="py-1.5 pr-3 font-medium">Joined</th>
              <th className="py-1.5 pr-3 font-medium">Status</th>
              <th className="py-1.5 font-medium">Verification</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((u) => (
              <tr key={u.email} className="border-t border-border">
                <td className="py-2 pr-3">
                  <p className="font-medium text-foreground">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </td>
                <td className="py-2 pr-3 text-muted-foreground">
                  {u.joined}
                </td>
                <td className="py-2 pr-3">
                  <Badge variant="outline" className={statusTone[u.status]}>
                    {u.status}
                  </Badge>
                </td>
                <td className="py-2">
                  <Badge
                    variant="outline"
                    className={verificationTone[u.verification]}
                  >
                    {u.verification}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
