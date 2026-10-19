import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Plus } from "lucide-react";
import {
  CATALOG_GROUP_LABEL,
  searchCatalog,
  type CatalogGroup,
  type CatalogItem,
} from "@/lib/admin/catalog";

/**
 * Visual catalog picker — lets a PM build a quote from real booth designs,
 * portable products and services instead of typing every line by hand.
 */
export function CatalogPicker({ onAdd }: { onAdd: (item: CatalogItem) => void }) {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<CatalogGroup>("booth");
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchCatalog(group, query), [group, query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> Add from catalog
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add to this quote</DialogTitle>
          <DialogDescription>
            Booth designs, portable products and services. Thumbnails carry through to the SOW and invoice.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={group} onValueChange={(v) => setGroup(v as CatalogGroup)}>
          <TabsList className="flex w-full flex-wrap justify-start">
            {(Object.keys(CATALOG_GROUP_LABEL) as CatalogGroup[]).map((g) => (
              <TabsTrigger key={g} value={g}>
                {CATALOG_GROUP_LABEL[g]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, size or code…"
        />

        <div className="grid max-h-[52vh] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
          {results.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onAdd(item);
                setOpen(false);
              }}
              className="group overflow-hidden rounded-lg border border-border/60 text-left transition hover:border-primary/60"
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition group-hover:scale-[1.03]"
                  />
                ) : (
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="space-y-1 p-2.5">
                <p className="line-clamp-2 text-xs font-medium leading-snug">{item.name}</p>
                <p className="font-mono text-[10px] uppercase text-muted-foreground">{item.sku}</p>
              </div>
            </button>
          ))}
          {results.length === 0 ? (
            <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No matches.</p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
