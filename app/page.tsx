export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4 text-sm text-slate-700">
      <p>Bem-vindo ao T Facilities – Rotas de Limpeza.</p>
      <p>
        Use:
        <br />
        <code className="rounded bg-slate-100 px-1 py-0.5">
          /minha-rota
        </code>{' '}
        para visualizar a rota do dia (demo).
      </p>
      <p>
        E:
        <br />
        <code className="rounded bg-slate-100 px-1 py-0.5">
          /sala/backyard-209
        </code>{' '}
        para ver o status de uma sala em modo QR (demo).
      </p>
    </div>
  )
}
