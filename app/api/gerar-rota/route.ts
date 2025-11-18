// app/api/gerar-rota/route.ts
// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)

    const email = url.searchParams.get('email')
    const dataStr = url.searchParams.get('data') // formato: 2025-11-20 (opcional)

    if (!email) {
      return NextResponse.json(
        { error: 'Parâmetro "email" é obrigatório.' },
        { status: 400 },
      )
    }

    // 1. Buscar colaborador de Facilities ativo por e-mail
    const colaborador = await prisma.colaboradorFacility.findFirst({
      where: {
        email,
        ativo: true,
      },
    })

    if (!colaborador) {
      return NextResponse.json(
        {
          error:
            'Colaborador de Facilities não encontrado ou inativo para este e-mail.',
        },
        { status: 404 },
      )
    }

    // 2. Definir a data da rota (hoje, se não vier nada)
    let dataBase: Date

    if (dataStr) {
      dataBase = new Date(`${dataStr}T00:00:00`)
    } else {
      dataBase = new Date()
    }

    dataBase.setHours(0, 0, 0, 0)
    const diaSeguinte = new Date(dataBase)
    diaSeguinte.setDate(dataBase.getDate() + 1)

    // 3. Verificar se já existe rota pra essa data e colaborador
    const rotaExistente = await prisma.rotaDiaria.findFirst({
      where: {
        colabId: colaborador.id,
        data: {
          gte: dataBase,
          lt: diaSeguinte,
        },
      },
      include: {
        itens: {
          include: { ambiente: true },
          orderBy: { ordem: 'asc' },
        },
      },
    })

    if (rotaExistente) {
      return NextResponse.json({
        message: 'Já existia uma rota para este colaborador nesta data.',
        colaborador: {
          id: colaborador.id,
          nome: colaborador.nome,
          email: colaborador.email,
        },
        rota: {
          id: rotaExistente.id,
          data: rotaExistente.data.toISOString(),
          turno: rotaExistente.turno,
          obsGeral: rotaExistente.obsGeral,
          itens: rotaExistente.itens.map((item) => ({
            id: item.id,
            ordem: item.ordem,
            prioridade: item.prioridade,
            checklist: item.checklist,
            ambiente: {
              id: item.ambiente.id,
              nome: item.ambiente.nome,
              andar: item.ambiente.andar,
              bloco: item.ambiente.bloco,
              tipo: item.ambiente.tipo,
            },
          })),
        },
      })
    }

    // 4. Buscar ambientes ativos para montar a rota
    const ambientes = await prisma.ambiente.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' },
    })

    if (ambientes.length === 0) {
      return NextResponse.json(
        {
          error:
            'Não há ambientes ativos cadastrados. Cadastre ambientes em /admin/ambientes antes de criar uma rota.',
        },
        { status: 400 },
      )
    }

    // 5. Criar nova rota com itens em ordem alfabética dos ambientes
    const novaRota = await prisma.rotaDiaria.create({
      data: {
        colabId: colaborador.id,
        data: dataBase,
        turno: 'Padrão',
        obsGeral: null,
        itens: {
          create: ambientes.map((amb, index) => ({
            ambienteId: amb.id,
            ordem: index + 1,
            prioridade: 'NORMAL',
            checklist: '',
          })),
        },
      },
      include: {
        itens: {
          include: { ambiente: true },
          orderBy: { ordem: 'asc' },
        },
      },
    })

    return NextResponse.json({
      message: 'Rota criada com sucesso.',
      colaborador: {
        id: colaborador.id,
        nome: colaborador.nome,
        email: colaborador.email,
      },
      rota: {
        id: novaRota.id,
        data: novaRota.data.toISOString(),
        turno: novaRota.turno,
        obsGeral: novaRota.obsGeral,
        itens: novaRota.itens.map((item) => ({
          id: item.id,
          ordem: item.ordem,
          prioridade: item.prioridade,
          checklist: item.checklist,
          ambiente: {
            id: item.ambiente.id,
            nome: item.ambiente.nome,
            andar: item.ambiente.andar,
            bloco: item.ambiente.bloco,
            tipo: item.ambiente.tipo,
          },
        })),
      },
    })
  } catch (error) {
    console.error('Erro em GET /api/gerar-rota', error)
    return NextResponse.json(
      { error: 'Erro interno ao gerar rota.' },
      { status: 500 },
    )
  }
}
