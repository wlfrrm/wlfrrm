import { useEffect, useMemo, useRef, useState } from "react";

type Point = { x: number; y: number };
type HSLColor = { h: number; s: number; l: number };

export default function Shape() {
    const [points, setPoints] = useState<Point[]>(generatePoints());
    const [stroke, setStroke] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [gradientColors, setGradientColors] = useState<string[]>(() => generateGradientColors().map(hslToString));

    const gradientId = useMemo(
        () => `shape-gradient-${Math.random().toString(36).slice(2)}`,
        []
    );

    const fromRef = useRef<Point[]>(points);
    const toRef = useRef<Point[]>(points);
    const tRef = useRef(0);
    const strokeFromRef = useRef<number>(1);
    const strokeTargetRef = useRef<number>(1);
    const rotationRef = useRef(0);
    const colorRef = useRef({
        from: generateGradientColors(),
        to: generateGradientColors(),
        progress: 0,
        lastTime: 0,
        duration: 8000,
    });

    useEffect(() => {
        let inter = 5000;
        let raf: number;
        let rafColor: number;

        function animate() {
            tRef.current += 0.02;

            const t = easeInOut(tRef.current);

            const interpolated = fromRef.current.map((p, i) => ({
                x: lerp(p.x, toRef.current[i].x, t),
                y: lerp(p.y, toRef.current[i].y, t),
            }));

            setPoints(interpolated);
            setStroke(lerp(strokeFromRef.current, strokeTargetRef.current, t));

            if (tRef.current < 1) {
                raf = requestAnimationFrame(animate);
            }
        }

        function animateColor(now: number) {
            if (!colorRef.current.lastTime) {
                colorRef.current.lastTime = now;
            }
            const delta = Math.min((now - colorRef.current.lastTime) / colorRef.current.duration, 0.05);
            colorRef.current.lastTime = now;
            colorRef.current.progress += delta;

            if (colorRef.current.progress >= 1) {
                colorRef.current.progress -= 1;
                colorRef.current.from = colorRef.current.to;
                colorRef.current.to = generateGradientColors();
            }

            rotationRef.current = (rotationRef.current + 0.08) % 360;
            setRotation(rotationRef.current);

            const t = easeInOut(Math.min(colorRef.current.progress, 1));
            const nextColors = colorRef.current.from.map((fromColor, index) =>
                hslToString(interpolateHsl(fromColor, colorRef.current.to[index], t))
            );
            setGradientColors(nextColors);
            rafColor = requestAnimationFrame(animateColor);
        }

        rafColor = requestAnimationFrame(animateColor);

        const interval = setInterval(() => {
            strokeFromRef.current = strokeTargetRef.current;
            fromRef.current = toRef.current;

            // 10% chance to split one existing point into two
            if (Math.random() < 0.5 && fromRef.current.length > 0) {
                const idx = Math.floor(Math.random() * fromRef.current.length);
                const p = fromRef.current[idx];
                const offset = 4; // small offset for the new split point
                const angle = Math.random() * Math.PI * 2;
                const p2 = {
                    x: Math.max(0, Math.min(90, p.x + Math.cos(angle) * offset)),
                    y: Math.max(0, Math.min(90, p.y + Math.sin(angle) * offset)),
                };

                fromRef.current = [
                    ...fromRef.current.slice(0, idx + 1),
                    p2,
                    ...fromRef.current.slice(idx + 1),
                ];
            }

            toRef.current = generatePoints(fromRef.current.length);

            tRef.current = 0;

            setStroke(Math.random() + 0.7);

            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(animate);
            inter *= 0.98;
        }, Math.random() * inter);

        return () => {
            clearInterval(interval);
            cancelAnimationFrame(raf);
            cancelAnimationFrame(rafColor);
        };
    }, []);

    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={gradientColors[0]} />
                    <stop offset="50%" stopColor={gradientColors[1]} />
                    <stop offset="100%" stopColor={gradientColors[2]} />
                </linearGradient>
            </defs>
            <g transform={`rotate(${rotation} 50 50)`}>
                <polygon
                    points={pointsToSvg(points)}
                    fill={`url(#${gradientId})`}
                    fillOpacity={0.12}
                    stroke={`url(#${gradientId})`}
                    strokeWidth={stroke}
                />
            </g>
        </svg>
    );
}

/* ---------------- color utils ---------------- */

