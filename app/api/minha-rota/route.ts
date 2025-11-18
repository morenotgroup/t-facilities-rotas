import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'E-mail é obrigatório.' },
        { status: 400 },
      )
    }

    // 1. Colaborador de Facilities pelo e-mail
    const colaborador = await prisma.colaboradorFacility.findFirst({
      where: {
        email,
        ativo: true,
      },
    })

    if (!colaborador) {
      return NextResponse.json(
        { error: 'Colaborador de Facilities não encontrado ou inativo.' },
        { status: 404 },
      )
    }

    // 2. Rota de HOJE (00:00 até 23:59) desse colaborador
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const amanha = new Date(hoje)
    amanha.setDate(hoje.getDate() + 1)

    const rota = await prisma.rotaDiaria.findFirst({
      where: {
        colabId: colaborador.id,
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
          orderBy: {
            ordem: 'asc',
          },
        },
      },
    })

    if (!rota) {
      return NextResponse.json(
        {
          error:
            'Nenhuma rota encontrada para este colaborador na data de hoje.',
        },
        { status: 404 },
      )
    }

    // 3. Formatar resposta pra tela /minha-rota
    return NextResponse.json({
      colaborador: {
        id: colaborador.id,
        nome: colaborador.nome,
        email: colaborador.email,
      },
      rota: {
        id: rota.id,
        data: rota.data.toISOString(),
        turno: rota.turno,
        obsGeral: rota.obsGeral,
        itens: rota.itens.map((item) => ({
          id: item.id,
          ordem: item.ordem,
          prioridade: item.prioridade,
          checklist: item.checklist,
          ambiente: {
            id: item.ambiente.id,
            nome: item.ambiente.nome,
            andar: item.ambiente.andar,
            bloco: item.ambiente.bloco,
            tipo: item.ambiente.tipo,
          },
        })),
      },
    })
  } catch (error) {
    console.error('Erro em GET /api/minha-rota', error)
    return NextResponse.json(
      { error: 'Erro interno ao carregar rota.' },
      { status: 500 },
    )
  }
}
