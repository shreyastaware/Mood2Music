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
    tracks = [
        f"https://open.spotify.com/track/{track['id']}"
        for track in data.get('tracks', [])
    ]
    return tracks

# YouTube Search
def search_youtube(query):
    api_key = os.getenv("YOUTUBE_API_KEY")
    url = "https://youtube.googleapis.com/youtube/v3/search"

    params = {
        'part': 'snippet',
        'maxResults': 5,
        'q': query,
        'key': api_key,
        'type': 'video'
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="YouTube API error")

    data = response.json()

    links = [
        f"https://www.youtube.com/watch?v={item['id']['videoId']}"
        for item in data.get('items', [])
    ]
    return links

# API Route
@app.get("/recommend")
def recommend(mood: str):
    mood = mood.lower()
    if mood not in mood_map:
        raise HTTPException(status_code=404, detail="Mood not found")

    mood_data = mood_map[mood]

    spotify_filters = mood_data.get("spotify_filters", {})
    youtube_query = mood_data.get("youtube_query", mood)

    spotify_links = get_spotify_recommendations(spotify_filters)
    youtube_links = search_youtube(youtube_query)

    return {
        "mood": mood,
        "spotify": spotify_links,
        "youtube": youtube_links
    }
