import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-4 py-6 text-slate-50">
      {/* Cabeçalho */}
      <header className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.24em] text-amber-200">
          T Facilities • Rotas de limpeza
        </p>
        <h1 className="mt-1 text-2xl font-semibold">
          Central de acesso ao app de Facilities
        </h1>
        <p className="mt-2 max-w-xl text-[12px] text-slate-300">
          Aqui você visualiza, em um único lugar, os três jeitos de usar o sistema:
          a visão do time de limpeza, a experiência via QR Code em cada sala e o
          painel estratégico da liderança de Facilities.
        </p>
      </header>

      {/* Grid de cards */}
      <section className="grid gap-4 md:grid-cols-3">
        {/* Card 1 – Colaborador de Facilities */}
        <article className="group flex flex-col rounded-3xl border border-emerald-400/40 bg-white/10 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-200">
                Perfil 1
              </p>
              <h2 className="text-sm font-semibold">
                Time de Facilities (rota + check-in)
              </h2>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-semibold text-emerald-50">
              Operação
            </span>
          </div>

          <p className="text-[12px] text-slate-200">
            O colaborador de Facilities acessa a rota diária, vê a lista de salas
            na ordem correta, registra cada limpeza, adiciona observações e pode
            subir uma foto da sala ou da ocorrência.
          </p>

          <ul className="mt-3 space-y-1 text-[11px] text-slate-300">
            <li>• Rota personalizada por colaborador</li>
            <li>• Registro de status da sala (Limpo / Pendente / Em andamento)</li>
            <li>• Observações de limpeza por ambiente</li>
            <li>• Upload de foto da sala ou problema encontrado</li>
          </ul>

          <div className="mt-4 flex-1" />

          <div className="mt-3">
            <Link
              href="/minha-rota"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-2.5 text-[11px] font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition group-hover:brightness-110"
            >
              Acessar como colaborador de Facilities
            </Link>
            <p className="mt-2 text-[10px] text-slate-400">
              No dia a dia, cada colaborador de Facilities usa o próprio e-mail
              corporativo para enxergar apenas a sua rota.
            </p>
          </div>
        </article>

        {/* Card 2 – Colaborador qualquer (QR Code) */}
        <article className="group flex flex-col rounded-3xl border border-sky-400/40 bg-white/10 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-sky-200">
                Perfil 2
              </p>
              <h2 className="text-sm font-semibold">
                Qualquer colaborador (QR na porta da sala)
              </h2>
            </div>
            <span className="rounded-full bg-sky-500/20 px-3 py-1 text-[10px] font-semibold text-sky-50">
              Experiência
            </span>
          </div>

          <p className="text-[12px] text-slate-200">
            Qualquer pessoa da casa aponta a câmera para o QR Code da sala e acessa
            uma página enxuta com o status da limpeza e um formulário rápido de
            feedback.
          </p>

          <ul className="mt-3 space-y-1 text-[11px] text-slate-300">
            <li>• Status da última limpeza da sala</li>
            <li>• Feedback rápido: “Tudo ok” ou “Tem problema”</li>
            <li>• Campo de comentário para detalhar o problema</li>
            <li>• Campo opcional de e-mail para retorno da equipe</li>
          </ul>

          <div className="mt-4 flex-1" />

          <div className="mt-3 space-y-2">
            <Link
              href="/sala/recepcao"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 px-4 py-2.5 text-[11px] font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition group-hover:brightness-110"
            >
              Ver exemplo de sala (Recepção)
            </Link>
            <p className="text-[10px] text-slate-400">
              Na prática, cada sala terá seu QR Code com link no formato{' '}
              <span className="font-mono">/sala/&lt;slug-da-sala&gt;</span> — por
              exemplo: <span className="font-mono">/sala/sala-gc</span>,{' '}
              <span className="font-mono">/sala/backyard-209</span>, etc.
            </p>
          </div>
        </article>

        {/* Card 3 – Líder de Facilities (painel + cadastros) */}
        <article className="group flex flex-col rounded-3xl border border-amber-400/50 bg-white/10 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200">
                Perfil 3
              </p>
              <h2 className="text-sm font-semibold">
                Liderança de Facilities (painel + gestão)
              </h2>
            </div>
            <span className="rounded-full bg-amber-500/25 px-3 py-1 text-[10px] font-semibold text-amber-50">
              Gestão
            </span>
          </div>

          <p className="text-[12px] text-slate-200">
            A liderança tem uma visão consolidada dos problemas mais recentes,
            últimos check-ins de limpeza e consegue gerenciar a lista de ambientes
            da sede, incluindo os slugs usados nos QR Codes.
          </p>

          <ul className="mt-3 space-y-1 text-[11px] text-slate-300">
            <li>• Painel com problemas recentes reportados nas salas</li>
            <li>• Lista de últimos check-ins da equipe de Facilities</li>
            <li>• Cadastro e edição de ambientes (nome, andar, tipo, slug QR)</li>
            <li>• Base pronta para evoluir para permissões e login real</li>
          </ul>

          <div className="mt-4 flex-1" />

          <div className="mt-3 space-y-2">
            <Link
              href="/painel-facilities"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-fuchsia-500 px-4 py-2.5 text-[11px] font-semibold text-slate-950 shadow-lg shadow-amber-500/40 transition group-hover:brightness-110"
            >
              Abrir painel de problemas e check-ins
            </Link>
            <Link
              href="/admin/ambientes"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-black/40 px-4 py-2.5 text-[11px] font-semibold text-slate-100 shadow-lg shadow-black/60 transition group-hover:border-amber-300/60 group-hover:text-amber-50"
            >
              Gerenciar ambientes e QR Codes
            </Link>
          </div>
        </article>
      </section>
    </main>
  )
}
