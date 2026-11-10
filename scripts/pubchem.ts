// Baixa do PubChem (NIH/NLM, PUG REST) o CID, a fórmula molecular e a imagem 2D oficial
// de cada nome listado em `pubchem` nos arquivos de src/data/grupos. Uso: npm run pubchem
import { readdirSync, writeFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const RAIZ = process.cwd();
const DIR_GRUPOS = join(RAIZ, 'src/data/grupos');
const SAIDA = join(RAIZ, 'src/data/pubchem.json');
const DIR_IMG = join(RAIZ, 'public/moleculas');
const API = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug';
const espera = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  mkdirSync(DIR_IMG, { recursive: true });
  const atual: Record<string, unknown> = existsSync(SAIDA) ? JSON.parse(readFileSync(SAIDA, 'utf8')) : {};
  const nomes = new Set<string>();
  for (const f of readdirSync(DIR_GRUPOS).filter((x) => x.endsWith('.ts'))) {
    const mod = await import(pathToFileURL(join(DIR_GRUPOS, f)).href);
    for (const m of mod.default.medicamentos) for (const n of m.pubchem) nomes.add(String(n).toLowerCase());
  }
  const forcar = process.argv.includes('--forcar');
  let ok = 0, falhas = 0;
  for (const nome of [...nomes].sort()) {
    const ja = atual[nome] as { cid?: number; imagem?: string } | undefined;
    if (!forcar && ja?.cid && existsSync(join(RAIZ, 'public', ja.imagem!))) { ok++; continue; }
    try {
      const r = await fetch(`${API}/compound/name/${encodeURIComponent(nome)}/property/MolecularFormula,MolecularWeight,IUPACName/JSON`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const p = (await r.json()).PropertyTable.Properties[0];
      await espera(250);
      const img = await fetch(`${API}/compound/cid/${p.CID}/PNG?record_type=2d&image_size=500x400`);
      if (!img.ok) throw new Error(`imagem HTTP ${img.status}`);
      writeFileSync(join(DIR_IMG, `${p.CID}.png`), Buffer.from(await img.arrayBuffer()));
      atual[nome] = { nome, cid: p.CID, formula: p.MolecularFormula, peso: String(p.MolecularWeight), iupac: p.IUPACName, imagem: `moleculas/${p.CID}.png`, obtidoEm: new Date().toISOString().slice(0, 10) };
      ok++;
      console.log(`✓ ${nome} → CID ${p.CID} ${p.MolecularFormula}`);
    } catch (e) {
      falhas++;
      atual[nome] = { erro: String((e as Error).message) };
      console.log(`✗ ${nome}: ${(e as Error).message}`);
    }
    await espera(250);
  }
  writeFileSync(SAIDA, JSON.stringify(atual, null, 2));
  console.log(`\n${ok} estruturas OK, ${falhas} falhas — ${SAIDA}`);
}
main();
