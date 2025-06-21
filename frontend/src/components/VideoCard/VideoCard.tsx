import React, { useState, useRef } from 'react';
import { submitVideoToDRES, DRESSubmissionResult } from '../../hooks/useDRES';
import styles from './VideoCard.module.css';

/**
 * Video interface for both mock data and backend API responses.
 */
export interface Video {
  id: number | string;
  title: string;
  video_path: string; // full URL or relative path to the MP4
  duration: number;
  score?: number;
  timestamp?: number;
  objects?: string[];
  text?: string[];
  dominant_colors?: [number, number, number][];
}

/**
 * VideoCard component that displays a single video with metadata,
 * optional overlays for playback and timestamp submission.
 */
export const VideoCard: React.FC<{
  video: Video;
  onSubmit?: (id: string | number, timestamp: number) => void;
  currentQueryId?: string; // For DRES integration
  enableDRES?: boolean; // Enable DRES submission mode
}> = ({ video, onSubmit, currentQueryId, enableDRES = false }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [ts, setTs] = useState(video.timestamp ?? 0);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<DRESSubmissionResult | null>(null);
  const submitVideoRef = useRef<HTMLVideoElement | null>(null);

  const closePlayer = () => setShowPlayer(false);
  const closeSubmit = () => {
    setTs(video.timestamp ?? 0);
    setShowSubmit(false);
    setSubmissionResult(null);
  };

  const videoUrl = video.video_path;

  // Extract video ID from video path or title
  const extractVideoId = (): string => {
    // Try to extract from video_path first
    if (video.video_path.includes('/')) {
      const parts = video.video_path.split('/');
      const filename = parts[parts.length - 1];
      if (filename.includes('.mp4')) {
        return filename.replace('.mp4', '');
      }
    }
    
    // Fallback to extracting from title
    const titleMatch = video.title.match(/Video (\d+)/);
    if (titleMatch) {
      return titleMatch[1];
    }
    
    // Last resort: use the video id
    return video.id.toString();
  };

  const handleSubmit = async () => {
    if (enableDRES && currentQueryId) {
      // Submit to DRES
      setSubmitting(true);
      try {
        const videoId = extractVideoId();
        const result = await submitVideoToDRES(currentQueryId, videoId, ts, video.score || 1.0);
        setSubmissionResult(result);
        
        if (result.success) {
          // Auto-close after successful submission
          setTimeout(() => {
            closeSubmit();
          }, 2000);
        }
      } catch (error) {
        setSubmissionResult({
          success: false,
          message: 'Failed to submit to DRES'
        });
      } finally {
        setSubmitting(false);
      }
    } else {
      // Use original onSubmit callback
      onSubmit?.(video.id, ts);
      closeSubmit();
    }
  };

  return (
    <>
      {/* ────────── PLAYER OVERLAY ────────── */}
      {showPlayer && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button className={styles.close} onClick={closePlayer}>×</button>
            <video
              autoPlay
              controls
              onPlay={e => {
                if (video.timestamp != null) {
                  e.currentTarget.currentTime = video.timestamp - 0.5;
                }
              }}
              style={{ width: '100%', borderRadius: 8, background: '#000' }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* ────────── SUBMIT OVERLAY ────────── */}
      {showSubmit && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button className={styles.close} onClick={closeSubmit}>×</button>
            <video
              ref={submitVideoRef}
              autoPlay
              controls
              onPlay={e => {
                if (video.timestamp != null) {
                  e.currentTarget.currentTime = video.timestamp - 0.5;
                }
              }}
              style={{ width: '100%', borderRadius: 8, background: '#000', marginBottom: 12 }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            <button className={styles.small} onClick={() => setTs(submitVideoRef.current?.currentTime ?? ts)}>
              Update timestamp
            </button>

            <div className={styles.tsRow}>
              <span>Timestamp&nbsp;(s)</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={ts}
                onChange={e => {
                  const v = parseFloat(e.target.value);
                  submitVideoRef.current?.fastSeek?.(v);
                  setTs(v);
                }}
              />
            </div>

            {/* DRES submission info */}
            {enableDRES && currentQueryId && (
              <div className={styles.dresInfo}>
                <p><strong>DRES Submission</strong></p>
                <p>Query ID: {currentQueryId}</p>
                <p>Video ID: {extractVideoId()}</p>
                <p>Timestamp: {ts.toFixed(3)}s</p>
              </div>
            )}

            {/* Submission result feedback */}
            {submissionResult && (
              <div className={`${styles.submissionResult} ${submissionResult.success ? styles.success : styles.error}`}>
                <p>{submissionResult.message}</p>
              </div>
            )}

            <button 
              className={styles.submitBtn} 
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : (enableDRES ? 'Submit to DRES' : 'Submit')}
            </button>
          </div>
        </div>
      )}

      {/* ────────── MAIN VIDEO CARD ────────── */}
      <div className={styles.card}>
        <video
          src={videoUrl}
          controls
          width="100%"
          style={{ borderRadius: 8, background: '#000' }}
        />

        <div className={styles.title}>{video.title}</div>

        {/* Optional metadata (safe with ?. and fallback) */}
        {video.score !== undefined && (
          <p className={styles.meta}>Score : {video.score.toFixed(3)}</p>
        )}
        {video.timestamp !== undefined && (
          <p className={styles.meta}>Timestamp : {video.timestamp.toFixed(3)}&nbsp;s</p>
        )}
        {(video.objects?.length ?? 0) > 0 && (
          <p className={styles.meta}><strong>Objects:</strong> {video.objects!.join(', ')}</p>
        )}
        {(video.text?.length ?? 0) > 0 && (
          <p className={styles.meta}><strong>Text:</strong> {video.text!.join(', ')}</p>
        )}
        {(video.dominant_colors?.length ?? 0) > 0 && (
          <div className={styles.colorRow}>
            {video.dominant_colors!.map((c, i) => (
              <span
                key={i}
                className={styles.colorDot}
                title={`rgb(${c[0]}, ${c[1]}, ${c[2]})`}
                style={{ background: `rgb(${c[0]}, ${c[1]}, ${c[2]})` }}
              />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className={styles.actionsRow}>
          <button className={styles.small} onClick={() => setShowPlayer(true)}>Play</button>
          {(onSubmit || enableDRES) && (
            <button className={styles.small} onClick={() => setShowSubmit(true)}>
              {enableDRES ? 'Submit to DRES' : 'Submit'}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
