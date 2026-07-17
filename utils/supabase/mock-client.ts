import { MOCK_PRODUCTS } from '@/lib/mock-products'

const IS_SERVER = typeof window === 'undefined'

function getDbServer() {
  if (!IS_SERVER) return null
  const fs = require('fs')
  const path = require('path')
  const DB_PATH = path.join(process.cwd(), 'utils', 'supabase', 'mock-db.json')

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

function writeDbServer(data: any) {
  if (!IS_SERVER) return
  const fs = require('fs')
  const path = require('path')
  const DB_PATH = path.join(process.cwd(), 'utils', 'supabase', 'mock-db.json')
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export function createMockClient() {
  return {
    auth: {
      getUser: async () => {
        return { data: { user: { id: 'offline-admin-id', email: 'admin@rajdeepcorp.com' } }, error: null }
      },
      signInWithPassword: async (credentials: any) => {
        return { data: { user: { id: 'offline-admin-id', email: 'admin@rajdeepcorp.com' } }, error: null }
      },
      signUp: async (credentials: any) => {
        return { data: { user: { id: 'offline-admin-id', email: 'admin@rajdeepcorp.com' } }, error: null }
      },
      signOut: async () => {
        return { error: null }
      }
    },
    from(table: string) {
      return {
        select(columns?: string, { count, head }: { count?: string; head?: boolean } = {}) {
          const fetchPromise = async () => {
            let db: any
            if (IS_SERVER) {
              db = getDbServer()
            } else {
              // Browser: fetch from local API
              const res = await fetch('/api/mock-db')
              db = await res.json()
            }
            return db
          }

          let filterStatus: string | null = null
          let filterId: string | null = null
          let filterCategory: string | null = null
          let limitCount: number | null = null

          const chain = {
            eq(col: string, val: any) {
              if (col === 'status') filterStatus = val
              if (col === 'id') filterId = val
              if (col === 'category') filterCategory = val
              return chain
            },
            order(col: string, options?: any) {
              return chain
            },
            limit(n: number) {
              limitCount = n
              return chain
            },
            single: async () => {
              const db = await fetchPromise()
              let list = table === 'products' ? db.products : table === 'rfq_requests' ? db.rfqs : [{ id: 'offline-admin-id', is_super_admin: true }]
              if (filterStatus) list = list.filter((x: any) => x.status === filterStatus)
              if (filterId) list = list.filter((x: any) => x.id === filterId)
              if (filterCategory) {
                if (filterCategory === 'pipes') {
                  list = list.filter((x: any) => ['pipes', 'di-pipes', 'ci-pipes', 'ci-earthing-pipes', 'sgp-pipes'].includes(x.category))
                } else if (filterCategory === 'fittings') {
                  list = list.filter((x: any) => ['fittings', 'di-fittings', 'ci-fittings'].includes(x.category))
                } else if (filterCategory === 'other') {
                  list = list.filter((x: any) => ['other', 'ring', 'flanges', 'water-meter'].includes(x.category))
                } else {
                  list = list.filter((x: any) => x.category === filterCategory)
                }
              }
              return { data: list[0] || null, error: list.length === 0 ? { message: 'Row not found' } : null }
            },
            then: async (resolve: any) => {
              const db = await fetchPromise()
              let list = table === 'products' ? db.products : table === 'rfq_requests' ? db.rfqs : [{ id: 'offline-admin-id', is_super_admin: true }]
              if (filterStatus) list = list.filter((x: any) => x.status === filterStatus)
              if (filterId) list = list.filter((x: any) => x.id === filterId)
              if (filterCategory) {
                if (filterCategory === 'pipes') {
                  list = list.filter((x: any) => ['pipes', 'di-pipes', 'ci-pipes', 'ci-earthing-pipes', 'sgp-pipes'].includes(x.category))
                } else if (filterCategory === 'fittings') {
                  list = list.filter((x: any) => ['fittings', 'di-fittings', 'ci-fittings'].includes(x.category))
                } else if (filterCategory === 'other') {
                  list = list.filter((x: any) => ['other', 'ring', 'flanges', 'water-meter'].includes(x.category))
                } else {
                  list = list.filter((x: any) => x.category === filterCategory)
                }
              }
              if (limitCount !== null) list = list.slice(0, limitCount)
              
              if (head && count === 'exact') {
                resolve({ data: null, count: list.length, error: null })
              } else {
                resolve({ data: list, count: list.length, error: null })
              }
            }
          }
          return chain
        },
        update(values: any) {
          const chain = {
            eq(col: string, val: any) {
              const executeUpdate = async () => {
                if (IS_SERVER) {
                  const db = getDbServer()
                  if (table === 'products') {
                    db.products = db.products.map((p: any) => p.id === val || (col === 'id' && p.id === val) ? { ...p, ...values, updated_at: new Date().toISOString() } : p)
                  } else if (table === 'rfq_requests') {
                    db.rfqs = db.rfqs.map((r: any) => r.id === val || (col === 'id' && r.id === val) ? { ...r, ...values } : r)
                  }
                  writeDbServer(db)
                } else {
                  // Browser: POST to update route
                  await fetch('/api/mock-db', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      type: table === 'products' ? 'update_product' : 'update_rfq',
                      id: val,
                      values
                    })
                  })
                }
              }

              return {
                single: async () => {
                  await executeUpdate()
                  return { data: values, error: null }
                },
                then: async (resolve: any) => {
                  await executeUpdate()
                  resolve({ data: values, error: null })
                }
              }
            }
          }
          return chain
        },
        delete() {
          const chain = {
            eq(col: string, val: any) {
              const executeDelete = async () => {
                if (IS_SERVER) {
                  const db = getDbServer()
                  if (table === 'products') {
                    db.products = db.products.filter((p: any) => p.id !== val)
                  } else if (table === 'rfq_requests') {
                    db.rfqs = db.rfqs.filter((r: any) => r.id !== val)
                  }
                  writeDbServer(db)
                } else {
                  await fetch('/api/mock-db', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      type: table === 'products' ? 'delete_product' : 'delete_rfq',
                      id: val
                    })
                  })
                }
              }
              return {
                then: async (resolve: any) => {
                  await executeDelete()
                  resolve({ error: null })
                }
              }
            }
          }
          return chain
        },
        insert(values: any) {
          const executeInsert = async () => {
            if (IS_SERVER) {
              const db = getDbServer()
              const arr = Array.isArray(values) ? values : [values]
              arr.forEach(val => {
                const newRow = {
                  id: val.id || val.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  ...val
                }
                if (table === 'products') {
                  const index = db.products.findIndex((p: any) => p.id === newRow.id)
                  if (index !== -1) {
                    db.products[index] = { ...db.products[index], ...newRow }
                  } else {
                    db.products.unshift(newRow)
                  }
                } else if (table === 'rfq_requests') {
                  const p = db.products.find((prod: any) => prod.id === val.product_id)
                  newRow.product = p ? { name: p.name } : null
                  db.rfqs.unshift(newRow)
                }
              })
              writeDbServer(db)
            } else {
              const arr = Array.isArray(values) ? values : [values]
              for (const val of arr) {
                await fetch('/api/mock-db', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    type: table === 'products' ? 'insert_product' : 'insert_rfq',
                    values: val
                  })
                })
              }
            }
          }
          return {
            then: async (resolve: any) => {
              await executeInsert()
              resolve({ data: values, error: null })
            }
          }
        }
      }
    }
  }
}
