import React from 'react';
import { Video } from '../VideoCard/VideoCard';
import { VideoCard } from '../VideoCard/VideoCard';
import styles from './VideoGrid.module.css';

interface VideoGridProps {
  videos: Video[] | undefined; // can come from API
  onSubmit?: (id: string | number, timestamp: number) => void;
}

/** Responsive grid of video cards with full backend-awareness */
export const VideoGrid: React.FC<VideoGridProps> = ({ videos, onSubmit }) => {
  // Case: still waiting for backend to respond
  if (videos === undefined) {
    return <p className={styles.status}>Loading videos…</p>;
  }

  // Case: no results found from backend
  if (videos.length === 0) {
    return <p className={styles.status}>No matching videos found.</p>;
  }

  // Case: backend returned results — render them
  return (
    <div className={styles.gridRoot}>
      {videos.map(video => (
        <VideoCard key={video.id} video={video} onSubmit={onSubmit} />
      ))}
    </div>
  );
};
// Note: This component expects the `videos` prop to be an array of Video objects
//       as defined in mockVideos.ts. It can be used with both real API data