import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { MOCK_PRODUCTS } from '@/lib/mock-products'

const DB_PATH = path.join(process.cwd(), 'utils', 'supabase', 'mock-db.json')

function getDb() {
  if (!fs.existsSync(DB_PATH)) {
    const initialData = {
      products: MOCK_PRODUCTS,
      rfqs: [
        {
          id: 'rfq-1',
          customer_name: 'Amit Patel',
          customer_email: 'amit@patelpipes.com',
          customer_phone: '+91 98200 12345',
          company_name: 'Patel Piping Solutions',
          product_id: 'ms-pipe',
          product: { name: 'MS Pipe (Mild Steel)' },
          quantity: '500 meters',
          message: 'Need urgent quote for 500 meters of heavy-grade MS Pipe for a commercial site at Kalamboli.',
          status: 'pending',
          created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        },
        {
          id: 'rfq-2',
          customer_name: 'Rajesh Shah',
          customer_email: 'rshah@steelbuilders.in',
          customer_phone: '+91 93222 98765',
          company_name: 'Steel Builders India',
          product_id: 'gate-valve',
          product: { name: 'Gate Valve' },
          quantity: '24 units',
          message: 'Looking for Handwheel gate valves with PN16 pressure rating. Standard shipping to Navi Mumbai.',
          status: 'reviewed',
          created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        },
        {
          id: 'rfq-3',
          customer_name: 'Vikram Malhotra',
          customer_email: 'malhotra@petrochem.co.in',
          customer_phone: '+91 88799 44332',
          company_name: 'Malhotra Petrochemicals',
          product_id: null,
          product: null,
          quantity: null,
          message: 'General inquiry: Do you supply custom-dimension ANSI blind flanges in bulk?',
          status: 'quoted',
          created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
        }
      ]
    }
    // Ensure parent directories exist
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2))
    return initialData
  }
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
  } catch {
    return { products: MOCK_PRODUCTS, rfqs: [] }
  }
}

function writeDb(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export async function GET() {
  return NextResponse.json(getDb())
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = getDb()
    
    if (body.type === 'update_product') {
      db.products = db.products.map((p: any) => p.id === body.id ? { ...p, ...body.values } : p)
    } else if (body.type === 'delete_product') {
      db.products = db.products.filter((p: any) => p.id !== body.id)
    } else if (body.type === 'insert_product') {
      const newProduct = {
        id: body.values.id || body.values.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...body.values
      }
      // Check if product with this id already exists to prevent duplicate insertion
      const index = db.products.findIndex((p: any) => p.id === newProduct.id)
      if (index !== -1) {
        db.products[index] = { ...db.products[index], ...newProduct }
      } else {
        db.products.unshift(newProduct)
      }
    } else if (body.type === 'update_rfq') {
      db.rfqs = db.rfqs.map((r: any) => r.id === body.id ? { ...r, ...body.values } : r)
    } else if (body.type === 'insert_rfq') {
      const p = db.products.find((prod: any) => prod.id === body.values.product_id)
      const newRfq = {
        id: body.values.id || Math.random().toString(36).substring(7),
        created_at: new Date().toISOString(),
        product: p ? { name: p.name } : null,
        ...body.values
      }
      db.rfqs.unshift(newRfq)
    }

    writeDb(db)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating mock DB:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
