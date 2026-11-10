# Brief para autores de conteúdo — PharmaQuest

Você está escrevendo o **banco farmacológico** de um jogo educacional para estudantes de Farmácia
(React + TypeScript). Todo o texto é em **português brasileiro**, nível universitário, linguagem clara.

## O que entregar
Um arquivo TypeScript `src/data/grupos/<arquivo>.ts` que exporta um `ModuloDados`:

```ts
import type { ModuloDados } from '../types';
const dados: ModuloDados = { classes: [...], medicamentos: [...], vinculosExtras: [...], resumos: [...] };
export default dados;
```

O esquema está em `src/data/types.ts` — **leia-o inteiro antes de começar** e siga-o à risca
(os comentários de cada campo são instruções). Depois de escrever, rode
`npx tsc --noEmit -p .` na raiz do projeto e corrija qualquer erro **do seu arquivo**
(ignore erros de outros arquivos que ainda não existam).

## Regras científicas (inegociáveis)
1. **Não invente nada.** Use somente conhecimento farmacológico consolidado (Goodman & Gilman,
   Katzung, Rang & Dale, bulas Anvisa/FDA/EMA, Formulário Terapêutico Nacional/RENAME, diretrizes
   SBC/SBD/SBPT/GOLD/GINA/ADA/ESC/NCCN/IDSA conforme o grupo). Se não tiver certeza, omita.
2. **Classe ≠ grupo.** Grupo terapêutico = para que serve (ex.: anti-hipertensivo). Classe
   farmacológica = mecanismo/química (ex.: IECA). A classe deve ser específica; use `subclasse`
   quando útil (ex.: 'Diidropiridínico', 'Cefalosporina de 3ª geração', 'ISRS').
3. **Nomes comerciais:** apenas marcas que você sabe com alta confiança que foram registradas no
   **Brasil** para aquele princípio ativo (ex.: enalapril → Renitec [referência, MSD]; losartana →
   Cozaar [referência, MSD]). Prefira 2–4 marcas por fármaco, incluindo a de referência quando
   souber. Se não tiver certeza de nenhuma marca brasileira, deixe `nomesComerciais: []` (o fármaco
   ficará oculto do jogo até um docente cadastrar — isso é o comportamento correto).
   **Todas** as marcas devem ter `verificacao: 'pendente_anvisa'` (a consulta Anvisa está
   bloqueada nesta rede; ninguém conferiu a situação atual). Use `obs` para descontinuação
   conhecida, uso hospitalar ou controle especial. Associações em dose fixa: `tipo: 'combinacao'`
   com `composicao`. Indique `generico: true` só se souber que há genérico no Brasil.
4. **Efeitos adversos:** `eaComuns` e `eaGraves` separados. `eaCaracteristico` deve ser
   EXATAMENTE igual ao `termo` de um item de `eaComuns` ou `eaGraves` e ser o efeito mais
   "assinatura" do fármaco (tosse seca no IECA, ototoxicidade/nefrotoxicidade na gentamicina...).
   `distratoresEA`: ≥3 efeitos plausíveis que **não** são típicos deste fármaco — cuidado: não
   use como distrator algo que esteja em eaComuns/eaGraves ou que seja efeito conhecido dele.
   Prefira distratores que sejam assinaturas de OUTRAS classes (ex.: para enalapril: 'Hiperplasia
   gengival', 'Edema maleolar por vasodilatação arteriolar', 'Broncoespasmo por bloqueio β2').
5. **Sinônimos para a correção dissertativa:** em `Classe.sinonimos`, `Termo.sinonimos` e
   `Medicamento.sinonimos`, liste formas que um aluno escreveria: sigla, extenso, singular/plural,
   inglês, termos leigos equivalentes (ex.: hipercalemia → 'hiperpotassemia', 'potássio alto',
   'aumento do potássio'). Não precisa listar variações só de acento/caixa — o corretor já
   normaliza isso e tolera erros leves de digitação.
6. **Indicação aprovada x off-label:** `indicacoes` = aprovadas; `offLabel` = rotuladas.
7. **Regulatório BR** (`regulatorio`): ex. 'Lista A1 — Notificação de Receita A (Portaria
   SVS/MS 344/98)', 'Antimicrobiano — retenção de receita (RDC 471/2021)', 'Lista B1', 'Lista C1'.
   Só quando souber com segurança.
