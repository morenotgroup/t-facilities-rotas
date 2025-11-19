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
      // Colaborador não encontrado: não é erro de servidor
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

    // 2. Definir intervalo de "hoje"
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
      // Colaborador existe, só ainda não tem rota pra hoje
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

    // 4. Montar itens da rota em formato amigável
    const itens = (rota.itens || []).map((item) => {
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

    // 5. Resposta final
    return NextResponse.json(
      {
        ok: true,
        rota: {
          id: rota.id,
          // deixar o Date “cru”; o Next serializa para ISO
          data: rota.data,
          periodo: rota.periodo ?? null,
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
  } catch (error: any) {
    console.error('Erro em /api/minha-rota', error)
    return NextResponse.json(
      {
        ok: false,
        error:
          error?.message ||
          'Erro interno ao carregar a rota de limpeza (detalhes não disponíveis).',
      },
      { status: 500 },
    )
  }
}
