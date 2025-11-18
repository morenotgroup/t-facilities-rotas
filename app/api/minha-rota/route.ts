// app/api/minha-rota/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { ok: false, error: 'E-mail do colaborador é obrigatório.' },
        { status: 200 },
      )
    }

    const colaborador = await prisma.colaboradorFacility.findUnique({
      where: { email },
    })

    if (!colaborador) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Nenhum colaborador de Facilities encontrado com este e-mail.',
        },
        { status: 200 },
      )
    }

    // Janela de "hoje"
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const amanha = new Date(hoje)
    amanha.setDate(hoje.getDate() + 1)

    // Pega a rota do dia para esse colaborador
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
          orderBy: { ordem: 'asc' },
          include: {
            ambiente: true,
          },
        },
      },
    })

    if (!rota) {
      return NextResponse.json(
        {
          ok: true,
          rota: null,
          message:
            'Ainda não existe rota registrada para hoje para este colaborador. Peça para o líder de Facilities gerar a rota do dia.',
        },
        { status: 200 },
      )
    }

    const rotaSerializada = {
      id: rota.id,
      data: rota.data,
      obsGeral: rota.obsGeral ?? null,
      colaborador: {
        id: colaborador.id,
        nome: colaborador.nome,
        email: colaborador.email,
      },
      itens: rota.itens.map((item) => {
        if (!item.ambiente) {
          return {
            id: item.id,
            ordem: item.ordem,
            prioridade: item.prioridade ?? null,
            ambiente: null,
          }
        }

        // monta localizacao a partir de andar + bloco
        const partesLoc: string[] = []
        if (item.ambiente.andar) partesLoc.push(item.ambiente.andar)
        if (item.ambiente.bloco) partesLoc.push(item.ambiente.bloco)
        const localizacao = partesLoc.join(' • ')

        return {
          id: item.id,
          ordem: item.ordem,
          prioridade: item.prioridade ?? null,
          ambiente: {
            id: item.ambiente.id,
            nome: item.ambiente.nome,
            localizacao,
            slug: item.ambiente.slugQr, // usar o slugQr do banco
          },
        }
      }),
    }

    return NextResponse.json(
      {
        ok: true,
        rota: rotaSerializada,
      },
      { status: 200 },
    )
  } catch (err: any) {
    console.error('API /minha-rota ERROR', err)
    return NextResponse.json(
      {
        ok: false,
        error: 'Erro interno ao carregar rota.',
        detail: String(err?.message ?? err),
      },
      { status: 500 },
    )
  }
}
