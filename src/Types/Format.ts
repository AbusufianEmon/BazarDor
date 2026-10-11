export const UNIT_BN: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

export const toBn = (n: number) => n.toLocaleString("bn-BD");