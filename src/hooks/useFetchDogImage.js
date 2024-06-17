import { useQuery } from '@tanstack/react-query';

const fetchDogImage = async ({ queryKey }) => {
    const breed = queryKey[1];
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    if (!response.ok) {
        throw new Error('Failed to fetch dog image');
    }
    const data = await response.json();
    return data.message;
};

export const useFetchDogImage = (selectedBreed) => {
    return useQuery({
        queryKey: ['dogImage', selectedBreed],
        queryFn: fetchDogImage,
        enabled: !!selectedBreed
    });
};  