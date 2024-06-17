import { useQuery } from '@tanstack/react-query';

const fetchBreeds = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!response.ok) {
        throw new Error('Failed to fetch breeds');
    }
    const data = await response.json();
    return Object.keys(data.message);
};

export const useFetchBreeds = () => {
    return useQuery({
        queryKey: ['breeds'],
        queryFn: fetchBreeds
    });
} 