function generateGradientColors(): HSLColor[] {
    return Array.from({ length: 3 }, () => randomHslColor());
}

function randomHslColor(): HSLColor {
    return {
        h: Math.random() * 360,
        s: 70 + Math.random() * 15,
        l: 45 + Math.random() * 15,
    };
}

function hslToString(color: HSLColor): string {
    return `hsl(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.l)}%)`;
}

function interpolateHsl(from: HSLColor, to: HSLColor, t: number): HSLColor {
    const dh = (((to.h - from.h + 180) % 360) + 360) % 360;
    const hue = from.h + (dh > 180 ? dh - 360 : dh) * t;
    return {
        h: (hue + 360) % 360,
        s: from.s + (to.s - from.s) * t,
        l: from.l + (to.l - from.l) * t,
    };
}

function generatePoints(n = 3): Point[] {
    if (n < 3) {
        return Array.from({ length: n }, () => ({
            x: Math.random() * 90,
            y: Math.random() * 90,
        }));
    }

    const minAngle = (120 / n) * (Math.PI / 180);
    let points: Point[];

    do {
        points = generateRadialPoints(n, minAngle);
    } while (!isSimplePolygon(points));

    return points;
}

function generateRadialPoints(n: number, minAngle: number): Point[] {
    const totalExtra = 2 * Math.PI - n * minAngle;
    const weights = Array.from({ length: n }, () => Math.random());
    const sum = weights.reduce((acc, value) => acc + value, 0);
    const gaps = weights.map(value => (value / sum) * totalExtra + minAngle);

    const center = { x: 45, y: 45 };
    let angle = Math.random() * 2 * Math.PI;

    return gaps.map(gap => {
        angle += gap;
        const radius = 20 + Math.random() * 20;
        return {
            x: center.x + Math.cos(angle) * radius,
            y: center.y + Math.sin(angle) * radius,
        };
    });
}

function pointsToSvg(points: Point[]): string {
    return points.map(p => `${p.x},${p.y}`).join(" ");
}

function orderByAngle(points: Point[]): Point[] {
    const centroid = points.reduce(
        (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
        { x: 0, y: 0 }
    );

    const center = {
        x: centroid.x / points.length,
        y: centroid.y / points.length,
    };

    return [...points].sort((a, b) => {
        const angleA = Math.atan2(a.y - center.y, a.x - center.x);
        const angleB = Math.atan2(b.y - center.y, b.x - center.x);
        return angleA - angleB;
    });
}

function isSimplePolygon(points: Point[]): boolean {
    const n = points.length;
    if (n < 4) {
        return true;
    }

    for (let i = 0; i < n; i++) {
        const a1 = points[i];
        const a2 = points[(i + 1) % n];

        for (let j = i + 1; j < n; j++) {
            const b1 = points[j];
            const b2 = points[(j + 1) % n];

            const adjacent =
                i === j ||
                (i + 1) % n === j ||
                i === (j + 1) % n ||
                (i === 0 && j === n - 1);

            if (adjacent) {
                continue;
            }

            if (segmentsIntersect(a1, a2, b1, b2)) {
                return false;
            }
        }
    }

    return true;
}

function segmentsIntersect(p1: Point, q1: Point, p2: Point, q2: Point) {
    const orientation = (a: Point, b: Point, c: Point) => {
        const value = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
        if (Math.abs(value) < Number.EPSILON) {
            return 0;
        }
        return value > 0 ? 1 : 2;
    };

    const onSegment = (a: Point, b: Point, c: Point) =>
        Math.min(a.x, c.x) <= b.x && b.x <= Math.max(a.x, c.x) &&
        Math.min(a.y, c.y) <= b.y && b.y <= Math.max(a.y, c.y);

    const o1 = orientation(p1, q1, p2);
    const o2 = orientation(p1, q1, q2);
    const o3 = orientation(p2, q2, p1);
    const o4 = orientation(p2, q2, q1);

    if (o1 !== o2 && o3 !== o4) {
        return true;
    }

    if (o1 === 0 && onSegment(p1, p2, q1)) {
        return true;
    }
    if (o2 === 0 && onSegment(p1, q2, q1)) {
        return true;
    }
    if (o3 === 0 && onSegment(p2, p1, q2)) {
        return true;
    }
    if (o4 === 0 && onSegment(p2, q1, q2)) {
        return true;
    }

    return false;
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}