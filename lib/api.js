// Thin wrapper so components stay identical — just swaps axios for fetch
const api = {
  get: (url) => fetch(`/api${url}`, { credentials: "include" }).then(async r => {
    const data = await r.json();
    if (!r.ok) throw { response: { data } };
    return { data };
  }),
  post:   (url, body, opts) => {
    const isForm = body instanceof FormData;
    return fetch(`/api${url}`, {
      method: "POST",
      headers: isForm ? undefined : { "Content-Type": "application/json" },
      body: isForm ? body : JSON.stringify(body),
      credentials: "include",
    }).then(async r => {
      const data = await r.json();
      if (!r.ok) throw { response: { data } };
      return { data };
    });
  },
  put:    (url, body) => fetch(`/api${url}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  }).then(async r => {
    const data = await r.json();
    if (!r.ok) throw { response: { data } };
    return { data };
  }),
  delete: (url) => fetch(`/api${url}`, { method: "DELETE", credentials: "include" }).then(r => r.json()).then(data => ({ data })),
};

export default api;
