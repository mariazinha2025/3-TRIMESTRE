const getCSS = (variavel) => {
    const bodyStyles = getComputedStyle(document.body);
    const value = bodyStyles.getPropertyValue(variavel).trim();

    // Retorna um valor padrão se a variável não existir
    return value || 'initial';
}

const tickConfig = {
    family: getCSS('--font') || 'sans-serif',
    size: 16,
    color: getCSS('--primary-color') || '#000'
}

export { getCSS, tickConfig };
