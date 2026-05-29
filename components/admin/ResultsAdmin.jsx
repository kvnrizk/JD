'use client';
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";


const emptyForm = { patient_label: "", treatment_type: "Invisalign", before_url: "", after_url: "", date: "", order: 0 };

const ResultsAdmin = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState({ before: false, after: false });

  const load = () => api.get("/results").then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const upload = async (field, file) => {
    setUploading((u) => ({ ...u, [field]: true }));
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      const fullUrl = data.url;
      setForm((f) => ({ ...f, [`${field}_url`]: fullUrl }));
      toast.success("Image téléversée");
    } catch (e) {
      toast.error(e?.response?.data?.error || e?.response?.data?.detail || "Échec téléversement");
    } finally {
      setUploading((u) => ({ ...u, [field]: false }));
    }
  };

  const save = async () => {
    if (!form.before_url || !form.after_url) {
      toast.error("Images Avant et Après requises");
      return;
    }
    try {
      if (editing) await api.put(`/results/${editing}`, form);
      else await api.post("/results", form);
      toast.success(editing ? "Mis à jour" : "Ajouté");
      setEditing(null); setForm(emptyForm); load();
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Erreur");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Supprimer ce résultat ?")) return;
    await api.delete(`/results/${id}`);
    toast.success("Supprimé"); load();
  };

  const startEdit = (r) => { setEditing(r.id); setForm({ ...r }); };
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="space-y-10" data-testid="results-admin">
      <div className="border border-white/10 p-6 md:p-8 bg-[#141416]">
        <h3 className="font-serif-display text-2xl mb-6">{editing ? "Modifier le cas" : "Nouveau cas Avant/Après"}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <UploadBox label="Photo Avant" url={form.before_url} uploading={uploading.before} onFile={(f) => upload("before", f)} testid="result-upload-before" />
          <UploadBox label="Photo Après" url={form.after_url} uploading={uploading.after} onFile={(f) => upload("after", f)} testid="result-upload-after" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Nom / ID Patient" value={form.patient_label} onChange={upd("patient_label")} testid="result-form-label" />
          <Field label="Type de traitement" value={form.treatment_type} onChange={upd("treatment_type")} testid="result-form-treatment" />
          <Field label="Date (ex: 2025-09)" value={form.date} onChange={upd("date")} testid="result-form-date" />
          <Field label="Ordre" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} testid="result-form-order" />
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={save} className="btn-gold" data-testid="result-save">
            {editing ? "Enregistrer" : "Ajouter"} →
          </button>
          {editing && <button onClick={() => { setEditing(null); setForm(emptyForm); }} className="btn-ghost">Annuler</button>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((r) => (
          <div key={r.id} className="border border-white/10 p-5 bg-[#141416]" data-testid={`result-row-${r.id}`}>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <img src={r.before_url} alt="avant" className="w-full aspect-square object-cover" />
              <img src={r.after_url} alt="après" className="w-full aspect-square object-cover" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-serif-display text-lg">{r.patient_label}</div>
                <div className="text-white/45 text-xs">{r.treatment_type} · {r.date}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(r)} className="btn-ghost text-xs px-3 py-1.5" data-testid={`result-edit-${r.id}`}>Éditer</button>
                <button onClick={() => remove(r.id)} className="btn-ghost text-xs px-3 py-1.5 hover:border-red-500 hover:text-red-400" data-testid={`result-delete-${r.id}`}>×</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, testid, type = "text" }) => (
  <div>
    <label className="overline mb-2 block text-white/55">{label}</label>
    <input type={type} value={value} onChange={onChange} className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#D4AF37] outline-none py-2.5 text-white font-light" data-testid={testid} />
  </div>
);

const UploadBox = ({ label, url, uploading, onFile, testid }) => {
  const ref = useRef(null);
  return (
    <div>
      <label className="overline mb-2 block text-white/55">{label}</label>
      <div className="border border-dashed border-white/15 aspect-square relative overflow-hidden">
        {url ? (
          <img src={url} alt={label} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/35 text-sm">Aucune image</div>
        )}
        {uploading && <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[#D4AF37] text-xs">Téléversement...</div>}
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="absolute bottom-2 right-2 btn-ghost text-[10px] px-3 py-1.5"
        >
          Téléverser
        </button>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          data-testid={testid}
        />
      </div>
    </div>
  );
};

export default ResultsAdmin;
