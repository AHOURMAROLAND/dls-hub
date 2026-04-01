// API service for DLS Hub backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Accept': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Remove Content-Type for FormData (browser sets it automatically with boundary)
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Une erreur est survenue' }));
    throw new Error(error.detail || `HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
}

// ==========================================
// TOURNAMENT API
// ==========================================

export const tournamentAPI = {
  // Create a new tournament
  create: async (formData) => {
    return apiCall('/tournaments/', {
      method: 'POST',
      body: formData,
    });
  },

  // Get tournament by slug
  get: async (slug) => {
    return apiCall(`/tournaments/${slug}`);
  },

  // Get players in tournament
  getPlayers: async (slug) => {
    return apiCall(`/tournaments/${slug}/players`);
  },

  // Generate draw (preview)
  generateDraw: async (slug, creatorSession) => {
    return apiCall(`/tournaments/${slug}/draw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creator_session: creatorSession }),
    });
  },

  // Confirm draw
  confirmDraw: async (slug, creatorSession, draw) => {
    return apiCall(`/tournaments/${slug}/draw/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creator_session: creatorSession, draw }),
    });
  },
};

// ==========================================
// PLAYER API
// ==========================================

export const playerAPI = {
  // Verify DLL idx with tracker
  verify: async (dllIdx) => {
    return apiCall(`/players/verify/${dllIdx}`);
  },

  // Register player to tournament
  register: async (slug, formData) => {
    return apiCall(`/players/register/${slug}`, {
      method: 'POST',
      body: formData,
    });
  },

  // Accept or reject player (creator only)
  decision: async (playerId, decision, creatorSession) => {
    return apiCall('/players/decision', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        player_id: playerId,
        decision: decision, // 'accept' or 'reject'
        creator_session: creatorSession,
      }),
    });
  },
};

// ==========================================
// MATCH API
// ==========================================

export const matchAPI = {
  // Get matches for tournament
  getMatches: async (slug) => {
    return apiCall(`/matches/tournament/${slug}`);
  },

  // Validate match score
  validate: async (matchId, scoreData, creatorSession) => {
    return apiCall(`/matches/${matchId}/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...scoreData,
        creator_session: creatorSession,
      }),
    });
  },

  // Update match score manually
  updateScore: async (matchId, scoreData, creatorSession) => {
    return apiCall(`/matches/${matchId}/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...scoreData,
        creator_session: creatorSession,
      }),
    });
  },
};

// ==========================================
// TRACKER API (FTGames)
// ==========================================

export const trackerAPI = {
  // Get recent matches for a player
  getRecentMatches: async (dllIdx, limit = 3) => {
    return apiCall(`/tracker/matches/${dllIdx}?limit=${limit}`);
  },
};

// ==========================================
// WEBSOCKET
// ==========================================

export class TournamentWebSocket {
  constructor(tournamentId, onMessage) {
    this.ws = new WebSocket(`ws://${API_BASE_URL.replace('http://', '')}/ws/tournament/${tournamentId}`);
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
    this.ws.onerror = (error) => console.error('WebSocket error:', error);
  }

  close() {
    this.ws.close();
  }
}

export default {
  tournamentAPI,
  playerAPI,
  matchAPI,
  trackerAPI,
  TournamentWebSocket,
};
