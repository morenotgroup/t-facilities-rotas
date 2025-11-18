// app/api/seed/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest) {
  try {
    const ambientesCount = await prisma.ambiente.count()
    const colabsCount = await prisma.colaboradorFacility.count()

    let colab
    if (colabsCount === 0) {
      colab = await prisma.colaboradorFacility.create({
        data: {
          nome: 'Moreno (Facilities)',
          email: 'gc@agenciataj.com',
          ativo: true,
          tipo: 'FACILITIES_GERAL',
        },
      })
    } else {
      colab = await prisma.colaboradorFacility.findFirst({
        where: { email: 'gc@agenciataj.com' },
      })
      if (!colab) {
        colab = await prisma.colaboradorFacility.create({
          data: {
            nome: 'Moreno (Facilities)',
            email: 'gc@agenciataj.com',
            ativo: true,
            tipo: 'FACILITIES_GERAL',
          },
        })
      }
    }

    let recepcao, salaGc, backyard

    if (ambientesCount === 0) {
      recepcao = await prisma.ambiente.create({
        data: {
          nome: 'Recepção',
          andar: 'Térreo',
          bloco: 'Sede',
          tipo: 'Recepção',
          slugQr: 'recepcao',
          frequenciaPadrao: 'Diária',
          ativo: true,
        },
      })
      salaGc = await prisma.ambiente.create({
        data: {
          nome: 'Sala GC',
          andar: '1º andar',
          bloco: 'Sede',
          tipo: 'Escritório',
          slugQr: 'sala-gc',
          frequenciaPadrao: 'Diária',
          ativo: true,
        },
      })
      backyard = await prisma.ambiente.create({
        data: {
          nome: 'Backyard 209',
          andar: 'Fundos',
          bloco: 'Sede',
          tipo: 'Área externa',
          slugQr: 'backyard-209',
          frequenciaPadrao: 'Diária',
          ativo: true,
        },
      })
    } else {
      const ambientes = await prisma.ambiente.findMany()
      recepcao = ambientes.find((a) => a.slugQr === 'recepcao') ?? ambientes[0]
      salaGc =
        ambientes.find((a) => a.slugQr === 'sala-gc') ?? ambientes[1] ?? ambientes[0]
      backyard =
        ambientes.find((a) => a.slugQr === 'backyard-209') ??
        ambientes[2] ??
        ambientes[0]
    }

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const amanha = new Date(hoje)
    amanha.setDate(hoje.getDate() + 1)

    let rota = await prisma.rotaDiaria.findFirst({
      where: {
        colabId: colab!.id,
        data: {
          gte: hoje,
          lt: amanha,
        },
      },
      include: { itens: true },
    })

    if (!rota) {
      rota = await prisma.rotaDiaria.create({
        data: {
          data: hoje,
          turno: 'Manhã',
          colabId: colab!.id,
          obsGeral: 'Rota de teste seed.',
          itens: {
            create: [
              {
                ordem: 1,
                prioridade: 'Alta',
                checklist: 'Recepção: piso, balcão, maçanetas, lixeira.',
                ambiente: { connect: { id: recepcao!.id } },
              },
              {
                ordem: 2,
                prioridade: 'Média',
                checklist: 'Sala GC: mesas, cadeiras, pó, lixeira.',
                ambiente: { connect: { id: salaGc!.id } },
              },
              {
                ordem: 3,
                prioridade: 'Alta',
                checklist: 'Backyard: piso, mesas, lixeiras externas.',
                ambiente: { connect: { id: backyard!.id } },
              },
            ],
          },
        },
        include: {
          itens: true,
        },
      })
    }

    return NextResponse.json({
      ok: true,
      message: 'Seed executado com sucesso.',
      colabEmail: colab!.email,
      rotaId: rota.id,
    })
  } catch (error) {
    console.error('Erro em /api/seed', error)
    return NextResponse.json(
      { error: 'Erro interno ao rodar seed.' },
      { status: 500 },
    )
  }
}
