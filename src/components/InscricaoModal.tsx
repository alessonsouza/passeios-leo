import { useEffect, useState } from 'react'
import { api, ApiError, type Clube, type Passeio, type InscricaoResultado } from '../lib/api'

type Props = {
  passeio: Passeio
  clubes: Clube[]
  onClose: () => void
  onSuccess: (resultado: InscricaoResultado) => void
}

export function InscricaoModal({ passeio, clubes, onClose, onSuccess }: Props) {
  const [nome, setNome] = useState('')
  const [clubeId, setClubeId] = useState('')
  const [erroNome, setErroNome] = useState<string | null>(null)
  const [erroClube, setErroClube] = useState<string | null>(null)
  const [erroServidor, setErroServidor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const validarNome = (valor: string) => {
    const palavras = valor.trim().split(/\s+/).filter((p) => p.length >= 2)
    if (valor.trim().length < 5) return 'Informe seu nome completo'
    if (palavras.length < 2) return 'Informe nome e sobrenome'
    return null
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErroServidor(null)

    const nomeErr = validarNome(nome)
    const clubeErr = clubeId ? null : 'Selecione seu clube'
    setErroNome(nomeErr)
    setErroClube(clubeErr)
    if (nomeErr || clubeErr) return

    setLoading(true)
    try {
      const resultado = await api.inscrever({
        passeioId: passeio.id,
        clubeId,
        nomeCompleto: nome,
      })
      onSuccess(resultado)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Não foi possível concluir sua inscrição. Tente novamente.'
      setErroServidor(msg)
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <span className="modal-corner tl" />
        <span className="modal-corner tr" />
        <span className="modal-corner bl" />
        <span className="modal-corner br" />

        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <p className="modal-eyebrow">Inscrição - {passeio.nome}</p>
        <h2 className="modal-title">Confirme seus dados</h2>

        {erroServidor && <div className="modal-error">{erroServidor}</div>}

        <form onSubmit={submit} noValidate>
          <div className="field">
            <label className="label" htmlFor="nome">Nome completo</label>
            <input
              id="nome"
              type="text"
              className="input"
              value={nome}
              onChange={(e) => { setNome(e.target.value); setErroNome(null) }}
              autoComplete="name"
              autoFocus
              disabled={loading}
              maxLength={200}
            />
            {erroNome && <p className="error-msg">{erroNome}</p>}
          </div>

          <div className="field">
            <label className="label" htmlFor="clube">Clube de origem</label>
            <select
              id="clube"
              className="select"
              value={clubeId}
              onChange={(e) => { setClubeId(e.target.value); setErroClube(null) }}
              disabled={loading}
            >
              <option value="">Selecione um clube…</option>
              {clubes.map((c) => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
            {erroClube && <p className="error-msg">{erroClube}</p>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Enviando…' : 'Confirmar inscrição'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
