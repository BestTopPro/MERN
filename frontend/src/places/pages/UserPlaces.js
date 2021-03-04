import React from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';

const Dummy_Places = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world',
        imageUrl: 'https://pbs.twimg.com/profile_images/1272532349151072262/kBEZiWIQ.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.5678239,
            lng: -67.234883
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world',
        imageUrl: 'https://pbs.twimg.com/profile_images/1272532349151072262/kBEZiWIQ.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.5678239,
            lng: -67.234883
        },
        creator: 'u2'
    },
]

const UserPlaces = () =>{
    const userId = useParams().userId;
    const loadedPlaces = Dummy_Places.filter(place=> place.creator === userId);
    return <PlaceList items={loadedPlaces} />
}

export default UserPlaces;