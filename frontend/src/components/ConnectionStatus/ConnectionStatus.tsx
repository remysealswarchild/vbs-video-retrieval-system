import React from 'react'
import { Circle } from 'lucide-react'
import { useConnectionStatus } from '../../hooks/useConnectionStatus'
import styles from './ConnectionStatus.module.css'

// ConnectionStatus: shows backend & dres status dots
export const ConnectionStatus: React.FC = () => {
  const { backend, dres } = useConnectionStatus()
  const dot = (s: {isLoading:boolean,isError:boolean}) =>
    s.isLoading
      ? <Circle size={12} className={styles.dotGray} />
      : s.isError
      ? <Circle size={12} className={styles.dotRed} />
      : <Circle size={12} className={styles.dotGreen} />

  return (
    <div className={styles.statusRoot}>
      <div className={styles.statusItem}>
        {dot(backend)}<span>Backend</span>
      </div>
      <div className={styles.statusItem}>
        {dot(dres)}<span>DRES</span>
      </div>
    </div>
  )
}

