// app/api/minha-rota/route.ts
// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        {
          ok: false,
          error: 'E-mail é obrigatório para carregar a rota.',
        },
        { status: 400 },
      )
    }

    // 1. Buscar colaborador de Facilities pelo e-mail
    const colab = await prisma.colaboradorFacility.findUnique({
      where: { email },
    })

    if (!colab) {
      // Não é erro "interno" — só não existe colaborador com esse e-mail
      return NextResponse.json(
        {
          ok: true,
          rota: null,
          colab: null,
          message:
            'Nenhum colaborador de Facilities foi encontrado com este e-mail.',
        },
        { status: 200 },
      )
    }

    // 2. Datas de hoje (início e fim do dia) para buscar a rota
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const amanha = new Date(hoje)
    amanha.setDate(hoje.getDate() + 1)

    // 3. Buscar rota de hoje para esse colaborador
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
          orderBy: { ordem: 'asc' },
          include: {
            ambiente: true,
          },
        },
      },
    })

    if (!rota) {
      // Colaborador existe, mas ainda não tem rota pra hoje
      return NextResponse.json(
        {
          ok: true,
          rota: null,
          colab: {
            id: colab.id,
            nome: colab.nome,
            email: colab.email,
          },
          message: 'Ainda não foi cadastrada uma rota de limpeza para hoje.',
        },
        { status: 200 },
      )
    }

    const itens = rota.itens.map((item) => {
      const amb = item.ambiente

      return {
        id: item.id,
        ordem: item.ordem,
        status: item.status,
        observacoes: item.obs ?? '',
        ambiente: amb
          ? {
              id: amb.id,
              nome: amb.nome,
              slugQr: amb.slugQr,
              tipo: amb.tipo ?? '',
              andar: amb.andar ?? '',
              bloco: amb.bloco ?? '',
              frequenciaPadrao: amb.frequenciaPadrao ?? '',
            }
          : null,
      }
    })

    return NextResponse.json(
      {
        ok: true,
        rota: {
          id: rota.id,
          data: rota.data.toISOString(),
          periodo: rota.periodo ?? '',
          obsGeral: rota.obsGeral ?? '',
          colab: {
            id: colab.id,
            nome: colab.nome,
            email: colab.email,
          },
          itens,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Erro em /api/minha-rota', error)
    return NextResponse.json(
      {
        ok: false,
        error: 'Erro interno ao carregar a rota de limpeza.',
      },
      { status: 500 },
    )
  }
}
