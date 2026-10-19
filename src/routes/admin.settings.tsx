import { createFileRoute } from "@tanstack/react-router";
import { PageHeading } from "@/components/admin/AdminLayout";
import { useAdmin } from "@/lib/admin/store";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/settings")({ component: SettingsPage });

function SettingsPage() {
  const { settings, taxRegions, updateSettings } = useAdmin();

  const set = (patch: Partial<typeof settings>) => updateSettings(patch);
  const setBank = (patch: Partial<typeof settings.bank>) => updateSettings({ bank: { ...settings.bank, ...patch } });

  return (
    <>
      <PageHeading
        title="Settings"
        subtitle="Company details, signatory and remittance information printed on every document and invoice."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4 p-5">
          <p className="text-sm font-medium">Company</p>
          <F label="Legal name" value={settings.legalName} onChange={(v) => set({ legalName: v })} />
          <F label="Address" value={settings.address} onChange={(v) => set({ address: v })} />
          <F label="Phone" value={settings.phone} onChange={(v) => set({ phone: v })} />
          <F label="Email" value={settings.email} onChange={(v) => set({ email: v })} />
          <F label="Tax registration note" value={settings.taxRegistration} onChange={(v) => set({ taxRegistration: v })} />
        </Card>

        <Card className="space-y-4 p-5">
          <p className="text-sm font-medium">Signatory</p>
          <F label="Name" value={settings.signatoryName} onChange={(v) => set({ signatoryName: v })} />
          <F label="Title" value={settings.signatoryTitle} onChange={(v) => set({ signatoryTitle: v })} />
          <p className="pt-2 text-sm font-medium">Payment</p>
          <F label="e-Transfer email" value={settings.etransferEmail} onChange={(v) => set({ etransferEmail: v })} />
          <F label="Cheque payee" value={settings.chequePayee} onChange={(v) => set({ chequePayee: v })} />
        </Card>

        <Card className="space-y-4 p-5">
          <p className="text-sm font-medium">Banking (wire / EFT)</p>
          <F label="Bank" value={settings.bank.name} onChange={(v) => setBank({ name: v })} />
          <F label="Branch address" value={settings.bank.address} onChange={(v) => setBank({ address: v })} />
          <div className="grid grid-cols-2 gap-4">
            <F label="Institution #" value={settings.bank.institution} onChange={(v) => setBank({ institution: v })} />
            <F label="Transit #" value={settings.bank.transit} onChange={(v) => setBank({ transit: v })} />
            <F label="Account #" value={settings.bank.account} onChange={(v) => setBank({ account: v })} />
            <F label="SWIFT" value={settings.bank.swift} onChange={(v) => setBank({ swift: v })} />
          </div>
        </Card>

        <Card className="space-y-3 p-5">
          <p className="text-sm font-medium">Tax regions</p>
          <p className="text-xs text-muted-foreground">
            Applied by place of supply. The builder pre-selects a region from the lead's city.
          </p>
          <ul className="divide-y divide-border/50 text-sm">
            {taxRegions.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-2">
                <span>{r.label}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {(r.rate * 100).toFixed(r.rate === 0.14975 ? 3 : 0)}%
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

function F({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <Input className="mt-1.5" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
