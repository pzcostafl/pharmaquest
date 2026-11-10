# PharmaQuest — Desafio da Farmacologia

Jogo de estudo de farmacologia para estudantes de Farmácia, com 11 pastas terapêuticas e 168 princípios ativos cadastrados (161 jogáveis). Cada medicamento passa por 3 fases: grupo terapêutico → classe farmacológica e mecanismo → nomes comerciais e efeitos adversos. Funciona no celular, no iPad e no computador, inclusive sem internet.

## Rodar
```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 39 testes: corretor dissertativo e geração das questões em todos os fármacos
npm run build      # gera a pasta dist/ (site estático)
npm run pubchem    # baixa estruturas/fórmulas do PubChem para fármacos novos
```

## Publicar para usar no celular/iPad
`dist/` é um site estático: não precisa de servidor nem de banco de dados. Qualquer hospedagem estática serve, por exemplo:
- **Netlify Drop** (app.netlify.com/drop): arraste a pasta `dist` e você recebe um link https.
- **GitHub Pages**, **Vercel** ou **Cloudflare Pages**.

No iPhone/iPad, abra o link no Safari e use **Compartilhar → Adicionar à Tela de Início**. O app passa a abrir em tela cheia. Instalar assim também protege o progresso: o Safari pode apagar os dados de um site comum que fique 7 dias sem ser aberto. Para levar o progresso a outro aparelho, use **Ajustes → Exportar progresso**.

## Como o conteúdo é validado
- `src/data/grupos/*.ts` guarda o banco, no esquema de `src/data/types.ts`.
- Um fármaco só entra no jogo se tiver conteúdo para as 4 etapas. Sete ficam ocultos porque não há marca brasileira confirmada: oxacilina, metotrexato, daunorrubicina, vimblastina, famotidina, ácido bempedoico e naltrexona + bupropiona.
- Todo o conteúdo está marcado como **"baseado em referências · aguarda revisão docente"**. Nenhum item aparece como "validado": só um professor pode marcar isso, na Área administrativa.
- Todas as marcas aparecem como **"situação Anvisa a conferir"**. A consulta de produtos da Anvisa estava bloqueada na rede onde o app foi montado, então nada foi conferido lá.
- As estruturas 2D e as fórmulas vêm do PubChem (152 compostos). Biológicos (anticorpos, insulinas) não têm imagem, e o app explica o motivo. Alginato e sucralfato não foram encontrados no PubChem, por isso não mostram estrutura.
- Os pontos que precisam de revisão estão em `REVISAO_DOCENTE.md`.

## Limitações desta versão
- **Sem servidor.** O progresso fica no navegador de cada aparelho. Login com conta, sincronização entre aparelhos e separação real entre aluno e administrador exigem um backend (Supabase/PostgreSQL); a camada `src/lib/conteudo.ts` e `src/lib/progresso.ts` está isolada para essa troca. O PIN do admin protege só aquele navegador.
- **Correção dissertativa sem IA.** O corretor normaliza o texto, aceita sinônimos cadastrados e tolera erros leves de digitação. Respostas com paráfrases muito livres podem não ser reconhecidas.