8. `pubchem`: nome em **inglês** que o PubChem reconhece (ex.: paracetamol → 'acetaminophen',
   dipirona → 'metamizole', AAS → 'aspirin', enalapril → 'enalapril'). Para associações, um nome
   por componente. Para anticorpos, insulinas e proteínas: `[]`. Para peptídeos pequenos com
   CID (semaglutida, liraglutida, octreotida...) pode informar o nome; o script verifica.
9. `referencias`: cite as fontes reais usadas (livro + edição, bula/agência, diretriz + ano).
   `dataRevisao: '10/nov/2026'`. `validacao: 'revisado_referencias'` (NUNCA 'validado_docente' —
   isso só um humano marca no painel).
10. Explicações (`explicacaoFase1/2/3`) com 1–3 frases cada, sem repetir a pergunta.
    `explicacaoFase1` explica para que o fármaco é usado naquele grupo;
    `explicacaoFase2` explica classe + mecanismo em linguagem acessível;
    `explicacaoFase3` conecta mecanismo → efeito adverso característico.
11. `contexto` do vínculo: uma frase curta de indicação no grupo (ex.: 'tratamento da hipertensão
    arterial e da insuficiência cardíaca'), usada para desambiguar quando o fármaco aparece em
    mais de um grupo.

## Classes
- Defina **todas** as classes usadas pelos seus fármacos, com `grupoId` do grupo onde aparecem.
- Ids de classe são globais: prefixe quando houver risco de colisão entre grupos
  (ex.: 'corticoide-sistemico' em anti-inflamatórios vs. 'corticoide-inalatorio' em broncodilatadores).
- Para que a múltipla escolha da fase 2 tenha distratores plausíveis, cada grupo deve ter
  **pelo menos 4 classes**. Se o grupo naturalmente tem menos, crie classes legítimas do
  mesmo grupo que existam na farmacologia (mesmo sem fármaco cadastrado) — elas servem de
  distratoras.

## Resumo do grupo (`resumos`)
Um `ResumoGrupo` por grupo que você recebeu — material de estudo universitário, **denso**:
- `visaoGeral`: 2–4 parágrafos.
- `mecanismos`: um por classe/família principal (3–6 frases cada).
- `fluxogramas`: 1–3 sequências fisiológicas/farmacológicas (ex.: Angiotensinogênio → (renina) →
  Angiotensina I → (ECA ← IECA) → Angiotensina II → (AT1 ← BRA) → vasoconstrição/aldosterona).
- `eaFrequentes` e `eaGraves` com o mecanismo quando relevante.
- `primeirasLinhas`: por **condição/perfil** (nunca uma única primeira linha para todo o grupo),
  com a diretriz em `fonte`.
- `contraindicacoes`, `interacoes`, `comparacoes` (diferenças entre classes e entre fármacos),
  `memorizar` (8–15 bullets de revisão), `fontes`, `dataRevisao: '10/nov/2026'`.
(A tabela "Classe | Princípios ativos | Mecanismo" e o simulado são gerados automaticamente.)

## Estilo
- Strings TS com aspas simples; escape apóstrofos ou use aspas duplas quando necessário.
- Ids sem acento, minúsculos, com hífen: 'acido-acetilsalicilico', 'sulfametoxazol-trimetoprima',
  'insulina-nph', 'naltrexona-bupropiona'.
- Não crie nenhum outro arquivo e não edite arquivos fora do seu.
- Ao final, responda em ≤10 linhas: quantos fármacos/classes, quais ficaram com
  `nomesComerciais: []` e qualquer ponto de incerteza científica que um docente deva revisar.
