'use client';
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";


const empty = { image_url: "", caption: "", link: "https://instagram.com/", order: 0 };

const InstagramAdmin = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);

  const load = () => api.get("/instagram").then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const upload = async (file) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setForm((f) => ({ ...f, image_url: data.url }));
      toast.success("Image téléversée");
    } catch (e) {
      toast.error(e?.response?.data?.error || e?.response?.data?.detail || "Échec téléversement");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.image_url) { toast.error("Image requise"); return; }
    try {
      if (editing) await api.put(`/instagram/${editing}`, form);
      else await api.post("/instagram", form);
      toast.success(editing ? "Mis à jour" : "Ajouté");
      setEditing(null); setForm(empty); load();
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Erreur");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Supprimer cette publication ?")) return;
    await api.delete(`/instagram/${id}`);
    toast.success("Supprimée"); load();
  };

  const startEdit = (p) => { setEditing(p.id); setForm({ ...p }); };
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="space-y-10" data-testid="instagram-admin">
      <div className="border border-white/10 p-6 md:p-8 bg-[#141416]">
        <h3 className="font-serif-display text-2xl mb-6">{editing ? "Modifier" : "Nouvelle publication"}</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UploadBox
            imageUrl={form.image_url}
            uploading={uploading}
            onFile={upload}
          />

          <div className="md:col-span-2 space-y-5">
            <Field label="Légende" value={form.caption} onChange={upd("caption")} testid="instagram-form-caption" />
            <Field label="Lien" value={form.link} onChange={upd("link")} testid="instagram-form-link" />
            <Field label="Ordre" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} testid="instagram-form-order" />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={save} className="btn-gold" data-testid="instagram-save">
            {editing ? "Enregistrer" : "Ajouter"} →
          </button>
          {editing && <button onClick={() => { setEditing(null); setForm(empty); }} className="btn-ghost">Annuler</button>}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((p) => (
          <div key={p.id} className="border border-white/10 bg-[#141416] relative group" data-testid={`instagram-row-${p.id}`}>
            <img src={p.image_url} alt={p.caption} className="w-full aspect-square object-cover" />
            <div className="p-3">
              <div className="text-xs text-white/65 line-clamp-2">{p.caption}</div>
              <div className="flex gap-1 mt-2">
                <button onClick={() => startEdit(p)} className="btn-ghost text-[10px] px-2 py-1 flex-1" data-testid={`instagram-edit-${p.id}`}>Éditer</button>
                <button onClick={() => remove(p.id)} className="btn-ghost text-[10px] px-2 py-1 hover:border-red-500 hover:text-red-400" data-testid={`instagram-delete-${p.id}`}>×</button>
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

const UploadBox = ({ imageUrl, uploading, onFile }) => {
  const ref = useRef(null);
  return (
    <div className="md:col-span-1">
      <label className="overline mb-2 block text-white/55">Image</label>
      <div className="border border-dashed border-white/15 aspect-square relative overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt="prévisualisation" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/35 text-sm">Aucune</div>
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
          data-testid="instagram-upload"
        />
      </div>
    </div>
  );
};

export default InstagramAdmin;
