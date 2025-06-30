import React, { useState } from 'react';
import { Music, ExternalLink, Loader2, ArrowLeft } from 'lucide-react';

interface MusicRecommendation {
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

// Mock music recommendations for each mood
const mockRecommendations: Record<string, MusicRecommendation[]> = {
  Happy: [
    { title: 'Happy', artist: 'Pharrell Williams', spotifyUrl: 'https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH', youtubeUrl: 'https://youtube.com/watch?v=ZbZSe6N_BXs' },
    { title: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', spotifyUrl: 'https://open.spotify.com/track/6KuQTIu1KoTTkLXKrwlLPV', youtubeUrl: 'https://youtube.com/watch?v=ru0K8uYEZWw' },
    { title: 'Walking on Sunshine', artist: 'Katrina and the Waves', spotifyUrl: 'https://open.spotify.com/track/05wIrZSwuaVWhcv5FfqeH0', youtubeUrl: 'https://youtube.com/watch?v=iPUmE-tne5U' },
  ],
  Sad: [
    { title: 'Someone Like You', artist: 'Adele', spotifyUrl: 'https://open.spotify.com/track/1zwMYTA5nlNjZxYrvBB2pV', youtubeUrl: 'https://youtube.com/watch?v=hLQl3WQQoQ0' },
    { title: 'Hurt', artist: 'Johnny Cash', spotifyUrl: 'https://open.spotify.com/track/4Nd5HJn4EExnLmHtClk4QV', youtubeUrl: 'https://youtube.com/watch?v=8AHCfZTRGiI' },
    { title: 'Mad World', artist: 'Gary Jules', spotifyUrl: 'https://open.spotify.com/track/3JOVTQ5h8HGFnDdp4VT3MP', youtubeUrl: 'https://youtube.com/watch?v=4N3N1MlvVc4' },
  ],
  Energetic: [
    { title: 'Eye of the Tiger', artist: 'Survivor', spotifyUrl: 'https://open.spotify.com/track/2KH16WveTQWT6KOm2ITvB0', youtubeUrl: 'https://youtube.com/watch?v=btPJPFnesV4' },
    { title: 'Thunder', artist: 'Imagine Dragons', spotifyUrl: 'https://open.spotify.com/track/1zB4vmk8tFRmM9UULNzbLB', youtubeUrl: 'https://youtube.com/watch?v=fKopy74weus' },
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', spotifyUrl: 'https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS', youtubeUrl: 'https://youtube.com/watch?v=OPf0YbXqDm0' },
  ],
  Relaxed: [
    { title: 'Weightless', artist: 'Marconi Union', spotifyUrl: 'https://open.spotify.com/track/6p0q6tIdxayaEfEhXBP4ng', youtubeUrl: 'https://youtube.com/watch?v=UfcAVejslrU' },
    { title: 'River', artist: 'Leon Bridges', spotifyUrl: 'https://open.spotify.com/track/6YDaWVN3fSfDjKgoBzJmFG', youtubeUrl: 'https://youtube.com/watch?v=0Hegd4xNfRo' },
    { title: 'Clair de Lune', artist: 'Claude Debussy', spotifyUrl: 'https://open.spotify.com/track/7H2Yq3VYuInKcp6zQmkqP4', youtubeUrl: 'https://youtube.com/watch?v=CvFH_6DNRCY' },
  ],
  Focused: [
    { title: 'Lose Yourself', artist: 'Eminem', spotifyUrl: 'https://open.spotify.com/track/7w9bgPAmPTtrkt2v16QeA8', youtubeUrl: 'https://youtube.com/watch?v=_Yhyp-_hX2s' },
    { title: 'Time', artist: 'Hans Zimmer', spotifyUrl: 'https://open.spotify.com/track/1WI5ez7T8TpJUdDAWdONEy', youtubeUrl: 'https://youtube.com/watch?v=RxabLA7UQ9k' },
    { title: 'Focus', artist: 'Hocus Pocus', spotifyUrl: 'https://open.spotify.com/track/5Qnp7R9ZAIdHWROZJY0C4O', youtubeUrl: 'https://youtube.com/watch?v=L_XJ_s5IsQc' },
  ],
  Romantic: [
    { title: 'Perfect', artist: 'Ed Sheeran', spotifyUrl: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v', youtubeUrl: 'https://youtube.com/watch?v=2Vv-BfVoq4g' },
    { title: 'All of Me', artist: 'John Legend', spotifyUrl: 'https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a', youtubeUrl: 'https://youtube.com/watch?v=450p7goxZqg' },
    { title: 'Make You Feel My Love', artist: 'Adele', spotifyUrl: 'https://open.spotify.com/track/4vQBWLuO2vhsMKFRhfKMfF', youtubeUrl: 'https://youtube.com/watch?v=0put0_a--Ng' },
  ],
  Angry: [
    { title: 'Break Stuff', artist: 'Limp Bizkit', spotifyUrl: 'https://open.spotify.com/track/5xyQj3bEkqFLicQ9KmF5kT', youtubeUrl: 'https://youtube.com/watch?v=ZpUYjpKg9KY' },
    { title: 'Killing in the Name', artist: 'Rage Against the Machine', spotifyUrl: 'https://open.spotify.com/track/59WN2psjkt1tyaxjspN8fp', youtubeUrl: 'https://youtube.com/watch?v=bWXazVhlyxQ' },
    { title: 'Bodies', artist: 'Drowning Pool', spotifyUrl: 'https://open.spotify.com/track/1kUaCSspWtKxpCGDDeCNpT', youtubeUrl: 'https://youtube.com/watch?v=04F4xlWSFh0' },
  ],
  Calm: [
    { title: 'Aqueous Transmission', artist: 'Incubus', spotifyUrl: 'https://open.spotify.com/track/0e43aqLPYAn6CKYzT8OIhN', youtubeUrl: 'https://youtube.com/watch?v=3k0-sGqxIiQ' },
    { title: 'Breathe', artist: 'Pink Floyd', spotifyUrl: 'https://open.spotify.com/track/2ctvdKmETyOzPb2GiJJT53', youtubeUrl: 'https://youtube.com/watch?v=mrojrDCI02k' },
    { title: 'Ocean', artist: 'John Butler', spotifyUrl: 'https://open.spotify.com/track/4R2kfaDFhslZEMSK3Y3INp', youtubeUrl: 'https://youtube.com/watch?v=jdYJf_ybyVo' },
  ],
  Cheerful: [
    { title: 'Good as Hell', artist: 'Lizzo', spotifyUrl: 'https://open.spotify.com/track/1PckUlxKqWQs3RlWXVBLw3', youtubeUrl: 'https://youtube.com/watch?v=SmbmeOgWsqE' },
    { title: 'Sunshine', artist: 'Matisyahu', spotifyUrl: 'https://open.spotify.com/track/4vkqYG8MKR0EdQyOIY1KdB', youtubeUrl: 'https://youtube.com/watch?v=WRmBChQjZPs' },
    { title: 'Three Little Birds', artist: 'Bob Marley', spotifyUrl: 'https://open.spotify.com/track/6JV2JOEocMgcZxYSZelKcc', youtubeUrl: 'https://youtube.com/watch?v=zaGUr6wzyT8' },
  ],
  Reflective: [
    { title: 'The Sound of Silence', artist: 'Simon & Garfunkel', spotifyUrl: 'https://open.spotify.com/track/5xYZmp9VoqWzchCbYCTjzE', youtubeUrl: 'https://youtube.com/watch?v=4fWyzwo1xg0' },
    { title: 'Mad World', artist: 'Tears for Fears', spotifyUrl: 'https://open.spotify.com/track/1WI5ez7T8TpJUdDAWdONEy', youtubeUrl: 'https://youtube.com/watch?v=u1ZvPSpLxCg' },
    { title: 'Everybody Hurts', artist: 'R.E.M.', spotifyUrl: 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3', youtubeUrl: 'https://youtube.com/watch?v=5rOiW_xY-kc' },
  ],
  Gloomy: [
    { title: 'Black', artist: 'Pearl Jam', spotifyUrl: 'https://open.spotify.com/track/2Foc5Q5nqNiosCNqttzHof', youtubeUrl: 'https://youtube.com/watch?v=5ChbxMVgGV4' },
    { title: 'Creep', artist: 'Radiohead', spotifyUrl: 'https://open.spotify.com/track/70LcF31zb1H0PyJoS1Sx1r', youtubeUrl: 'https://youtube.com/watch?v=XFkzRNyygfk' },
    { title: 'Hurt', artist: 'Nine Inch Nails', spotifyUrl: 'https://open.spotify.com/track/5MbdtvEgEAMChrOmFOI7Yh', youtubeUrl: 'https://youtube.com/watch?v=kPz21cDK7dg' },
  ],
  Humorous: [
    { title: 'Weird Al Yankovic', artist: 'White & Nerdy', spotifyUrl: 'https://open.spotify.com/track/2Z8WuEywRWYTKe1NybPQEW', youtubeUrl: 'https://youtube.com/watch?v=N9qYF9DZPdw' },
    { title: 'The Lonely Island', artist: 'I\'m On A Boat', spotifyUrl: 'https://open.spotify.com/track/0UjsXo9l6I8Ez1AgHPjEUU', youtubeUrl: 'https://youtube.com/watch?v=avaSdC0QOUM' },
    { title: 'Flight of the Conchords', artist: 'Business Time', spotifyUrl: 'https://open.spotify.com/track/1WI5ez7T8TpJUdDAWdONEy', youtubeUrl: 'https://youtube.com/watch?v=AqZcYPEszN8' },
  ],
  Melancholy: [
    { title: 'Skinny Love', artist: 'Bon Iver', spotifyUrl: 'https://open.spotify.com/track/01XJjy7W0hBNplrrcx2wJU', youtubeUrl: 'https://youtube.com/watch?v=ssdgFoHLwnk' },
    { title: 'The Night We Met', artist: 'Lord Huron', spotifyUrl: 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3', youtubeUrl: 'https://youtube.com/watch?v=KUtdNSqWKJY' },
    { title: 'Holocene', artist: 'Bon Iver', spotifyUrl: 'https://open.spotify.com/track/5MbdtvEgEAMChrOmFOI7Yh', youtubeUrl: 'https://youtube.com/watch?v=TWcyIpul8OE' },
  ],
  Idyllic: [
    { title: 'Here Comes the Sun', artist: 'The Beatles', spotifyUrl: 'https://open.spotify.com/track/6dGnYIeXmHdcikdzNNDMm2', youtubeUrl: 'https://youtube.com/watch?v=KQetemT1sWc' },
    { title: 'What a Wonderful World', artist: 'Louis Armstrong', spotifyUrl: 'https://open.spotify.com/track/2Z8WuEywRWYTKe1NybPQEW', youtubeUrl: 'https://youtube.com/watch?v=VqhCQZaH4Vs' },
    { title: 'Somewhere Over the Rainbow', artist: 'Israel Kamakawiwoʻole', spotifyUrl: 'https://open.spotify.com/track/0UjsXo9l6I8Ez1AgHPjEUU', youtubeUrl: 'https://youtube.com/watch?v=V1bFr2SWP1I' },
  ],
  Chill: [
    { title: 'Lofi Hip Hop Radio', artist: 'ChilledCow', spotifyUrl: 'https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM', youtubeUrl: 'https://youtube.com/watch?v=5qap5aO4i9A' },
    { title: 'Sunset Lover', artist: 'Petit Biscuit', spotifyUrl: 'https://open.spotify.com/track/01XJjy7W0hBNplrrcx2wJU', youtubeUrl: 'https://youtube.com/watch?v=wuCK-oiE3rM' },
    { title: 'Breathe Me', artist: 'Sia', spotifyUrl: 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3', youtubeUrl: 'https://youtube.com/watch?v=ghPcYqn0p4Y' },
  ],
  Weird: [
    { title: 'Bohemian Rhapsody', artist: 'Queen', spotifyUrl: 'https://open.spotify.com/track/4u7EnebtmKWzUH433cf5Qv', youtubeUrl: 'https://youtube.com/watch?v=fJ9rUzIMcZQ' },
    { title: 'Paranoid Android', artist: 'Radiohead', spotifyUrl: 'https://open.spotify.com/track/6LgJvl0Xdtc73RJ1MBKJHE', youtubeUrl: 'https://youtube.com/watch?v=fHiGbolFFGw' },
    { title: 'Windowlicker', artist: 'Aphex Twin', spotifyUrl: 'https://open.spotify.com/track/2Z8WuEywRWYTKe1NybPQEW', youtubeUrl: 'https://youtube.com/watch?v=UBS4Gi1y_nc' },
  ],
  Horny: [
    { title: 'Pony', artist: 'Ginuwine', spotifyUrl: 'https://open.spotify.com/track/1WI5ez7T8TpJUdDAWdONEy', youtubeUrl: 'https://youtube.com/watch?v=lbnoG2dsUk0' },
    { title: 'Motivation', artist: 'Normani', spotifyUrl: 'https://open.spotify.com/track/0UjsXo9l6I8Ez1AgHPjEUU', youtubeUrl: 'https://youtube.com/watch?v=HL3t6FBxYbo' },
    { title: 'Earned It', artist: 'The Weeknd', spotifyUrl: 'https://open.spotify.com/track/73SpzrcaHk0RQPFP73vqVR', youtubeUrl: 'https://youtube.com/watch?v=xe_iCkFsQKE' },
  ],
  Sleepy: [
    { title: 'Weightless', artist: 'Marconi Union', spotifyUrl: 'https://open.spotify.com/track/6p0q6tIdxayaEfEhXBP4ng', youtubeUrl: 'https://youtube.com/watch?v=UfcAVejslrU' },
    { title: 'Sleep Baby Sleep', artist: 'Broods', spotifyUrl: 'https://open.spotify.com/track/01XJjy7W0hBNplrrcx2wJU', youtubeUrl: 'https://youtube.com/watch?v=ygGw_zo_W_Y' },
    { title: 'Sleepyhead', artist: 'Passion Pit', spotifyUrl: 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3', youtubeUrl: 'https://youtube.com/watch?v=T0RvPYRRRbE' },
  ],
  Fearful: [
    { title: 'Thriller', artist: 'Michael Jackson', spotifyUrl: 'https://open.spotify.com/track/2LlQb7Uoj1kKyGhlkBf9aC', youtubeUrl: 'https://youtube.com/watch?v=sOnqjkJTMaA' },
    { title: 'Somebody\'s Watching Me', artist: 'Rockwell', spotifyUrl: 'https://open.spotify.com/track/2Z8WuEywRWYTKe1NybPQEW', youtubeUrl: 'https://youtube.com/watch?v=7YvAYIJSSZY' },
    { title: 'Monster', artist: 'Kanye West', spotifyUrl: 'https://open.spotify.com/track/0UjsXo9l6I8Ez1AgHPjEUU', youtubeUrl: 'https://youtube.com/watch?v=Ona42jz8w0k' },
  ],
  Lonely: [
    { title: 'Alone', artist: 'Heart', spotifyUrl: 'https://open.spotify.com/track/1WI5ez7T8TpJUdDAWdONEy', youtubeUrl: 'https://youtube.com/watch?v=1Cw1ng75KP0' },
    { title: 'The Sound of Silence', artist: 'Disturbed', spotifyUrl: 'https://open.spotify.com/track/0UjsXo9l6I8Ez1AgHPjEUU', youtubeUrl: 'https://youtube.com/watch?v=u9Dg-g7t2l4' },
    { title: 'Mad World', artist: 'Gary Jules', spotifyUrl: 'https://open.spotify.com/track/3JOVTQ5h8HGFnDdp4VT3MP', youtubeUrl: 'https://youtube.com/watch?v=4N3N1MlvVc4' },
  ],
  Tense: [
    { title: 'In the End', artist: 'Linkin Park', spotifyUrl: 'https://open.spotify.com/track/60a0Rd6pjrkxjPbaKzXjfq', youtubeUrl: 'https://youtube.com/watch?v=eVTXPUF4Oz4' },
    { title: 'Stressed Out', artist: 'Twenty One Pilots', spotifyUrl: 'https://open.spotify.com/track/2Z8WuEywRWYTKe1NybPQEW', youtubeUrl: 'https://youtube.com/watch?v=pXRviuL6vMY' },
    { title: 'Under Pressure', artist: 'Queen & David Bowie', spotifyUrl: 'https://open.spotify.com/track/0UjsXo9l6I8Ez1AgHPjEUU', youtubeUrl: 'https://youtube.com/watch?v=a01QQZyl-_I' },
  ],
  Thoughtful: [
    { title: 'The Scientist', artist: 'Coldplay', spotifyUrl: 'https://open.spotify.com/track/75JFxkI2RXiU7L9VXzMkle', youtubeUrl: 'https://youtube.com/watch?v=RB-RcX5DS5A' },
    { title: 'Thinking Out Loud', artist: 'Ed Sheeran', spotifyUrl: 'https://open.spotify.com/track/2Z8WuEywRWYTKe1NybPQEW', youtubeUrl: 'https://youtube.com/watch?v=lp-EO5I60KA' },
    { title: 'Philosophy', artist: 'Ben Folds Five', spotifyUrl: 'https://open.spotify.com/track/0UjsXo9l6I8Ez1AgHPjEUU', youtubeUrl: 'https://youtube.com/watch?v=dVtZbBuqWx0' },
  ],
  'Thrill-seeking': [
    { title: 'Danger Zone', artist: 'Kenny Loggins', spotifyUrl: 'https://open.spotify.com/track/1WI5ez7T8TpJUdDAWdONEy', youtubeUrl: 'https://youtube.com/watch?v=siwpn14IE7E' },
    { title: 'Thunderstruck', artist: 'AC/DC', spotifyUrl: 'https://open.spotify.com/track/57bgtoPSgt236HzfBOd8kj', youtubeUrl: 'https://youtube.com/watch?v=v2AC41dglnM' },
    { title: 'Adrenaline', artist: 'Shinedown', spotifyUrl: 'https://open.spotify.com/track/0UjsXo9l6I8Ez1AgHPjEUU', youtubeUrl: 'https://youtube.com/watch?v=HSH--SJKVQQ' },
  ],
  Playful: [
    { title: 'Sugar', artist: 'Maroon 5', spotifyUrl: 'https://open.spotify.com/track/2iuZJX9X9P0GKaE93xcPjk', youtubeUrl: 'https://youtube.com/watch?v=09R8_2nJtjg' },
    { title: 'Shake It Off', artist: 'Taylor Swift', spotifyUrl: 'https://open.spotify.com/track/2Z8WuEywRWYTKe1NybPQEW', youtubeUrl: 'https://youtube.com/watch?v=nfWlot6h_JM' },
    { title: 'Party Rock Anthem', artist: 'LMFAO', spotifyUrl: 'https://open.spotify.com/track/0UjsXo9l6I8Ez1AgHPjEUU', youtubeUrl: 'https://youtube.com/watch?v=KQ6zr6kCPj8' },
  ],
};

function App() {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [recommendations, setRecommendations] = useState<MusicRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMoodSelection, setShowMoodSelection] = useState(true);

  const handleMoodSelect = async (mood: string) => {
    setSelectedMood(mood);
    setLoading(true);
    setShowMoodSelection(false);
    
    // Simulate API call delay
    setTimeout(() => {
      setRecommendations(mockRecommendations[mood] || []);
      setLoading(false);
    }, 800);
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
                  onClick={() => handleMoodSelect(mood.name)}
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
          © 2025 Mood to Music. Made with ❤️ for music lovers everywhere.
        </p>
      </footer>
    </div>
  );
}

export default App;