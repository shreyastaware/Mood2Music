from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load mood mapping
with open("mood_mapping.json", "r") as f:
    mood_map = json.load(f)

# Spotify Auth
def get_spotify_token():
    auth_url = 'https://accounts.spotify.com/api/token'
    client_id = os.getenv("SPOTIFY_CLIENT_ID")
    client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")
    response = requests.post(auth_url, {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
    })
    return response.json().get('access_token')

# Spotify Recommendations
def get_spotify_recommendations(filters):
    token = get_spotify_token()
    headers = {'Authorization': f'Bearer {token}'}

    params = {
        'limit': 5,
        'seed_genres': 'pop',
        **filters
    }

    response = requests.get(
        'https://api.spotify.com/v1/recommendations',
        headers=headers,
        params=params
    )

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Spotify API error")

    data = response.json()

    tracks = []
    for item in data.get("tracks", {}).get("items", []):
        title = item["name"]
        artist = item["artists"][0]["name"]
        spotify_url = item["external_urls"]["spotify"]
        tracks.append({
            "title": title,
            "artist": artist,
            "spotifyUrl": spotify_url
        })

    return tracks

# YouTube Search
def search_youtube_link(title: str, artist: str):
    query = f"{title} {artist} music"
    api_key = os.getenv("YOUTUBE_API_KEY")
    response = requests.get(
        "https://www.googleapis.com/youtube/v3/search",
        params={
            "part": "snippet",
            "q": query,
            "key": api_key,
            "maxResults": 1,
            "type": "video"
        }
    )

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="YouTube API error")

    data = response.json()

    items = data.json().get("items", [])
    if items:
        return f"https://www.youtube.com/watch?v={items[0]['id']['videoId']}"
    return ""

# API Route
@app.get("/recommend")
def recommend(mood: str):
    mood = mood.lower()
    if mood not in mood_map:
        raise HTTPException(status_code=404, detail="Mood not found")

    mood_data = mood_map[mood]

    spotify_filters = mood_data.get("spotify_filters", {})
    tracks = get_spotify_recommendations(spotify_filters)
    for track in tracks:
        track["youtubeUrl"] = search_youtube_link(track["title"], track["artist"])

    return tracks