export function formatSigned(num: number) {
    if (num > 0) {
        return `+${Math.round(num)}`;
    }

    return Math.round(num).toString();
}

