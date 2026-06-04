// Utilidades de CPF: máscara, normalização e validação dos dígitos verificadores.

export const onlyDigits = (s: string): string => s.replace(/\D/g, '')

// Formata progressivamente: 000.000.000-00
export function formatCpf(value: string): string {
  const d = onlyDigits(value).slice(0, 11)
  if (d.length > 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
  if (d.length > 6) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  if (d.length > 3) return `${d.slice(0, 3)}.${d.slice(3)}`
  return d
}

// Valida CPF pelo algoritmo oficial dos dígitos verificadores.
export function isValidCpf(value: string): boolean {
  const cpf = onlyDigits(value)
  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false // rejeita 000.000.000-00, 111... etc.

  let soma = 0
  for (let i = 0; i < 9; i++) soma += Number(cpf[i]) * (10 - i)
  let dv1 = (soma * 10) % 11
  if (dv1 === 10) dv1 = 0
  if (dv1 !== Number(cpf[9])) return false

  soma = 0
  for (let i = 0; i < 10; i++) soma += Number(cpf[i]) * (11 - i)
  let dv2 = (soma * 10) % 11
  if (dv2 === 10) dv2 = 0
  if (dv2 !== Number(cpf[10])) return false

  return true
}
