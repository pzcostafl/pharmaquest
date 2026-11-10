import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const dir = join(process.cwd(), 'src/data/grupos');
const meds = new Map<string, string>(), cls = new Map<string, string>();
let n = 0, nc = 0;
const grupos: Record<string, number> = {};
for (const f of readdirSync(dir)) {
  const d = (await import(pathToFileURL(join(dir, f)).href)).default;
  for (const m of d.medicamentos) { if (meds.has(m.id)) console.log('MED DUPLICADO', m.id, f, meds.get(m.id)); meds.set(m.id, f); n++; for (const v of m.vinculos) grupos[v.grupoId] = (grupos[v.grupoId] ?? 0) + 1; if (!m.nomesComerciais.length) console.log('sem marca:', m.id); }
  for (const c of d.classes) { if (cls.has(c.id)) console.log('CLASSE DUPLICADA', c.id, f, cls.get(c.id)); cls.set(c.id, f); nc++; }
  for (const e of d.vinculosExtras ?? []) grupos[e.vinculo.grupoId] = (grupos[e.vinculo.grupoId] ?? 0) + 1;
}
console.log({ medicamentos: n, classes: nc, grupos });
