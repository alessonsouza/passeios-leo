import { useEffect, useState } from 'react'
import { Hero } from './components/Hero'
import { PasseioCard } from './components/PasseioCard'
import { InscricaoModal } from './components/InscricaoModal'
import { SuccessOverlay } from './components/SuccessOverlay'
import { api, type Passeio, type Clube, type InscricaoResultado } from './lib/api'

// Inscrições encerradas: bloqueia os botões e exibe o aviso geral.
const INSCRICOES_ENCERRADAS = true

function App() {
  const [passeios, setPasseios] = useState<Passeio[] | null>(null)
  const [clubes, setClubes] = useState<Clube[]>([])
  const [erroFetch, setErroFetch] = useState<string | null>(null)
  const [selecionado, setSelecionado] = useState<Passeio | null>(null)
  const [resultado, setResultado] = useState<InscricaoResultado | null>(null)

  const carregar = async () => {
    try {
      const [p, c] = await Promise.all([api.listarPasseios(), api.listarClubes()])
      setPasseios(p)
      setClubes(c)
      setErroFetch(null)
    } catch {
      setErroFetch('Não foi possível carregar os passeios. Recarregue a página em instantes.')
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const aoConfirmar = (r: InscricaoResultado) => {
    setSelecionado(null)
    setResultado(r)
    carregar()
  }

  return (
    <div className="page">
      <div className="container">
        <Hero />

        <section className="passeios-section">
          <p className="section-label">- Atividades disponíveis -</p>

          {INSCRICOES_ENCERRADAS && (
            <div className="aviso-encerrado" role="status">
              <span className="aviso-encerrado-icon" aria-hidden="true">!</span>
              <p className="aviso-encerrado-text">
                <strong>Inscrições encerradas.</strong> As inscrições para os passeios foram
                encerradas. Obrigado a todos que participaram!
              </p>
            </div>
          )}

          {erroFetch && (
            <div className="modal-error" style={{ maxWidth: 480, margin: '0 auto' }}>
              {erroFetch}
            </div>
          )}

          {!passeios && !erroFetch && <div className="loading">Carregando atividades</div>}

          {passeios && (
            <div className="passeios-grid">
              {passeios.map((p, i) => (
                <PasseioCard
                  key={p.id}
                  passeio={p}
                  index={i}
                  encerrado={INSCRICOES_ENCERRADAS}
                  onInscrever={setSelecionado}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="footer">
          <div className="footer-rule" />
          <p>XXVII Conferência do Distrito LEO LD-8 · Spotlight</p>
        </footer>
      </div>

      {selecionado && (
        <InscricaoModal
          passeio={selecionado}
          clubes={clubes}
          onClose={() => setSelecionado(null)}
          onSuccess={aoConfirmar}
        />
      )}

      {resultado && (
        <SuccessOverlay resultado={resultado} onClose={() => setResultado(null)} />
      )}
    </div>
  )
}

export default App
