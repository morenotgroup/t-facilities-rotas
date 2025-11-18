// app/api/ambientes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const ambientes = await prisma.ambiente.findMany({
      orderBy: { nome: 'asc' },
    })
    return NextResponse.json(ambientes)
  } catch (error) {
    console.error('Erro em GET /api/ambientes', error)
    return NextResponse.json(
      { error: 'Erro ao listar ambientes.' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      nome,
      andar,
      bloco,
      tipo,
      slugQr,
      frequenciaPadrao,
      ativo = true,
    } = body

    if (!nome || !slugQr) {
      return NextResponse.json(
        { error: 'Nome e slug são obrigatórios.' },
        { status: 400 },
      )
    }

    const ambiente = await prisma.ambiente.create({
      data: {
        nome,
        andar: andar || null,
        bloco: bloco || null,
        tipo: tipo || null,
        slugQr,
        frequenciaPadrao: frequenciaPadrao || null,
        ativo: Boolean(ativo),
      },
    })

    return NextResponse.json(ambiente, { status: 201 })
  } catch (error) {
    console.error('Erro em POST /api/ambientes', error)
    return NextResponse.json(
      { error: 'Erro ao criar ambiente.' },
      { status: 500 },
    )
  }
}
