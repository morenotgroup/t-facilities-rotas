// app/page.tsx
import Link from 'next/link'
import { mockCurrentUser } from '@/lib/roles'
import { visibleMenusForRole } from '@/lib/menu'

function getSaudacao(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

// Mensagens simples de motivação (pode virar tabela depois)
const mensagens = [
  'Cada sala limpa é um pouco mais de conforto pra todo mundo.',
  'Seu trabalho faz o T Group parecer casa de verdade, não só escritório.',
  'Limpar também é cuidar das pessoas que passam por aqui.',
  'Organização não é detalhe, é parte da experiência T Group.',
]

function getMensagemMotivacao() {
  const index = new Date().getDate() % mensagens.length
  return mensagens[index]
}

export default function HomePage() {
  const user = mockCurrentUser
  const saudacao = getSaudacao()
  const menus = visibleMenusForRole(user.role)
  const mensagem = getMensagemMotivacao()

  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4">
      {/* Topo com saudação */}
      <section className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-md backdrop-blur-md">
        <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200/80">
          {saudacao}, {user.name}
        </p>
        <p className="mt-1 text-sm font-semibold text-white">
          Bem-vindo ao T.Facilities Hub
        </p>
        <p className="mt-2 text-[11px] text-amber-100/90">{mensagem}</p>

        <p className="mt-3 text-[10px] text-amber-100/60">
          Perfil atual:{' '}
          <span className="font-semibold">
            {user.role === 'SUPER_ADMIN' && 'Super Admin'}
            {user.role === 'LIDER_FACILITIES' && 'Líder de Facilities'}
            {user.role === 'LIMPEZA' && 'Time de Limpeza'}
            {user.role === 'COZINHA' && 'Cozinha'}
          </span>
        </p>
      </section>

      {/* Menus */}
      <section className="flex flex-1 flex-col gap-3 pb-2">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-200/80">
          Suas ferramentas
        </p>

        <div className="grid grid-cols-1 gap-3">
          {menus.map((menu) => (
            <Link key={menu.id} href={menu.href}>
              <div className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-sm backdrop-blur-md transition hover:border-amber-300/60 hover:bg-white/10 hover:shadow-lg">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-400/90 text-lg shadow">
                  <span>{menu.icon}</span>
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="text-sm font-semibold text-white">{menu.label}</p>
                  <p className="text-[11px] text-slate-100/80">{menu.description}</p>
                </div>
                <div className="text-[10px] text-amber-200/70 group-hover:text-amber-100">
                  Abrir
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}