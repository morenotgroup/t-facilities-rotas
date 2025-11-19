// app/compras/page.tsx
import Link from 'next/link'

export default function ComprasPage() {
  return (
    <div className="flex h-full flex-col gap-3 px-4 py-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-100">Compras de Facilities</p>
        <Link href="/" className="text-[11px] text-amber-200 underline">
          Voltar
        </Link>
      </div>

      <p className="text-[11px] text-slate-200/80">
        Aqui o time de limpeza e cozinha vai registrar pedidos de compra, e o Bruno poderá
        acompanhar e marcar o que já foi comprado.
      </p>

      <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-100/90">
        Em breve:
        <ul className="mt-1 list-disc pl-4">
          <li>Lista de pedidos de compra abertos;</li>
          <li>Formulário simples para criar um novo pedido;</li>
          <li>Controle de status para o líder de Facilities.</li>
        </ul>
      </div>
    </div>
  )
}
