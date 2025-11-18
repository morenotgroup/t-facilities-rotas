// app/admin/ambientes/page.tsx
import { prisma } from '@/lib/prisma'
import { AmbientesAdmin } from './AmbientesAdmin'

export default async function AmbientesPage() {
  const ambientes = await prisma.ambiente.findMany({
    orderBy: { nome: 'asc' },
  })

  const serializados = ambientes.map((a) => ({
    id: a.id,
    nome: a.nome,
    andar: a.andar,
    bloco: a.bloco,
    tipo: a.tipo,
    slugQr: a.slugQr,
    frequenciaPadrao: a.frequenciaPadrao,
    ativo: a.ativo,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 p-4 pb-10 text-slate-50">
      <header className="mb-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200">
          Admin • Facilities
        </p>
        <h1 className="text-xl font-semibold">Gestão de ambientes</h1>
        <p className="text-[11px] text-slate-300">
          Cadastre e ajuste os ambientes que entram nas rotas de limpeza e recebem
          QR Code.
        </p>
      </header>

      <AmbientesAdmin initialAmbientes={serializados} />
    </div>
  )
}
