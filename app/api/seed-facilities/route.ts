// app/api/seed-facilities/route.ts
// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const colaboradores = [
      {
        nome: 'Giulia Costa',
        email: 'giulia@agenciataj.com',
        perfil: 'LIMPEZA',
        fullAccess: false,
      },
      {
        nome: 'Mateus dos Santos',
        email: 'mateus.santos@agenciataj.com',
        perfil: 'LIMPEZA',
        fullAccess: false,
      },
      {
        nome: 'Adriana França',
        email: 'adriana@agenciataj.com',
        perfil: 'COZINHA',
        fullAccess: false,
      },
      {
        nome: 'Bruno Farias',
        email: 'facilities@agenciataj.com',
        perfil: 'RECEPCAO',
        fullAccess: false,
      },
      {
        nome: 'Moreno',
        email: 'gc@agenciataj.com',
        perfil: 'GC',
        fullAccess: true,
      },
    ]

    const resultados = []

    for (const c of colaboradores) {
      const upserted = await prisma.colaboradorFacility.upsert({
        where: { email: c.email },
        update: {
          nome: c.nome,
          perfil: c.perfil,
          fullAccess: c.fullAccess,
          ativo: true,
        },
        create: {
          nome: c.nome,
          email: c.email,
          perfil: c.perfil,
          fullAccess: c.fullAccess,
          ativo: true,
        },
      })

      resultados.push({
        id: upserted.id,
        nome: upserted.nome,
        email: upserted.email,
        perfil: upserted.perfil,
        fullAccess: upserted.fullAccess,
      })
    }

    return NextResponse.json({
      message: 'Seed de colaboradores de Facilities executado com sucesso.',
      colaboradores: resultados,
    })
  } catch (error) {
    console.error('Erro em GET /api/seed-facilities', error)
    return NextResponse.json(
      { error: 'Erro interno ao executar seed de Facilities.' },
      { status: 500 },
    )
  }
}
