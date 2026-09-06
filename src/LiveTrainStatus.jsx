import React, { useState } from 'react';
import './LiveTrainStatus.css';

const LiveTrainStatus = () => {
  const [searchValue, setSearchValue] = useState('12951 — Mumbai Rajdhani');

  return (
    <div className="train-status-page">
      
      {/* CARD 1 — SEARCH */}
      <div className="status-card">
        <div className="card-header-row">
          <h2 className="card-title">Live Train Status</h2>
          <span className="badge-active-gps">
            <span className="gps-dot"></span>
            ACTIVE GPS
          </span>
        </div>
        <p className="card-subtext">
          Search for a train to see its current position and predicted arrival times.
        </p>

        <div className="search-form-row">
          <div className="search-input-wrapper">
            <svg className="search-input-icon" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              type="text" 
              className="search-input" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <button className="search-button">Search</button>
        </div>

        <div className="search-footer-row">
          <div>
            <span className="example-text">Example: </span>
            <span className="example-link">12951 Mumbai Rajdhani</span>
          </div>
          <div className="recent-link">Recent: 12004</div>
        </div>
      </div>

      {/* CARD 2 — TRAIN SUMMARY */}
      <div className="status-card">
        <div className="card-header-row">
          <h2 className="card-title">12951 — Mumbai Rajdhani</h2>
          <span className="badge-superfast">Superfast</span>
        </div>

        <div className="route-line">
          <span>New Delhi</span>
          <svg className="route-arrow" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span>Mumbai Central</span>
        </div>

        <div className="status-banner">
          <div className="banner-main-text">
            <span className="banner-dot"></span>
            <span>
              Running — currently between <u style={{ fontWeight: 700 }}>Ratlam Jn.</u> and <u style={{ fontWeight: 700 }}>Vadodara Jn.</u>
            </span>
          </div>
          <div className="banner-subtext">
            Last updated: 24 Aug 2026, 16:20 via Station Mast GPS
          </div>
        </div>

        <div className="mini-stats-grid">
          <div className="mini-stat-card stat-status">
            <div className="mini-stat-label">CURRENT STATUS</div>
            <div className="mini-stat-value">Running</div>
          </div>
          <div className="mini-stat-card stat-delay">
            <div className="mini-stat-label">CURRENT DELAY</div>
            <div className="mini-stat-value">+12 min</div>
          </div>
          <div className="mini-stat-card stat-confidence">
            <div className="mini-stat-label">CONFIDENCE</div>
            <div className="mini-stat-value">94%</div>
          </div>
        </div>
      </div>

      {/* CARD 3 — LIVE STATION PROGRESSION */}
      <div className="status-card">
        <div className="card-header-row" style={{ marginBottom: 12 }}>
          <span className="section-header-uppercase">LIVE STATION PROGRESSION</span>
          <span className="distance-text">Distance: 1,384 km</span>
        </div>

        <div className="timeline-container">
          
          {/* Station 1: New Delhi */}
          <div className="timeline-row">
            <div className="sched-col">
              <div className="sched-time">12:10</div>
              <div className="sched-label">Sched</div>
            </div>
            <div className="track-col">
              <div className="track-line"></div>
              <div className="track-icon">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <circle cx="9" cy="9" r="7" fill="none" stroke="#10B981" strokeWidth="2"/>
                  <circle cx="9" cy="9" r="3.5" fill="#10B981"/>
                </svg>
              </div>
            </div>
            <div className="station-info-col">
              <div className="station-name">New Delhi</div>
              <div className="station-historical">Historical: avg 2 min late here</div>
            </div>
            <div className="actual-col">
              <div className="actual-time">12:08</div>
              <span className="status-pill pill-ontime">On time</span>
            </div>
          </div>

          {/* Station 2: Kota Junction */}
          <div className="timeline-row">
            <div className="sched-col">
              <div className="sched-time">14:32</div>
              <div className="sched-label">Sched</div>
            </div>
            <div className="track-col">
              <div className="track-line"></div>
              <div className="track-icon">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <circle cx="9" cy="9" r="7" fill="none" stroke="#10B981" strokeWidth="2"/>
                  <circle cx="9" cy="9" r="3.5" fill="#10B981"/>
                </svg>
              </div>
            </div>
            <div className="station-info-col">
              <div className="station-name">Kota Junction</div>
              <div className="station-historical">Historical: avg 3 min late here</div>
            </div>
            <div className="actual-col">
              <div className="actual-time">14:32</div>
              <span className="status-pill pill-ontime">On time</span>
            </div>
          </div>

          {/* Inline Highlight Box */}
          <div className="live-position-box">
            <div className="live-train-square">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="16" rx="2" />
                <path d="M4 11h16" />
                <path d="M12 3v8" />
                <path d="m8 19-2 3" />
                <path d="m16 19 2 3" />
                <circle cx="8" cy="15" r="1" fill="#FFFFFF" />
                <circle cx="16" cy="15" r="1" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="live-position-content">
              <div className="live-position-header">
                <span className="pill-weather-delay">● Weather delay</span>
                <span className="live-position-title">Live position</span>
              </div>
              <div className="live-position-text">
                Train is between <strong>Ratlam Jn.</strong> and <strong>Vadodara Jn.</strong>
              </div>
            </div>
          </div>

          {/* Station 3: Ratlam Junction */}
          <div className="timeline-row">
            <div className="sched-col">
              <div className="sched-time">16:05</div>
              <div className="sched-label">Sched</div>
            </div>
            <div className="track-col">
              <div className="track-line"></div>
              <div className="track-icon">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <circle cx="9" cy="9" r="7" fill="none" stroke="#2563EB" strokeWidth="2"/>
                  <circle cx="9" cy="9" r="3.5" fill="#2563EB"/>
                </svg>
              </div>
            </div>
            <div className="station-info-col">
              <div className="station-name">Ratlam Junction</div>
              <div className="station-historical">Historical: avg 9 min late here</div>
            </div>
            <div className="actual-col">
              <div className="actual-time delayed">16:17</div>
              <span className="status-pill pill-delayed">Delayed 12 min</span>
            </div>
          </div>

          {/* Station 4: Vadodara Junction */}
          <div className="timeline-row">
            <div className="sched-col">
              <div className="sched-time">18:47</div>
              <div className="sched-label">Sched</div>
            </div>
            <div className="track-col">
              <div className="track-line"></div>
              <div className="track-icon">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <circle cx="9" cy="9" r="7" fill="none" stroke="#2563EB" strokeWidth="2"/>
                  <circle cx="9" cy="9" r="3.5" fill="#2563EB"/>
                </svg>
              </div>
            </div>
            <div className="station-info-col">
              <div className="station-name">Vadodara Junction</div>
              <div className="station-historical">Historical: avg 6 min late here</div>
            </div>
            <div className="actual-col">
              <div className="actual-time delayed">18:52</div>
              <span className="status-pill pill-delayed">Delayed 5 min</span>
            </div>
          </div>

          {/* Station 5: Borivali */}
          <div className="timeline-row">
            <div className="sched-col">
              <div className="sched-time">20:58</div>
              <div className="sched-label">Sched</div>
            </div>
            <div className="track-col">
              <div className="track-line"></div>
              <div className="track-icon">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <circle cx="9" cy="9" r="7" fill="none" stroke="#94A3B8" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="station-info-col">
              <div className="station-name">Borivali</div>
              <div className="station-historical">Historical: avg 14 min late here</div>
            </div>
            <div className="actual-col">
              <div className="actual-time delayed">21:16</div>
              <span className="status-pill pill-delayed">Delayed 18 min</span>
            </div>
          </div>

          {/* Station 6: Mumbai Central */}
          <div className="timeline-row">
            <div className="sched-col">
              <div className="sched-time">22:40</div>
              <div className="sched-label">Sched</div>
            </div>
            <div className="track-col">
              <div className="track-icon">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <circle cx="9" cy="9" r="7" fill="none" stroke="#94A3B8" strokeWidth="2"/>
                  <circle cx="9" cy="9" r="3.5" fill="#94A3B8"/>
                </svg>
              </div>
            </div>
            <div className="station-info-col">
              <div className="station-name">Mumbai Central</div>
              <div className="final-dest-label">FINAL DESTINATION</div>
            </div>
            <div className="actual-col">
              <div className="actual-time" style={{ color: '#64748B' }}>22:40</div>
              <div style={{ color: '#94A3B8', fontSize: '11px', marginTop: '4px' }}>—</div>
            </div>
          </div>

        </div>

        {/* Legend */}
        <div className="timeline-legend">
          <div className="legend-item">
            <svg width="14" height="14" viewBox="0 0 18 18">
              <circle cx="9" cy="9" r="7" fill="none" stroke="#10B981" strokeWidth="2"/>
              <circle cx="9" cy="9" r="3.5" fill="#10B981"/>
            </svg>
            <span>Passed station</span>
          </div>
          <div className="legend-item">
            <svg width="14" height="14" viewBox="0 0 18 18">
              <circle cx="9" cy="9" r="7" fill="none" stroke="#2563EB" strokeWidth="2"/>
              <circle cx="9" cy="9" r="3.5" fill="#2563EB"/>
            </svg>
            <span>Upcoming station</span>
          </div>
          <div className="legend-item">
            <svg width="14" height="14" viewBox="0 0 18 18">
              <circle cx="9" cy="9" r="7" fill="none" stroke="#94A3B8" strokeWidth="2"/>
            </svg>
            <span>Yet to arrive</span>
          </div>
          <div className="legend-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2">
              <rect x="4" y="3" width="16" height="16" rx="2" />
              <path d="M4 11h16" />
            </svg>
            <span>Live train position</span>
          </div>
        </div>
      </div>

      {/* CARD 4 — DELAY INSIGHTS */}
      <div className="status-card">
        <div className="card-header-row">
          <div>
            <h2 className="card-title">Delay insights</h2>
            <div className="card-subtext" style={{ margin: '2px 0 0 0' }}>Root cause attribution analysis</div>
          </div>
          <span className="total-delay-pill">+12 min total</span>
        </div>

        <div className="delay-rows-container">
          
          {/* Row 1 */}
          <div className="delay-item-row">
            <div className="delay-item-header">
              <div className="delay-item-label">
                <span className="delay-bullet" style={{ backgroundColor: '#EF4444' }}></span>
                <span>Weather delay</span>
              </div>
              <span className="delay-item-stats">40% (~5 min)</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '40%', backgroundColor: '#EF4444' }}></div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="delay-item-row">
            <div className="delay-item-header">
              <div className="delay-item-label">
                <span className="delay-bullet" style={{ backgroundColor: '#F59E0B' }}></span>
                <span>Speed reduction</span>
              </div>
              <span className="delay-item-stats">30% (~4 min)</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '30%', backgroundColor: '#F59E0B' }}></div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="delay-item-row">
            <div className="delay-item-header">
              <div className="delay-item-label">
                <span className="delay-bullet" style={{ backgroundColor: '#A855F7' }}></span>
                <span>Signal delay</span>
              </div>
              <span className="delay-item-stats">20% (~2.5 min)</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '20%', backgroundColor: '#A855F7' }}></div>
            </div>
          </div>

          {/* Row 4 */}
          <div className="delay-item-row">
            <div className="delay-item-header">
              <div className="delay-item-label">
                <span className="delay-bullet" style={{ backgroundColor: '#94A3B8' }}></span>
                <span>Congestion</span>
              </div>
              <span className="delay-item-stats">10% (~1.2 min)</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '10%', backgroundColor: '#94A3B8' }}></div>
            </div>
          </div>

        </div>
      </div>

      {/* CARD 5 — PREDICTION INSIGHTS */}
      <div className="status-card">
        <div className="card-header-row">
          <h2 className="card-title">Prediction insights</h2>
          <span className="badge-active-gps" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
            Confidence: 94%
          </span>
        </div>

        <div className="prediction-summary-box">
          <div className="pred-col">
            <span className="pred-label">SCHEDULED ETA</span>
            <span className="pred-val">18:47</span>
          </div>

          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>

          <div className="pred-col">
            <span className="pred-label">PREDICTED ETA</span>
            <span className="pred-val red">18:52</span>
          </div>

          <div className="pred-col">
            <span className="pred-label">NET VARIANCE</span>
            <span className="pred-val orange">+5 min delay</span>
          </div>
        </div>

        <div className="variance-trend-row">
          <span className="trend-label">Model variance trend:</span>
          <span className="trend-val">± 1.4 min standard dev</span>
        </div>

        <div className="segmented-pill">
          <div className="segment segment-min">Min 18:48</div>
          <div className="segment segment-median">Median 18:52</div>
          <div className="segment segment-max">Max 18:56</div>
        </div>

        <div className="action-btn-link">
          View detailed analysis &amp; historical graphs
        </div>
      </div>

    </div>
  );
};

export default LiveTrainStatus;
