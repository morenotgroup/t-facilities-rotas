// lib/menu.ts
import type { Role } from './roles'

export type MenuItem = {
  id: string
  label: string
  description: string
  href: string
  icon: string // vamos usar emoji por enquanto, depois dá pra trocar por ícones SVG
  roles: Role[] | 'ALL'
}

export const menuItems: MenuItem[] = [
  {
    id: 'guia',
    label: 'Guia de Facilities',
    description: 'Procedimentos, dicas de limpeza e manuais da casa.',
    href: '/guia',
    icon: '📘',
    roles: 'ALL',
  },
  {
    id: 'limpeza',
    label: 'Limpeza',
    description: 'Veja sua rota de hoje e registre as salas concluídas.',
    href: '/limpeza',
    icon: '🧽',
    roles: ['LIMPEZA', 'LIDER_FACILITIES', 'SUPER_ADMIN'],
  },
  {
    id: 'cozinha',
    label: 'Cozinha',
    description: 'Cardápio do dia, da semana e rotinas da cozinha.',
    href: '/cozinha',
    icon: '🍽️',
    roles: ['COZINHA', 'LIDER_FACILITIES', 'SUPER_ADMIN'],
  },
  {
    id: 'compras',
    label: 'Compras',
    description: 'Liste itens que precisam ser comprados para limpeza e cozinha.',
    href: '/compras',
    icon: '🧾',
    roles: ['LIMPEZA', 'COZINHA', 'LIDER_FACILITIES', 'SUPER_ADMIN'],
  },
  {
    id: 'calendario',
    label: 'Calendário do mês',
    description: 'Veja os eventos e ações do T Group no mês.',
    href: '/calendario',
    icon: '📅',
    roles: 'ALL',
  },
  {
    id: 'ambientes',
    label: 'Ambientes da casa',
    description: 'Cadastre e gerencie salas e espaços do T Group.',
    href: '/admin/ambientes',
    icon: '🏠',
    roles: ['LIDER_FACILITIES', 'SUPER_ADMIN'],
  },
  {
    id: 'rotas',
    label: 'Rotas de limpeza',
    description: 'Defina rotas por dia e distribua ambientes entre o time.',
    href: '/admin/rotas',
    icon: '🗺️',
    roles: ['LIDER_FACILITIES', 'SUPER_ADMIN'],
  },
]

export function visibleMenusForRole(role: Role): MenuItem[] {
  return menuItems.filter((item) =>
    item.roles === 'ALL' ? true : item.roles.includes(role),
  )
}