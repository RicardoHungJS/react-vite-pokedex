export const fetchHelper = async (url: string) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: 'Error al cargar los datos.' };
    }
};