// app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex h-full flex-col gap-4 p-4 pb-6 text-slate-50">
      <section className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm shadow-lg shadow-purple-900/40 backdrop-blur-xl">
        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200">
          Bem-vindo ao T Facilities
        </p>
        <p className="mt-1 text-sm font-semibold">
          Rotas de Limpeza • Versão piloto
        </p>
        <p className="mt-1 text-[11px] text-slate-200">
          Escolha como você quer acessar a plataforma:
        </p>
      </section>

      <section className="flex flex-col gap-3 text-xs">
        {/* Card 1 – Equipe de Facilities */}
        <Link
          href="/minha-rota"
          className="group rounded-2xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-slate-900/80 p-4 shadow-lg shadow-emerald-900/40 backdrop-blur-2xl transition hover:border-emerald-300/70 hover:shadow-emerald-400/50"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-200">
                Equipe de Facilities
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-50">
                Acessar Minha Rota
              </p>
              <p className="mt-1 text-[11px] text-slate-200">
                Visualize a rota de limpeza do dia, marque o status de cada sala,
                registre ocorrências e faça upload de fotos.
              </p>
            </div>
            <div className="mt-1 rounded-full bg-black/40 px-2 py-1 text-[10px] font-semibold text-emerald-100">
              Uso interno
            </div>
          </div>
          <p className="mt-3 text-[10px] text-emerald-100/80">
            Recomendo salvar essa tela como atalho na tela inicial do celular da
            equipe de limpeza. Assim, um toque já abre a rota do dia.
          </p>
        </Link>

        {/* Card 2 – Colaboradores em geral */}
        <Link
          href="/sala/backyard-209"
          className="group rounded-2xl border border-sky-400/25 bg-gradient-to-br from-sky-500/20 via-sky-500/5 to-slate-900/80 p-4 shadow-lg shadow-sky-900/40 backdrop-blur-2xl transition hover:border-sky-300/70 hover:shadow-sky-400/50"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-sky-200">
                Colaboradores T Group
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-50">
                Ver status da minha sala
              </p>
              <p className="mt-1 text-[11px] text-slate-200">
                Na versão final, cada sala terá um QR Code na porta. Ao apontar a
                câmera, você verá aqui o status de limpeza e poderá enviar um
                feedback rápido.
              </p>
            </div>
            <div className="mt-1 rounded-full bg-black/40 px-2 py-1 text-[10px] font-semibold text-sky-100">
              Acesso via QR
            </div>
          </div>
          <p className="mt-3 text-[10px] text-sky-100/80">
            Neste ambiente de testes, este card leva para a sala{' '}
            <span className="font-semibold">Backyard 209</span> como exemplo.
          </p>
        </Link>
      </section>
    </div>
  )
}
