import * as React from 'react';

export interface PartyProps {
    /** useRect() */
    boundary:
        | (Partial<DOMRect> & {
              readonly bottom: number;
              readonly height: number;
              readonly left: number;
              readonly right: number;
              readonly top: number;
              readonly width: number;
          })
        | null;
    /** Line width */
    weigth?: number;
    /** Color */
    fill?: string;
    /** Adjustments */
    transforms?: string;
    /** Spacing X axis */
    x?: number;
    /** Spacing Y axis */
    y?: number;
    /** strokeLinecap, strokeLineJoin */
    round?: boolean;
    /** HTML elements to join */
    refs: Array<React.MutableRefObject<HTMLDivElement | null>>;
    /** Join with svg as */
    variant?: 'line' | 'curve';
}
