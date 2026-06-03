import type { Passeio } from '../lib/api'

const NUMERAL = ['I', 'II', 'III', 'IV', 'V']

type Props = {
  passeio: Passeio
  index: number
  onInscrever: (passeio: Passeio) => void
}

export function PasseioCard({ passeio, index, onInscrever }: Props) {
  const { nome, descricao, limiteVagas, inscritos, vagasRestantes, esgotado } = passeio
  const pct = Math.min(1, inscritos / limiteVagas)

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
      <p className="card-desc">{descricao}</p>

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
