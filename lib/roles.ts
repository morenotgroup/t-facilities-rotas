// lib/roles.ts

export type Role = 'SUPER_ADMIN' | 'LIDER_FACILITIES' | 'LIMPEZA' | 'COZINHA'

export type TFacilitiesUser = {
  id: string
  name: string
  email: string
  role: Role
}

// ⚠️ MOCK: aqui a gente finge que o usuário logado é o Moreno.
// Quando vier autenticação real, vamos substituir por session.user.
export const mockCurrentUser: TFacilitiesUser = {
  id: 'user-moreno',
  name: 'Moreno',
  email: 'gc@agenciataj.com',
  role: 'SUPER_ADMIN', // troque pra LIMPEZA, COZINHA, etc pra testar menus
}