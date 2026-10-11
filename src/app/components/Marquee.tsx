import React from 'react';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import { Product } from '@/Types/Products';
import { toBn, UNIT_BN } from '@/Types/Format';

const CHANGE_STYLE: Record<string, { sign: string; color: string }> = {
    up: { sign: "▲", color: "text-red-600" },
    down: { sign: "▼", color: "text-green-600" },
};


const Marquee = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data: Product[] = await res.json()

    const movers = data.filter((n) => n.change.dir in CHANGE_STYLE);

    return (
        <div className="text-[10px] sm:text-xs md:text-sm py-2 border-b bg-white border-gray-300">
            <MarqueeText direction="right" duration={10} pauseOnHover={true}>
                {movers.map((n) => {
                    const c = CHANGE_STYLE[n.change.dir];
                    return (
                        <div key={n.id} className="mx-4">
                            <span className="mr-2">{n.image}</span>
                            <span>{n.nameBn}</span>
                            <span className="mx-2 text-gray-700">
                                {toBn(n.today)} টাকা/ {UNIT_BN[n.unit]}
                            </span>
                            {n.change.dir !== "flat" && (
                                <span className={c.color}>
                                    {c.sign} {toBn(Math.abs(n.change.pct))}%
                                </span>
                            )}

                        </div>
                    );

                })}
            </MarqueeText>

        </div>
    );
};

export default Marquee;