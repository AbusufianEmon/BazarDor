import React from 'react';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"


interface Product {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: { dir: string; pct: number };
};

const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const toBn = (n: number) => n.toLocaleString("bn-BD");

const CHANGE_STYLE: Record<string, { sign: string; color: string }> = {
  up: { sign: "▲", color: "text-red-600" },
  down: { sign: "▼", color: "text-green-600" },
};

const FLAT = { sign: "—", color: "text-gray-500" };


const Marquee = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data: Product[] = await res.json()

    return (
        <div className="text-[10px] sm:text-xs md:text-sm bg-gray-100 py-2">
            <MarqueeText direction="right" duration={10} pauseOnHover={true}>
                {data.map((n) => {
                    const c = CHANGE_STYLE[n.change.dir] ?? FLAT;
                    return (
                        <div key={n.id} className="mx-4">
                            <span>{n.image}</span>
                            <span>{n.nameBn}</span>
                            <span className="mx-2 text-gray-700">
                                {toBn(n.today)} টাকা/ {UNIT_BN[n.unit]}
                            </span>
                            <span className={`${c.color}`}>
                                {c.sign} {toBn(Math.abs(n.change.pct))}%
                            </span>
                        
                        </div>
                    );
                    
                })}
            </MarqueeText>
            
        </div>
    );
};

export default Marquee;