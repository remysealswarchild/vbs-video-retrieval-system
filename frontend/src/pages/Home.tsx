// frontend/src/pages/Home.tsx
import React, { useState } from 'react';
import { FilterPanel, FilterCriteria } from '../components/FilterPanel/FilterPanel';
import { VideoGrid } from '../components/VideoGrid/VideoGrid';
import { useSearchVideos } from '../hooks/useSearchVideos';
import { mockVideos } from '../data/mockVideos';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const [criteria, setCriteria] = useState<FilterCriteria>({});
  const { results, loading, error, searchWithCriteria } = useSearchVideos();

  // When filter changes, run the search
  const handleFilterChange = (newCriteria: FilterCriteria) => {
    setCriteria(newCriteria);
    searchWithCriteria(newCriteria);
  };

  const videosToShow = !error ? results : mockVideos;

  return (
    <main className={styles.mainRoot}>
      <div className={styles.layout}>
        {/* Sidebar with filters and manual search trigger */}
        <div className={styles.sidebar}>
          <FilterPanel onChange={handleFilterChange} />
        </div>

        {/* Main content with video grid */}
        <div className={styles.content}>
          {loading && <p style={{ padding: '1rem' }}>🔄 Loading results...</p>}
          {error && (
            <p style={{ padding: '1rem', color: 'red' }}>
              ⚠️ {error} – showing mock results instead.
            </p>
          )}
          {!loading && videosToShow.length === 0 && (
            <p style={{ padding: '1rem' }}>No results found.</p>
          )}
          <VideoGrid videos={videosToShow} />
        </div>
      </div>
    </main>
  );
};
