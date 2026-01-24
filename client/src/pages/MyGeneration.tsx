import type { IThumbnail } from "../assets/assets"
import SoftBackdrop from "../components/SoftBackdrop"
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRightIcon, DownloadIcon, TrashIcon } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import api from "../configs/api"
import { toast } from "react-hot-toast"

const MyGeneration = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const aspectRatioClassMap: Record<string, string> = {
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]"
  };
   
  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([])
  const [loading, setLoading] = useState(false)

  const fetchThumbnails = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/api/user/thumbnails')
      setThumbnails(data.thumbnails as IThumbnail[])
    } catch (error) {
      console.error('Error fetching thumbnails:', error)
      toast.error('Failed to load thumbnails')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (image_url: string) => {
    const link = document.createElement('a')
    link.href = image_url.replace('/upload', '/upload/fl_attachment/')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this thumbnail?')
      if (!confirm) return

      const { data } = await api.delete(`/api/thumbnail/${id}`)
      toast.success(data.message)

      setThumbnails(prev => prev.filter(thumbnail => thumbnail._id !== id))
    } catch (error) {
      console.error('Error deleting thumbnail:', error)
      toast.error('Failed to delete thumbnail') 
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      fetchThumbnails()
    }
  }, [isLoggedIn, navigate])

  return (
    <>
      <SoftBackdrop />
      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-200">My Generations</h1>
          <p className="text-sm text-zinc-400 mt-1">View and manage all your AI-generated thumbnails</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]" />
            ))} 
          </div>
        )}

        {/* Empty State */}
        {!loading && thumbnails.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-xl text-zinc-300 mb-2">No thumbnails yet</h3>
            <p className="text-zinc-500 mb-6">Generate your first thumbnail to see it here</p>
            <Link 
              to="/generate" 
              className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full transition"
            >
              Generate Thumbnail
            </Link>
          </div>
        )}

        {/* Thumbnails Grid */}
        {!loading && thumbnails.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {thumbnails.map((thumbnail) => (
              <div 
                key={thumbnail._id} 
                className="group relative rounded-2xl bg-white/6 border border-white/10 overflow-hidden hover:border-white/20 transition"
              >
                {/* Thumbnail Image */}
                <div className={`w-full ${aspectRatioClassMap[thumbnail.aspect_ratio || "16:9"]} bg-zinc-800`}>
                  {thumbnail.image_url ? (
                    <img 
                      src={thumbnail.image_url} 
                      alt={thumbnail.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500">
                      Generating...
                    </div>
                  )}
                </div>

                {/* Thumbnail Info */}
                <div className="p-4">
                  <h3 className="text-white font-medium truncate">{thumbnail.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {thumbnail.style} • {thumbnail.aspect_ratio}
                  </p>
                </div>

                {/* Action Buttons - Show on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  {thumbnail.image_url && (
                    <>
                      <button
                        onClick={() => handleDownload(thumbnail.image_url!)}
                        className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition"
                        title="Download"
                      >
                        <DownloadIcon size={20} />
                      </button>
                      <a
                        href={thumbnail.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition"
                        title="Open in new tab"
                      >
                        <ArrowUpRightIcon size={20} />
                      </a>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(thumbnail._id)}
                    className="p-3 bg-red-600/80 hover:bg-red-600 rounded-full transition"
                    title="Delete"
                  >
                    <TrashIcon size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default MyGeneration
