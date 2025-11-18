// app/api/feedback/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { ambienteId, userEmail, avaliacao, comentario } = body

    if (!ambienteId || !avaliacao) {
      return NextResponse.json(
        { error: 'Ambiente e avaliação são obrigatórios.' },
        { status: 400 },
      )
    }

    if (!['OK', 'PROBLEMA'].includes(avaliacao)) {
      return NextResponse.json(
        { error: 'Avaliação inválida. Use OK ou PROBLEMA.' },
        { status: 400 },
      )
    }

    const feedback = await prisma.feedbackSala.create({
      data: {
        dataHora: new Date(),
        ambienteId,
        userEmail: userEmail || null,
        avaliacao,
        comentario: comentario || null,
      },
    })

    return NextResponse.json({ ok: true, feedback })
  } catch (error) {
    console.error('Erro em /api/feedback', error)
    return NextResponse.json(
      { error: 'Erro interno ao registrar feedback.' },
      { status: 500 },
    )
  }
}
