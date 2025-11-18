import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, ambienteId, rotaId, status, observacoes, fotoUrl } = body

  if (!email || !ambienteId || !rotaId || !status) {
    return NextResponse.json(
      { error: 'Campos obrigatórios ausentes.' },
      { status: 400 },
    )
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

  const checkin = await prisma.checkinLimpeza.create({
    data: {
      dataHora: new Date(),
      ambienteId,
      rotaId,
      colabId: colab.id,
      status,
      observacoes: observacoes || null,
      fotoUrl: fotoUrl || null,
    },
  })

  return NextResponse.json({ ok: true, checkin })
}
