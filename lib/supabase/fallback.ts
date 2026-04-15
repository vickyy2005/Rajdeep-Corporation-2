const SUPABASE_CONFIG_ERROR = new Error(
  "Your project's URL and Key are required to create a Supabase client!",
)

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return { url, key }
}

type QueryResult = {
  data: unknown
  error: Error | null
  count?: number
}

function createFallbackQueryBuilder(tableName: string) {
  let operation: 'select' | 'insert' | 'update' | 'delete' | null = null

  const builder: any = {
    select() {
      operation = 'select'
      return builder
    },
    eq() {
      return builder
    },
    ilike() {
      return builder
    },
    order() {
      return builder
    },
    limit() {
      return builder
    },
    single() {
      return builder
    },
    insert() {
      operation = 'insert'
      return builder
    },
    update() {
      operation = 'update'
      return builder
    },
    delete() {
      operation = 'delete'
      return builder
    },
    then(resolve: (value: QueryResult) => unknown, reject?: (reason: unknown) => unknown) {
      const result: QueryResult =
        operation === 'select' || operation === null
          ? { data: [], error: null, count: 0 }
          : {
              data: null,
              error: new Error(
                `${SUPABASE_CONFIG_ERROR.message} Unable to ${operation} rows in ${tableName} without configuration.`,
              ),
            }

      return Promise.resolve(result).then(resolve, reject)
    },
  }

  return builder
}

export function createMissingSupabaseClient() {
  return {
    from(tableName: string) {
      return createFallbackQueryBuilder(tableName)
    },
    auth: {
      async getUser() {
        return { data: { user: null }, error: null }
      },
      async signInWithPassword() {
        return { data: { user: null, session: null }, error: SUPABASE_CONFIG_ERROR }
      },
      async signOut() {
        return { error: null }
      },
    },
  }
}

export function isSupabaseConfigured() {
  const { url, key } = getSupabaseConfig()
  return Boolean(url && key)
}
