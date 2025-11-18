// app/api/minha-rota/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'E-mail é obrigatório.' }, { status: 400 })
  }

  const colab = await prisma.colaboradorFacility.findUnique({
    where: { email },
  })

  if (!colab) {
    return NextResponse.json(
      { error: 'Colaborador de Facilities não encontrado.' },
      { status: 404 },
    )
  }

  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const amanha = new Date(hoje)
  amanha.setDate(hoje.getDate() + 1)

  const rota = await prisma.rotaDiaria.findFirst({
    where: {
      colabId: colab.id,
      data: {
        gte: hoje,
        lt: amanha,
      },
    },
    include: {
      itens: {
        include: {
          ambiente: true,
        },
        orderBy: { ordem: 'asc' },
      },
    },
  })

  if (!rota) {
    return NextResponse.json(
      { error: 'Nenhuma rota cadastrada para hoje.' },
      { status: 404 },
    )
  }

  return NextResponse.json({
    colaborador: {
      id: colab.id,
      nome: colab.nome,
      email: colab.email,
    },
    rota: {
      id: rota.id,
      data: rota.data,
      turno: rota.turno,
      obsGeral: rota.obsGeral,
      itens: rota.itens,
    },
  })
}
