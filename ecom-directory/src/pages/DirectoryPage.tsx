import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { categories, type Listing } from '@/data/categories'
import { fetchListingsFromSheets } from '@/lib/sheets'
import {
  Search, ExternalLink, Star, LogOut, Database, X, SlidersHorizontal, ChevronDown
} from 'lucide-react'

export default function DirectoryPage() {
  const { user, signOut, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) navigate('/')
  }, [user, authLoading, navigate])

  useEffect(() => {
    fetchListingsFromSheets().then(data => {
      setListings(data)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    let result = listings

    if (activeCategory) {
      result = result.filter(l => l.category === activeCategory)
    }
    if (activeSubcategory) {
      result = result.filter(l => l.subcategory === activeSubcategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.tags.some(t => t.toLowerCase().includes(q)) ||
        l.subcategory.toLowerCase().includes(q)
      )
    }

    // Featured first, then alphabetical
    return result.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.name.localeCompare(b.name)
    })
  }, [listings, activeCategory, activeSubcategory, search])

  const activeCategoryData = categories.find(c => c.id === activeCategory)

  const handleCategoryClick = (catId: string) => {
    if (activeCategory === catId) {
      setActiveCategory(null)
      setActiveSubcategory(null)
    } else {
      setActiveCategory(catId)
      setActiveSubcategory(null)
    }
    setShowMobileFilters(false)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-400">
          <span className="w-5 h-5 border-2 border-zinc-600 border-t-amber-500 rounded-full animate-spin" />
          Loading directory...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Nav */}
      <nav className="border-b border-zinc-800/60 backdrop-blur-sm sticky top-0 z-50 bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-amber-500 rounded-md flex items-center justify-center">
              <Database className="w-4 h-4 text-zinc-950" />
            </div>
            <span className="font-semibold text-lg tracking-tight hidden sm:block">eCom Stack</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search tools, platforms, services..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-zinc-900 border-zinc-800 pl-10 h-10 placeholder:text-zinc-600 focus-visible:ring-amber-500/40"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-zinc-500 hidden md:block">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 mb-4 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Categories
          <ChevronDown className={`w-4 h-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
            <div className="sticky top-24 space-y-1">
              <button
                onClick={() => { setActiveCategory(null); setActiveSubcategory(null); setShowMobileFilters(false) }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  !activeCategory ? 'bg-amber-500/10 text-amber-400 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                All Categories
                <span className="ml-auto text-xs text-zinc-600 float-right mt-0.5">{listings.length}</span>
              </button>

              {categories.map(cat => {
                const count = listings.filter(l => l.category === cat.id).length
                const isActive = activeCategory === cat.id
                return (
                  <div key={cat.id}>
                    <button
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2.5 ${
                        isActive ? 'bg-amber-500/10 text-amber-400 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="flex-1">{cat.name}</span>
                      <span className="text-xs text-zinc-600">{count}</span>
                    </button>

                    {isActive && (
                      <div className="ml-10 mt-1 space-y-0.5 mb-2">
                        {cat.subcategories.map(sub => {
                          const subCount = listings.filter(l => l.category === cat.id && l.subcategory === sub).length
                          return (
                            <button
                              key={sub}
                              onClick={() => {
                                setActiveSubcategory(activeSubcategory === sub ? null : sub)
                                setShowMobileFilters(false)
                              }}
                              className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors ${
                                activeSubcategory === sub
                                  ? 'text-amber-400 font-medium'
                                  : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {sub}
                              <span className="ml-auto text-zinc-700 float-right">{subCount}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Active filters */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">
                {activeSubcategory || activeCategoryData?.name || 'All Tools'}
              </h1>
              <span className="text-sm text-zinc-500">
                {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}
              </span>
              {(activeCategory || search) && (
                <button
                  onClick={() => { setActiveCategory(null); setActiveSubcategory(null); setSearch('') }}
                  className="text-xs text-zinc-500 hover:text-zinc-300 underline ml-auto"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Featured Banner (only on "All") */}
            {!activeCategory && !search && (
              <div className="mb-8">
                <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  Featured
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {listings.filter(l => l.featured).map(listing => (
                    <ListingCard key={listing.name} listing={listing} featured />
                  ))}
                </div>
              </div>
            )}

            {/* All listings */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-zinc-500">
                <Search className="w-10 h-10 mx-auto mb-4 text-zinc-700" />
                <p className="text-lg mb-2">No results found</p>
                <p className="text-sm">Try a different search term or browse by category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filtered.filter(l => activeCategory || search || !l.featured).map(listing => (
                  <ListingCard key={listing.name + listing.category} listing={listing} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function ListingCard({ listing, featured }: { listing: Listing; featured?: boolean }) {
  return (
    <a
      href={listing.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-lg border p-5 transition-all hover:border-zinc-600 ${
        featured
          ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40'
          : 'bg-zinc-900 border-zinc-800'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          <h3 className="font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
            {listing.name}
          </h3>
          {featured && (
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
          )}
        </div>
        <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0 mt-0.5" />
      </div>

      <p className="text-sm text-zinc-400 leading-relaxed mb-3 line-clamp-2">
        {listing.description}
      </p>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-xs bg-zinc-800 text-zinc-400 hover:bg-zinc-800 border-0">
            {listing.subcategory}
          </Badge>
        </div>
        <span className="text-xs text-zinc-600 shrink-0">{listing.pricing}</span>
      </div>
    </a>
  )
}
