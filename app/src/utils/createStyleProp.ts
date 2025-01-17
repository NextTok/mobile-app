function createStyleProp(name: string, value?: string | number, noPx?: boolean) {
    if (value === undefined) return ``;
    if (typeof value == 'number') {
        if (noPx) {
            return `${name}: ${value};`;
        }
        return `${name}: ${value}px;`;
    } 
    return `${name}: ${value};`;
}

export default createStyleProp;