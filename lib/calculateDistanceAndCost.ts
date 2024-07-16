export  const calculateDistanceAndCost = ({lat1, lon1, lat2, lon2}: {lat1: number , lon1: number, lat2: number, lon2:number}) => {

    if(!lat1||!lat2 || !lon1 || !lon2) {
        return null;
    }
    const R = 6371; // Radius of the Earth in kilometers
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);
    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; 
    const distanceInKm = `${Math.ceil(distance)}km`
    let cost = 20;
    distance > 100 ? cost = 50 : distance > 40 ? cost = 30: '';
    return {distance, distanceInKm, cost};
}

function toRadians(degrees:number) {
    return degrees * Math.PI / 180;
}
