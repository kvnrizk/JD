'use client';
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";

const empty = { name: "", city: "", address: "", phone: "", doctolib_url: "", map_url: "", order: 0 };

const ClinicsAdmin = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = () => api.get("/clinics").then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const startEdit = (c) => { setEditing(c.id); setForm({ ...c }); };
  const cancel = () => { setEditing(null); setForm(empty); };

  const save = async () => {
    try {
      if (editing) {
        await api.put(`/clinics/${editing}`, form);
        toast.success("Clinique mise à jour");
      } else {
        await api.post("/clinics", form);
        toast.success("Clinique ajoutée");
      }
      cancel(); load();
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Erreur");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Supprimer cette clinique ?")) return;
    await api.delete(`/clinics/${id}`);
    toast.success("Supprimée"); load();
  };

  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="space-y-10" data-testid="clinics-admin">
      <div className="border border-white/10 p-6 md:p-8 bg-[#141416]">
        <h3 className="font-serif-display text-2xl mb-6">{editing ? "Modifier" : "Nouvelle clinique"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Nom" value={form.name} onChange={upd("name")} testid="clinic-form-name" />
          <Input label="Ville" value={form.city} onChange={upd("city")} testid="clinic-form-city" />
          <Input label="Adresse" value={form.address} onChange={upd("address")} testid="clinic-form-address" full />
          <Input label="Téléphone" value={form.phone} onChange={upd("phone")} testid="clinic-form-phone" />
          <Input label="URL Doctolib" value={form.doctolib_url} onChange={upd("doctolib_url")} testid="clinic-form-doctolib" />
          <Input label="URL Carte (embed)" value={form.map_url || ""} onChange={upd("map_url")} testid="clinic-form-map" full />
          <Input label="Ordre" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} testid="clinic-form-order" />
        </div>
        <div className="flex gap-3 mt-8">
          <button onClick={save} className="btn-gold" data-testid="clinic-save">
            {editing ? "Enregistrer" : "Ajouter"} →
          </button>
          {editing && <button onClick={cancel} className="btn-ghost" data-testid="clinic-cancel">Annuler</button>}
        </div>
      </div>

      <div className="space-y-3">
        {items.map((c) => (
          <div key={c.id} className="border border-white/10 p-5 md:p-6 bg-[#141416] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-testid={`clinic-row-${c.id}`}>
            <div className="min-w-0">
              <div className="font-serif-display text-xl truncate">{c.name}</div>
              <div className="text-white/50 text-sm mt-1 truncate">{c.address}</div>
              <div className="text-white/40 text-xs mt-1">{c.phone} · <a href={c.doctolib_url} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] link-underline">Doctolib</a></div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(c)} className="btn-ghost text-xs px-4 py-2" data-testid={`clinic-edit-${c.id}`}>Modifier</button>
              <button onClick={() => remove(c.id)} className="btn-ghost text-xs px-4 py-2 hover:border-red-500 hover:text-red-400" data-testid={`clinic-delete-${c.id}`}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, testid, full, type = "text" }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="overline mb-2 block text-white/55">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#D4AF37] outline-none py-2.5 text-white font-light transition-colors"
      data-testid={testid}
    />
  </div>
);

export default ClinicsAdmin;
