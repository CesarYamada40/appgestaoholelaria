export const config = {
  expo: {
    token: process.env.EXPO_TOKEN || 'cGyJc11ZIGNIaf9q1aRjZ3FjUqixWjBplqazTKXD'
  },
  github: {
    repository: 'https://github.com/CesarYamada40/appgestaoholelaria.git'
  },
  supabase: {
    url: process.env.SUPABASE_URL || 'https://bvbhjkmkgbhqqkwsjshv.supabase.co',
    token: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Ymhqa21rZ2JocXFrd3Nqc2h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMTc2MTksImV4cCI6MjA0OTY5MzYxOX0.mscGheHEh79jdjE8vPxxnXwDfy7EhCGSkAhkcTXWYjM',
    postgresUrl: process.env.DATABASE_URL || 'postgresql://postgres:271401$Cesargtd56@db.bvbhjkmkgbhqqkwsjshv.supabase.co:5432/postgres'
  },
  app: {
    name: 'Hotel Management System Lite',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  },
  theme: {
    dark: false,
    colors: {
      primary: '#007AFF',
      background: '#F2F2F2',
      card: '#FFFFFF',
      text: '#000000',
      border: '#C7C7CC',
      notification: '#FF3B30'
    }
  },
  logging: {
    retention: 7,
    maxEntries: 1000,
    levels: ['ERROR', 'WARN', 'INFO', 'DEBUG'] as const
  },
  database: {
    name: 'hotelmanagement.db',
    version: 1
  },
  cache: {
    ttl: 24 * 60 * 60 * 1000,
    maxSize: 50 * 1024 * 1024
  },
  api: {
    timeout: 30000,
    retryAttempts: 3
  }
};
