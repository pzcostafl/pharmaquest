import { useSyncExternalStore } from 'react';
import { getBanco, ouvirBanco, versaoBanco } from '../data/banco';

/** Banco farmacológico reativo (recarrega quando o admin publica alterações). */
export function useBanco() {
  useSyncExternalStore(ouvirBanco, versaoBanco);
  return getBanco();
}
