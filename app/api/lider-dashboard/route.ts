// app/api/lider-dashboard/route.ts
// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // 1. Colaboradores de Facilities ativos
    const colaboradores = await prisma.colaboradorFacility.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' },
    })

    // 2. Rotas de hoje
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const amanha = new Date(hoje)
    amanha.setDate(hoje.getDate() + 1)

    const rotasHoje = await prisma.rotaDiaria.findMany({
      where: {
        data: {
          gte: hoje,
          lt: amanha,
        },
      },
      include: {
        itens: true,
      },
    })

    // 3. Feedbacks recentes marcados como PROBLEMA
    const feedbacksProblema = await prisma.feedbackSala.findMany({
      where: { statusSala: 'PROBLEMA' },
      take: 5,
      orderBy: {
        id: 'desc', // id com certeza existe
      },
    })

    return NextResponse.json(
      {
        ok: true,
        colaboradores,
        rotasHoje,
        feedbacksProblema,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Erro em /api/lider-dashboard', error)
    return NextResponse.json(
      {
        ok: false,
        error: 'Erro interno ao carregar dados da liderança de Facilities.',
      },
      { status: 500 },
    )
  }
}
