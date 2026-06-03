const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export type Passeio = {
  id: string
  slug: string
  nome: string
  descricao: string | null
  limiteVagas: number
  ordem: number
  inscritos: number
  vagasRestantes: number
  esgotado: boolean
}

export type Clube = { id: string; nome: string }

export type InscricaoResultado = {
  id: string
  passeio: { id: string; nome: string; slug: string }
  vagasRestantes: number
}

export class ApiError extends Error {
  code?: string
  constructor(message: string, code?: string) {
    super(message)
    this.code = code
  }
}

// O tRPC standalone usa superjson como transformer e expõe rotas em
// GET /<router>.<procedure>?input=<json>      (queries)
// POST /<router>.<procedure>                  (mutations)
// Onde queries sem input mandam input vazio.

async function rpcQuery<T>(path: string, input?: unknown): Promise<T> {
  const url = new URL(`${BASE}/${path}`)
  if (input !== undefined) {
    url.searchParams.set('input', JSON.stringify({ json: input }))
  }
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return parse<T>(res)
}

async function rpcMutation<T>(path: string, input: unknown): Promise<T> {
  const res = await fetch(`${BASE}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ json: input }),
  })
  return parse<T>(res)
}

async function parse<T>(res: Response): Promise<T> {
  const body = await res.json().catch(() => null)
  if (!res.ok || body?.error) {
    const msg = body?.error?.message || body?.error?.json?.message || `Erro ${res.status}`
    const code = body?.error?.data?.code || body?.error?.json?.data?.code
    throw new ApiError(msg, code)
  }
  return (body?.result?.data?.json ?? body?.result?.data) as T
}

export const api = {
  listarPasseios: () => rpcQuery<Passeio[]>('passeios.listarPasseios'),
  listarClubes: () => rpcQuery<Clube[]>('passeios.listarClubes'),
  inscrever: (input: { passeioId: string; clubeId: string; nomeCompleto: string }) =>
    rpcMutation<InscricaoResultado>('passeios.inscrever', input),
}
