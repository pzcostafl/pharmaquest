import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Avisos } from './components/ui';
import { usePerfil } from './lib/progresso';
import { Home } from './pages/Home';
import { Modulo } from './pages/Modulo';
import { Jogar } from './pages/Jogar';
import { Quiz } from './pages/Quiz';
import { Resumo } from './pages/Resumo';
import { MinhaRevisao } from './pages/MinhaRevisao';
import { Biblioteca, FichaPagina } from './pages/Biblioteca';
import { Desempenho } from './pages/Desempenho';
import { BoasVindas, Config } from './pages/Config';
import { Admin } from './pages/Admin';

export default function App() {
  const perfil = usePerfil();
  return (
    <HashRouter>
      {!perfil ? (
        <Routes>
          <Route path="/admin" element={<Layout><Admin /></Layout>} />
          <Route path="*" element={<BoasVindas />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modulo/:g" element={<Modulo />} />
            <Route path="/jogar/:g" element={<Jogar />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/simulado/:g" element={<Quiz simulado />} />
            <Route path="/resumo/:g" element={<Resumo />} />
            <Route path="/ficha/:id" element={<FichaPagina />} />
            <Route path="/revisao" element={<MinhaRevisao />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/desempenho" element={<Desempenho />} />
            <Route path="/config" element={<Config />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      )}
      <Avisos />
    </HashRouter>
  );
}
