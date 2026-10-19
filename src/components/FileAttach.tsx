import { useRef, useState } from "react";

type Props = {
  name?: string;
  label?: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  className?: string;
  /** Notified whenever the selection changes, so a parent can record it on a lead. */
  onFilesChange?: (files: File[]) => void;
};

export function FileAttach({
  name = "attachments",
  label = "Attachments",
  hint = "Floor plans, brand guidelines, references, RFPs — PDF, DOC, PNG, JPG, ZIP (max 25MB each)",
  accept = ".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.svg,.ai,.zip,.dwg,.dxf",
  multiple = true,
  className = "",
  onFilesChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const apply = (list: File[]) => {
    setFiles(list);
    onFilesChange?.(list);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    apply(e.target.files ? Array.from(e.target.files) : []);
  };

  const remove = (idx: number) => {
    const next = files.filter((_, i) => i !== idx);
    apply(next);
    if (inputRef.current) {
      const dt = new DataTransfer();
      next.forEach((f) => dt.items.add(f));
      inputRef.current.files = dt.files;
    }
  };

  return (
    <label className={`block ${className}`}>
      <span className="block text-xs uppercase tracking-widest text-white/60 mb-2">
        {label}
      </span>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          if (!inputRef.current) return;
          const dt = new DataTransfer();
          Array.from(e.dataTransfer.files).forEach((f) => dt.items.add(f));
          inputRef.current.files = dt.files;
          apply(Array.from(dt.files));
        }}
        className="cursor-pointer w-full bg-white/5 border border-dashed border-white/20 rounded-xl px-4 py-5 text-center hover:border-[oklch(0.78_0.13_300)] hover:bg-white/[0.07] transition-all"
      >
        <div className="flex items-center justify-center gap-2 text-sm text-white/80">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          <span className="font-medium">Attach files</span>
          <span className="text-white/50">or drag & drop</span>
        </div>
        <p className="mt-2 text-[11px] text-white/45 font-light">{hint}</p>
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          onChange={onChange}
          className="hidden"
        />
      </div>
      {files.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between gap-3 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-xs"
            >
              <span className="truncate text-white/85">{f.name}</span>
              <span className="shrink-0 flex items-center gap-3">
                <span className="text-white/40">
                  {(f.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    remove(i);
                  }}
                  className="text-white/50 hover:text-[oklch(0.78_0.13_300)]"
                  aria-label={`Remove ${f.name}`}
                >
                  ✕
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </label>
  );
}
