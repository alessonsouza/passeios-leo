export function Hero() {
  return (
    <header className="hero">
      <img src="/spotlight.png" alt="SPOTLIGHT - O brilho de quem fez acontecer" className="hero-logo" />
      <p className="hero-eyebrow">Inscrições abertas</p>
      <h1 className="hero-title">
        Passeios e Atividades da <em>XXVII Conferência</em> do Distrito LEO LD-8
      </h1>
      <div className="hero-divider">
        <span className="hero-divider-icon">✦</span>
      </div>
      <p className="hero-subtitle">
        Escolha um dos três passeios exclusivos preparados para os companheiros LEO.
        Cada participante pode escolher apenas uma atividade - garanta sua vaga antes que esgotem.
      </p>
      <aside className="hero-aviso" role="alert">
        <span className="hero-aviso-corner tl" />
        <span className="hero-aviso-corner tr" />
        <span className="hero-aviso-corner bl" />
        <span className="hero-aviso-corner br" />
        <div className="hero-aviso-header">
          <span className="hero-aviso-icon" aria-hidden="true">!</span>
          <span className="hero-aviso-label">Leia antes de se inscrever</span>
        </div>
        <p>
          As atividades ocorrerão <strong>em paralelo às plenárias</strong> (sábado à tarde).
          Se você será <strong>delegado</strong>, <u>não se inscreva</u>.
        </p>
        <p className="hero-aviso-sub">
          Inscreva-se apenas se tiver certeza de que irá participar -
          assim você não tira a vaga de outro companheiro.
        </p>
      </aside>
    </header>
  )
}
