/**
 * API Service for Aaagman Rail ETA Frontend
 * Connects to Spring Boot backend at http://localhost:8080 (proxied via /api)
 * Includes robust fallbacks and mock data for offline/standalone development.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Fallback Train Registry
export const DEFAULT_TRAINS = [
  { trainNo: '12951', name: 'Mumbai Rajdhani Express', routeCode: 'NDLS-MMCT-12951', active: true, from: 'New Delhi (NDLS)', to: 'Mumbai Central (MMCT)', type: 'Superfast' },
  { trainNo: '12031', name: 'Amritsar Shatabdi Express', routeCode: 'NDLS-ASR-12031', active: true, from: 'New Delhi (NDLS)', to: 'Amritsar Jn (ASR)', type: 'Shatabdi' },
  { trainNo: '12004', name: 'Lucknow Swarna Shatabdi', routeCode: 'NDLS-LKO-12004', active: true, from: 'New Delhi (NDLS)', to: 'Lucknow Jn (LJN)', type: 'Shatabdi' },
  { trainNo: '12002', name: 'Bhopal Shatabdi Express', routeCode: 'NDLS-BPL-12002', active: true, from: 'New Delhi (NDLS)', to: 'Rani Kamlapati (RKMP)', type: 'Shatabdi' },
  { trainNo: '12301', name: 'Howrah Rajdhani Express', routeCode: 'HWH-NDLS-12301', active: true, from: 'Howrah Jn (HWH)', to: 'New Delhi (NDLS)', type: 'Rajdhani' },
  { trainNo: '12423', name: 'Dibrugarh Rajdhani Express', routeCode: 'DBRG-NDLS-12423', active: true, from: 'Dibrugarh (DBRG)', to: 'New Delhi (NDLS)', type: 'Rajdhani' }
];

// Fallback Stations for 12951 Mumbai Rajdhani
const DEFAULT_ROUTE_12951 = [
  { sequenceNumber: 1, stationCode: 'NDLS', stationName: 'New Delhi', arrivalTime: '16:55:00', departureTime: '16:55:00', day: 1, avgDelay: 2 },
  { sequenceNumber: 2, stationCode: 'KOTA', stationName: 'Kota Junction', arrivalTime: '21:30:00', departureTime: '21:40:00', day: 1, avgDelay: 3 },
  { sequenceNumber: 3, stationCode: 'RTM', stationName: 'Ratlam Junction', arrivalTime: '01:13:00', departureTime: '01:15:00', day: 2, avgDelay: 9 },
  { sequenceNumber: 4, stationCode: 'BRC', stationName: 'Vadodara Junction', arrivalTime: '04:38:00', departureTime: '04:48:00', day: 2, avgDelay: 6 },
  { sequenceNumber: 5, stationCode: 'BVI', stationName: 'Borivali', arrivalTime: '07:53:00', departureTime: '07:55:00', day: 2, avgDelay: 14 },
  { sequenceNumber: 6, stationCode: 'MMCT', stationName: 'Mumbai Central', arrivalTime: '08:35:00', departureTime: '08:35:00', day: 2, avgDelay: 12 }
];

/**
 * Fetch all available trains for search & autocomplete
 */
export async function getTrains() {
  try {
    const res = await fetch(`${API_BASE_URL}/trains`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.warn('[API] Could not fetch trains from backend, using fallback list:', err.message);
  }
  return DEFAULT_TRAINS;
}

/**
 * Fetch composite live dashboard data for a train
 */
export async function getTrainDashboard(trainNo) {
  try {
    const res = await fetch(`${API_BASE_URL}/trains/${trainNo}/dashboard`);
    if (res.ok) {
      const data = await res.json();
      return { success: true, isLiveApi: true, data };
    }
  } catch (err) {
    console.warn(`[API] Composite dashboard fetch failed for ${trainNo}, trying individual endpoints:`, err.message);
  }

  // Fallback to individual endpoints
  try {
    const [trainRes, liveRes, etaRes] = await Promise.allSettled([
      fetch(`${API_BASE_URL}/trains/${trainNo}`).then(r => r.ok ? r.json() : null),
      fetch(`${API_BASE_URL}/live/${trainNo}`).then(r => r.ok ? r.json() : null),
      fetch(`${API_BASE_URL}/eta/${trainNo}`).then(r => r.ok ? r.json() : null)
    ]);

    const train = trainRes.status === 'fulfilled' ? trainRes.value : null;
    const liveState = liveRes.status === 'fulfilled' ? liveRes.value : null;
    const eta = etaRes.status === 'fulfilled' ? etaRes.value : null;

    let routeStations = [];
    if (train?.routeCode) {
      try {
        const routeRes = await fetch(`${API_BASE_URL}/routes/${train.routeCode}/stations`);
        if (routeRes.ok) routeStations = await routeRes.json();
      } catch (_) {}
    }

    if (train || liveState || eta) {
      return {
        success: true,
        isLiveApi: true,
        data: {
          trainNo,
          name: train?.name || `Train ${trainNo}`,
          routeCode: train?.routeCode || 'UNKNOWN',
          active: train?.active ?? true,
          live: Boolean(liveState),
          liveState,
          eta,
          routeStations: routeStations.length > 0 ? routeStations : DEFAULT_ROUTE_12951
        }
      };
    }
  } catch (err) {
    console.warn(`[API] Individual endpoints failed:`, err.message);
  }

  // Standalone simulated mock for seamless UX when backend is offline
  return getMockDashboardData(trainNo);
}

/**
 * Fetch live GPS telemetry for real-time polling
 */
export async function getLiveTrainState(trainNo) {
  try {
    const res = await fetch(`${API_BASE_URL}/live/${trainNo}`);
    if (res.ok) return await res.json();
  } catch (err) {
    // Return null if offline
  }
  return null;
}

/**
 * Fetch dynamically calculated ETA
 */
export async function getTrainEta(trainNo) {
  try {
    const res = await fetch(`${API_BASE_URL}/eta/${trainNo}`);
    if (res.ok) return await res.json();
  } catch (err) {
    // Return null if offline
  }
  return null;
}

/**
 * Fallback generator for realistic train telemetry
 */
function getMockDashboardData(trainNo) {
  const matching = DEFAULT_TRAINS.find(t => t.trainNo === trainNo) || {
    trainNo,
    name: `Express Train ${trainNo}`,
    routeCode: `RT-${trainNo}`,
    active: true,
    from: 'New Delhi',
    to: 'Mumbai Central',
    type: 'Express'
  };

  return {
    success: true,
    isLiveApi: false,
    data: {
      trainNo: matching.trainNo,
      name: matching.name,
      routeCode: matching.routeCode,
      active: true,
      live: true,
      liveState: {
        trainNo: matching.trainNo,
        latitude: 23.3315,
        longitude: 75.0367,
        speedKmh: 78.4,
        currentStation: 'RTM',
        nextStation: 'BRC',
        distanceToNextStationKm: 84.5,
        distanceToDestinationKm: 476.0,
        status: 'RUNNING',
        delayType: 'WEATHER',
        lastUpdated: new Date().toISOString()
      },
      eta: {
        trainNo: matching.trainNo,
        currentStation: 'Ratlam Jn (RTM)',
        nextStation: 'Vadodara Jn (BRC)',
        distanceToNextStationKm: 84.5,
        distanceToDestinationKm: 476.0,
        speedKmh: 78.4,
        etaToNextStationMinutes: 64.7,
        etaToDestinationMinutes: 364.3,
        delayMinutes: 12.0
      },
      routeStations: DEFAULT_ROUTE_12951
    }
  };
}
