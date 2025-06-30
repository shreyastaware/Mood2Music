import { useState } from 'react';
import { Music, ExternalLink, Loader2, ArrowLeft } from 'lucide-react';
import axios from "axios";

interface Recommendation {
  title: string;
  artist: string;
  spotifyUrl: string;
  youtubeUrl: string;
}

interface MoodData {
  name: string;
  emoji: string;
  gradient: string;
  hoverGradient: string;
}

const moods: MoodData[] = [
  { name: 'Happy', emoji: '😄', gradient: 'bg-gradient-to-br from-yellow-400 to-orange-500', hoverGradient: 'hover:from-yellow-300 hover:to-orange-400' },
  { name: 'Sad', emoji: '😢', gradient: 'bg-gradient-to-br from-blue-400 to-blue-600', hoverGradient: 'hover:from-blue-300 hover:to-blue-500' },
  { name: 'Energetic', emoji: '💪', gradient: 'bg-gradient-to-br from-red-400 to-pink-500', hoverGradient: 'hover:from-red-300 hover:to-pink-400' },
  { name: 'Relaxed', emoji: '😌', gradient: 'bg-gradient-to-br from-green-400 to-emerald-500', hoverGradient: 'hover:from-green-300 hover:to-emerald-400' },
  { name: 'Focused', emoji: '🎯', gradient: 'bg-gradient-to-br from-purple-400 to-indigo-500', hoverGradient: 'hover:from-purple-300 hover:to-indigo-400' },
  { name: 'Calm', emoji: '🌈', gradient: 'bg-gradient-to-br from-teal-400 to-cyan-500', hoverGradient: 'hover:from-teal-300 hover:to-cyan-400' },
  { name: 'Angry', emoji: '😡', gradient: 'bg-gradient-to-br from-red-500 to-red-700', hoverGradient: 'hover:from-red-400 hover:to-red-600' },
  { name: 'Romantic', emoji: '🥰', gradient: 'bg-gradient-to-br from-pink-400 to-rose-500', hoverGradient: 'hover:from-pink-300 hover:to-rose-400' },
  { name: 'Cheerful', emoji: '😁', gradient: 'bg-gradient-to-br from-lime-400 to-green-500', hoverGradient: 'hover:from-lime-300 hover:to-green-400' },
  { name: 'Reflective', emoji: '🤔', gradient: 'bg-gradient-to-br from-amber-400 to-yellow-600', hoverGradient: 'hover:from-amber-300 hover:to-yellow-500' },
  { name: 'Gloomy', emoji: '😕', gradient: 'bg-gradient-to-br from-gray-500 to-slate-600', hoverGradient: 'hover:from-gray-400 hover:to-slate-500' },
  { name: 'Humorous', emoji: '🤣', gradient: 'bg-gradient-to-br from-orange-400 to-red-500', hoverGradient: 'hover:from-orange-300 hover:to-red-400' },
  { name: 'Melancholy', emoji: '😶', gradient: 'bg-gradient-to-br from-indigo-400 to-purple-600', hoverGradient: 'hover:from-indigo-300 hover:to-purple-500' },
  { name: 'Idyllic', emoji: '🤩', gradient: 'bg-gradient-to-br from-emerald-400 to-teal-500', hoverGradient: 'hover:from-emerald-300 hover:to-teal-400' },
  { name: 'Chill', emoji: '😎', gradient: 'bg-gradient-to-br from-sky-400 to-blue-500', hoverGradient: 'hover:from-sky-300 hover:to-blue-400' },
  { name: 'Weird', emoji: '🤨', gradient: 'bg-gradient-to-br from-violet-400 to-fuchsia-500', hoverGradient: 'hover:from-violet-300 hover:to-fuchsia-400' },
  { name: 'Horny', emoji: '🤤', gradient: 'bg-gradient-to-br from-rose-500 to-pink-600', hoverGradient: 'hover:from-rose-400 hover:to-pink-500' },
  { name: 'Sleepy', emoji: '🥱', gradient: 'bg-gradient-to-br from-slate-400 to-gray-500', hoverGradient: 'hover:from-slate-300 hover:to-gray-400' },
  { name: 'Fearful', emoji: '😨', gradient: 'bg-gradient-to-br from-zinc-500 to-stone-600', hoverGradient: 'hover:from-zinc-400 hover:to-stone-500' },
  { name: 'Lonely', emoji: '😢', gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600', hoverGradient: 'hover:from-blue-400 hover:to-indigo-500' },
  { name: 'Tense', emoji: '😬', gradient: 'bg-gradient-to-br from-red-600 to-orange-700', hoverGradient: 'hover:from-red-500 hover:to-orange-600' },
  { name: 'Thoughtful', emoji: '🤓', gradient: 'bg-gradient-to-br from-cyan-400 to-blue-500', hoverGradient: 'hover:from-cyan-300 hover:to-blue-400' },
  { name: 'Thrill-seeking', emoji: '🤪', gradient: 'bg-gradient-to-br from-yellow-500 to-orange-600', hoverGradient: 'hover:from-yellow-400 hover:to-orange-500' },
  { name: 'Playful', emoji: '🙃', gradient: 'bg-gradient-to-br from-pink-500 to-purple-600', hoverGradient: 'hover:from-pink-400 hover:to-purple-500' },
];


function App() {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMoodSelection, setShowMoodSelection] = useState(true);

  const fetchRecommendations = async (mood: string): Promise<void> => {
    setLoading(true);
    setSelectedMood(mood);
    try {
      const res = await axios.get<Recommendation[]>(
        `https://your-backend-api.com/recommend?mood=${mood}`
      );
      setRecommendations(res.data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    setSelectedMood('');
    setRecommendations([]);
    setShowMoodSelection(true);
    setLoading(false);
  };

  const selectedMoodData = moods.find(mood => mood.name === selectedMood);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="w-full py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-10 h-10 text-indigo-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Mood to Music
            </h1>
            <a id="bolt-button" href="https://bolt.new" target="_blank" title="Powered By Bolt"></a>
          </div>
          {showMoodSelection && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the perfect soundtrack for your current state of mind. Choose your mood and we'll recommend music that matches your vibe.
            </p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        {/* Mood Selection */}
        {showMoodSelection && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
              How are you feeling today?
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
              {moods.map((mood) => (
                <button
                  key={mood.name}
                  onClick={() => fetchRecommendations(mood.name)}
                  className={`
                    ${mood.gradient} ${mood.hoverGradient}
                    p-6 rounded-2xl shadow-lg transform transition-all duration-300 
                    hover:scale-105 hover:shadow-xl active:scale-95
                    text-white font-semibold text-base
                  `}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-sm">{mood.name}</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Back Button and Selected Mood Header */}
        {!showMoodSelection && selectedMoodData && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleBackClick}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Moods
              </button>
              
              <div className="flex items-center gap-3">
                <div className={`${selectedMoodData.gradient} p-3 rounded-xl text-white text-2xl`}>
                  {selectedMoodData.emoji}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {selectedMoodData.name} Mood
                </h2>
              </div>
            </div>
          </section>
        )}

        {/* Loading State */}
        {loading && (
          <section className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <span className="text-xl text-gray-600">Finding perfect tracks for your {selectedMood.toLowerCase()} mood...</span>
            </div>
          </section>
        )}

        {/* Music Recommendations */}
        {!loading && recommendations.length > 0 && (
          <section className="animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-semibold text-gray-800 mb-3">
                Perfect for your {selectedMood.toLowerCase()} mood
              </h3>
              <p className="text-gray-600">Here are some tracks that match your vibe</p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {recommendations.map((track, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-800 mb-1">
                        {track.title}
                      </h4>
                      <p className="text-gray-600 mb-4">by {track.artist}</p>
                    </div>
                    
                    <div className="flex gap-3">
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 font-medium"
                      >
                        <span>Spotify</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      
                      <a
                        href={track.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 font-medium"
                      >
                        <span>YouTube</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-gray-900 text-center">
        <p className="text-gray-400">
          © 2025 Mood to Music. Made with ❤️ for music lovers everywhere by <a href="https://www.x.com/SangramTaware06" target="_blank">Sangram</a> & <a href="https://twitter.com/indiehackingguy" target="_blank">Shreyas</a>.
        </p>
      </footer>
    </div>
  );
}

export default App;