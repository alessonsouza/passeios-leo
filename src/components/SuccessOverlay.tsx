import { useEffect } from 'react'
import type { InscricaoResultado } from '../lib/api'

// Grupo de WhatsApp por passeio (chave = slug do passeio).
const WHATSAPP_GRUPOS: Record<string, string> = {
  'planetario': 'https://chat.whatsapp.com/LbofnHxAZ8P6DiSdCcrdkq',
  'defesa-pessoal': 'https://chat.whatsapp.com/EDEw7oAfWrFAYiL40n0eNY',
  'primeiros-socorros': 'https://chat.whatsapp.com/KQ9ngmUwGvQHL2RhRfG4xY',
}

// Usado caso surja um passeio sem grupo próprio cadastrado acima.
const WHATSAPP_FALLBACK = 'https://chat.whatsapp.com/LbofnHxAZ8P6DiSdCcrdkq'

type Props = {
  resultado: InscricaoResultado
  onClose: () => void
}

export function SuccessOverlay({ resultado, onClose }: Props) {
  const whatsappGrupo = WHATSAPP_GRUPOS[resultado.passeio.slug] ?? WHATSAPP_FALLBACK

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

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <span className="modal-corner tl" />
        <span className="modal-corner tr" />
        <span className="modal-corner bl" />
        <span className="modal-corner br" />

        <div className="success">
          <div className="success-check">✓</div>
          <p className="modal-eyebrow">Inscrição confirmada</p>
          <h2 className="success-title">Vejo você lá</h2>
          <p className="success-msg">
            Você está inscrito no passeio <strong style={{ color: 'var(--champagne)' }}>{resultado.passeio.nome}</strong>.
          </p>
          <p className="success-detail">
            Restam <strong>{resultado.vagasRestantes}</strong> {resultado.vagasRestantes === 1 ? 'vaga' : 'vagas'} para outros companheiros.
          </p>
          <p className="success-detail">
            Entre no grupo do WhatsApp para receber as informações e novidades do passeio.
          </p>
          <div className="success-actions">
            <a
              className="btn btn-primary"
              href={whatsappGrupo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24-1.52 0-3-.41-4.29-1.18l-.31-.18-3.12.82.83-3.04-.2-.32a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24Zm-4.51 4.4c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.51 1.8.66.76.24 1.45.21 1.99.13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37-.31-.16-1.87-.92-2.16-1.03-.29-.11-.5-.16-.71.16-.21.31-.81 1.03-.99 1.24-.18.21-.37.24-.68.08-.31-.16-1.32-.49-2.51-1.55-.93-.83-1.56-1.85-1.74-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.11-.21.05-.39-.03-.55-.08-.16-.69-1.72-.95-2.35-.25-.61-.5-.53-.69-.54-.18-.01-.39-.01-.6-.01Z" />
              </svg>
              Entrar no grupo do WhatsApp
            </a>
            <button type="button" className="btn" onClick={onClose}>
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
