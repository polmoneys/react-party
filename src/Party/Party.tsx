import * as React from 'react';
import { PartyProps } from './Party.types';
import { line, curveCardinal } from 'd3-shape';
import { matchRefsToPoints } from './utils';
import './Party.scss';

const Party = (props: PartyProps) => {
    const [pathValues, setPathValues] = React.useState<string | null>(null);
    const { boundary, refs, fill = 'currentColor', weigth = 4, round = true, x = 0, y = 0, variant = 'line', transforms = undefined } = props;

    const draw = React.useCallback(() => {
        if (boundary === null) return;
        matchRefsToPoints(refs, boundary, x, y)
            .then((points: Array<[number, number]>) => {
                if (variant === 'line') {
                    return line()([...points]);
                } else {
                    return line().curve(curveCardinal)([...points]);
                }
            })
            .then((path: unknown) => {
                const p = path as string;
                setPathValues(p);
            });
    }, [boundary, refs, x, y, variant]);

    React.useEffect(() => {
        draw();
    }, [boundary, draw]);

    return (
        <svg
            className="party-svg"
            style={{
                transform: transforms ? transforms : undefined,
            }}
        >
            {pathValues && (
                <path
                    fill="none"
                    stroke={fill}
                    strokeWidth={weigth}
                    strokeLinecap={round ? 'round' : 'square'}
                    strokeLinejoin={round ? 'round' : 'miter'}
                    d={pathValues}
                />
            )}
        </svg>
    );
};

export default Party;
