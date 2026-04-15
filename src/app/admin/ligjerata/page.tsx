"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ChevronRight, ArrowLeft, Video } from "lucide-react";

interface Playlist {
  id: string;
  title: string;
  youtubePlaylistId: string;
  thumbnail: string | null;
  description: string | null;
  _count: { lectures: number };
}

interface Lecture {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnail: string;
  description: string | null;
  order: number;
}

export default function LecturesAdminPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<(Playlist & { lectures: Lecture[] }) | null>(null);
  const [loading, setLoading] = useState(true);

  // Playlist form
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");
  const [addingPlaylist, setAddingPlaylist] = useState(false);

  // Video form
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [addingVideo, setAddingVideo] = useState(false);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  async function fetchPlaylists() {
    const res = await fetch("/api/playlists");
    const data = await res.json();
    setPlaylists(data);
    setLoading(false);
  }

  async function fetchPlaylistDetail(id: string) {
    const res = await fetch(`/api/playlists/${id}`);
    const data = await res.json();
    setSelectedPlaylist(data);
  }

  async function handleAddPlaylist(e: React.FormEvent) {
    e.preventDefault();
    if (!playlistTitle.trim() || !playlistUrl.trim()) return;
    setAddingPlaylist(true);

    const res = await fetch("/api/playlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: playlistTitle.trim(),
        youtubeUrl: playlistUrl.trim(),
        description: playlistDesc.trim() || undefined,
      }),
    });

    if (res.ok) {
      setPlaylistTitle("");
      setPlaylistUrl("");
      setPlaylistDesc("");
      fetchPlaylists();
    } else {
      const err = await res.json();
      alert(err.error || "Gabim");
    }
    setAddingPlaylist(false);
  }

  async function handleDeletePlaylist(id: string) {
    if (!confirm("A jeni i sigurt? Kjo do të fshijë edhe të gjitha videot e kësaj serie.")) return;
    await fetch(`/api/playlists/${id}`, { method: "DELETE" });
    setPlaylists((prev) => prev.filter((p) => p.id !== id));
    if (selectedPlaylist?.id === id) setSelectedPlaylist(null);
  }

  async function handleAddVideo(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPlaylist || !videoTitle.trim() || !videoUrl.trim()) return;
    setAddingVideo(true);

    const res = await fetch(`/api/playlists/${selectedPlaylist.id}/videos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: videoTitle.trim(),
        youtubeUrl: videoUrl.trim(),
        description: videoDesc.trim() || undefined,
      }),
    });

    if (res.ok) {
      setVideoTitle("");
      setVideoUrl("");
      setVideoDesc("");
      fetchPlaylistDetail(selectedPlaylist.id);
      fetchPlaylists();
    } else {
      const err = await res.json();
      alert(err.error || "Gabim");
    }
    setAddingVideo(false);
  }

  async function handleDeleteVideo(lectureId: string) {
    if (!confirm("A jeni i sigurt?")) return;
    await fetch(`/api/lectures/${lectureId}`, { method: "DELETE" });
    if (selectedPlaylist) {
      fetchPlaylistDetail(selectedPlaylist.id);
      fetchPlaylists();
    }
  }

  // Playlist detail view
  if (selectedPlaylist) {
    return (
      <div>
        <button
          onClick={() => setSelectedPlaylist(null)}
          className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          Kthehu te seritë
        </button>

        <h1 className="font-bold text-2xl mb-1">{selectedPlaylist.title}</h1>
        {selectedPlaylist.description && (
          <p className="text-sm text-secondary mb-6">{selectedPlaylist.description}</p>
        )}

        {/* Add Video Form */}
        <form onSubmit={handleAddVideo} className="bg-white rounded-lg border border-border p-5 mb-6 space-y-3">
          <h2 className="font-bold text-base">Shto video</h2>
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="Titulli i videos..."
            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary"
          />
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="YouTube URL (p.sh. https://www.youtube.com/watch?v=...)"
            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary"
          />
          <textarea
            value={videoDesc}
            onChange={(e) => setVideoDesc(e.target.value)}
            placeholder="Përshkrimi (opsional)..."
            rows={2}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary resize-none"
          />
          <button
            type="submit"
            disabled={addingVideo}
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <Plus size={16} />
            {addingVideo ? "Duke shtuar..." : "Shto videon"}
          </button>
        </form>

        {/* Videos List */}
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          {selectedPlaylist.lectures.length === 0 ? (
            <div className="p-8 text-center text-secondary">Nuk ka video ende në këtë seri.</div>
          ) : (
            <div className="divide-y divide-border">
              {selectedPlaylist.lectures.map((lecture, index) => (
                <div key={lecture.id} className="p-4 flex items-center gap-4">
                  <span className="text-xs text-secondary font-medium w-6 text-center shrink-0">
                    {index + 1}
                  </span>
                  <img
                    src={lecture.thumbnail}
                    alt={lecture.title}
                    className="w-24 h-14 object-cover rounded border border-border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{lecture.title}</h3>
                    <p className="text-xs text-secondary truncate mt-1">{lecture.youtubeUrl}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteVideo(lecture.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-secondary hover:text-red-600 transition-colors shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Playlists list view
  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">Seritë e Ligjeratave</h1>

      {/* Add Playlist Form */}
      <form onSubmit={handleAddPlaylist} className="bg-white rounded-lg border border-border p-5 mb-6 space-y-3">
        <h2 className="font-bold text-base">Shto seri të re</h2>
        <input
          type="text"
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
          placeholder="Emri i serisë..."
          className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary"
        />
        <input
          type="url"
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
          placeholder="YouTube Playlist URL (p.sh. https://www.youtube.com/playlist?list=PL...)"
          className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary"
        />
        <textarea
          value={playlistDesc}
          onChange={(e) => setPlaylistDesc(e.target.value)}
          placeholder="Përshkrimi (opsional)..."
          rows={2}
          className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary resize-none"
        />
        <button
          type="submit"
          disabled={addingPlaylist}
          className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Plus size={16} />
          {addingPlaylist ? "Duke shtuar..." : "Shto serinë"}
        </button>
      </form>

      {/* Playlists List */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-secondary">Duke ngarkuar...</div>
        ) : playlists.length === 0 ? (
          <div className="p-8 text-center text-secondary">Nuk ka seri ende.</div>
        ) : (
          <div className="divide-y divide-border">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="p-4 flex items-center gap-4">
                <div className="w-24 h-14 rounded border border-border bg-layout-bg shrink-0 flex items-center justify-center overflow-hidden">
                  {playlist.thumbnail ? (
                    <img src={playlist.thumbnail} alt={playlist.title} className="w-full h-full object-cover" />
                  ) : (
                    <Video size={20} className="text-secondary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{playlist.title}</h3>
                  <p className="text-xs text-secondary mt-1">
                    {playlist._count.lectures} video
                  </p>
                </div>
                <button
                  onClick={() => fetchPlaylistDetail(playlist.id)}
                  className="p-2 rounded-lg hover:bg-layout-bg text-secondary hover:text-primary transition-colors shrink-0"
                  title="Menaxho videot"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={() => handleDeletePlaylist(playlist.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-secondary hover:text-red-600 transition-colors shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
