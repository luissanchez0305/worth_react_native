export const getDateFormat = (date) => {      
    var dd = String(date.getUTCDate()).padStart(2, '0');
    var mm = String(date.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getUTCFullYear();

    return `${yyyy}-${mm}-${dd}`;
}

export const cleanPrice = (data) => {
    if(data.ticker){
        const change = parseFloat((1 - data.results[0].c / data.results[0].o)*100).toFixed(2);
        return {
            title: String(data.ticker).replace('C:',''),
            price: Number(parseFloat(data.results[0].c).toFixed(4)),
            change: Math.abs(change),
            isGain: (data.results[0].c - data.results[0].o) > 0,
        }
    }
    else {
        const change = parseFloat((1 - data.closingTrades[0].p / data.openTrades[0].p)*100).toFixed(2);
        return {
            title: String(data.symbol).replace('-',''),
            price: data.closingTrades[0].p,
            change: Math.abs(change),
            isGain: (data.closingTrades[0].p - data.openTrades[0].p) > 0,
        }
    }
}

export const cleanVideo  = (data) => {
    const snippet = data['snippet']
    const imageUrl = snippet.thumbnails.medium.url;
    
    return {
        image: imageUrl,
        title: snippet.title,
        videoId: data.id.videoId,
        description: snippet.description,
        tag: "#tag #tag",
        channel: "Canal Youtube",
    }
}