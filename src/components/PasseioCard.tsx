import type { Passeio } from '../lib/api'

const NUMERAL = ['I', 'II', 'III', 'IV', 'V']

type Props = {
  passeio: Passeio
  index: number
  onInscrever: (passeio: Passeio) => void
}

// Separa parágrafos comuns de um eventual parágrafo de aviso ("Atenção: ...").
function splitDescricao(descricao: string | null): { corpo: string; aviso: string | null } {
  if (!descricao) return { corpo: '', aviso: null }
  const paragrafos = descricao.split(/\n{2,}/)
  const avisoRegex = /^\s*aten[çc][ãa]o\s*:\s*/i
  const avisoIdx = paragrafos.findIndex((p) => avisoRegex.test(p))
  if (avisoIdx === -1) return { corpo: descricao, aviso: null }
  const aviso = paragrafos[avisoIdx]!.replace(avisoRegex, '').trim()
  const corpo = paragrafos.filter((_, i) => i !== avisoIdx).join('\n\n')
  return { corpo, aviso }
}

export function PasseioCard({ passeio, index, onInscrever }: Props) {
  const { nome, descricao, limiteVagas, inscritos, vagasRestantes, esgotado } = passeio
  const pct = Math.min(1, inscritos / limiteVagas)
  const { corpo, aviso } = splitDescricao(descricao)

  return (
    <article
      className="card card-enter"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <span className="card-corner tl" />
      <span className="card-corner tr" />
      <span className="card-corner bl" />
      <span className="card-corner br" />

      <span className="card-number">{NUMERAL[index] ?? `${index + 1}`}</span>
      <h2 className="card-title">{nome}</h2>

      <div className="card-body">
        {corpo && <p className="card-desc">{corpo}</p>}
        {aviso && (
          <div className="card-aviso" role="note">
            <span className="card-aviso-icon" aria-hidden="true">!</span>
            <p className="card-aviso-text"><strong>Atenção:</strong> {aviso}</p>
          </div>
        )}
      </div>

      <div className="card-vagas">
        <span className={`card-vagas-num ${esgotado ? 'full' : ''}`}>
          {vagasRestantes}
        </span>
        <span className="card-vagas-label">
          {vagasRestantes === 1 ? 'vaga restante' : 'vagas restantes'}
        </span>
      </div>
      <p className="card-vagas-total">de {limiteVagas} no total</p>

      <div className="card-bar">
        <div className="card-bar-fill" style={{ transform: `scaleX(${pct})` }} />
      </div>

      {esgotado ? (
        <span className="badge-esgotado">Esgotado</span>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onInscrever(passeio)}
        >
          Inscrever-se
        </button>
      )}
    </article>
  )
}
