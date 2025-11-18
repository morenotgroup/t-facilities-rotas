// app/api/ambientes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = {
  params: { id: string }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = params
    const body = await req.json()
    const {
      nome,
      andar,
      bloco,
      tipo,
      slugQr,
      frequenciaPadrao,
      ativo,
    } = body

    const ambiente = await prisma.ambiente.update({
      where: { id },
      data: {
        ...(nome !== undefined && { nome }),
        ...(andar !== undefined && { andar }),
        ...(bloco !== undefined && { bloco }),
        ...(tipo !== undefined && { tipo }),
        ...(slugQr !== undefined && { slugQr }),
        ...(frequenciaPadrao !== undefined && { frequenciaPadrao }),
        ...(ativo !== undefined && { ativo: Boolean(ativo) }),
      },
    })

    return NextResponse.json(ambiente)
  } catch (error) {
    console.error('Erro em PATCH /api/ambientes/[id]', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar ambiente.' },
      { status: 500 },
    )
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = params

    await prisma.ambiente.delete({
      where: { id },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Erro em DELETE /api/ambientes/[id]', error)
    return NextResponse.json(
      { error: 'Erro ao remover ambiente.' },
      { status: 500 },
    )
  }
}
