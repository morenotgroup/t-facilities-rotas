// app/api/seed-facilities/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Lista oficial que você passou
    const colaboradores = [
      {
        nome: 'Giulia Costa',
        email: 'giulia@agenciataj.com',
        tipo: 'LIMPEZA',
        acessoFull: false,
      },
      {
        nome: 'Mateus dos Santos',
        email: 'mateus.santos@agenciataj.com',
        tipo: 'LIMPEZA',
        acessoFull: false,
      },
      {
        nome: 'Adriana França',
        email: 'adriana@agenciataj.com',
        tipo: 'COZINHA',
        acessoFull: false,
      },
      {
        nome: 'Bruno Farias',
        email: 'facilities@agenciataj.com',
        tipo: 'RECEPCAO',
        acessoFull: false,
      },
      {
        nome: 'Moreno',
        email: 'gc@agenciataj.com',
        tipo: 'GENTE_E_CULTURA',
        acessoFull: true,
      },
    ]

    const resultados = []

    for (const colab of colaboradores) {
      const result = await prisma.colaboradorFacility.upsert({
        where: { email: colab.email },
        update: {
          nome: colab.nome,
          ativo: true,
          tipo: colab.tipo,
          acessoFull: colab.acessoFull,
        },
        create: {
          nome: colab.nome,
          email: colab.email,
          ativo: true,
          tipo: colab.tipo,
          acessoFull: colab.acessoFull,
        },
      })

      resultados.push(result)
    }

    return NextResponse.json({
      ok: true,
      message: 'Colaboradores de Facilities cadastrados/atualizados com sucesso.',
      total: resultados.length,
      emails: resultados.map((r) => r.email),
    })
  } catch (err: any) {
    console.error('Seed Facilities ERROR', err)

    return NextResponse.json(
      {
        error: 'Erro interno ao executar seed de Facilities.',
        detail: String(err?.message ?? err),
      },
      { status: 500 },
    )
  }
}
