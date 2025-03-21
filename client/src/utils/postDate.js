export default function postDateConvertAgo(timeStamp) { 
    const now = new Date();
    const past = new Date(timeStamp);

    const diffMS = now - past;

    const diffSec = Math.floor(diffMS / 1000)
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffMonth / 12);

    if(diffYear) return `${diffYear} year${ diffYear > 1 ? 's' : ''} ago`;
    if(diffMonth) return `${diffMonth} month${ diffMonth > 1 ? 's' : ''} ago`;
    if(diffDay) return `${diffDay} day${ diffDay > 1 ? 's' : ''} ago`;
    if(diffHr) return `${diffHr} hour${ diffHr > 1 ? 's' : ''} ago`;
    if(diffMin) return `${diffMin} minute${ diffMin > 1 ? 's' : ''} ago`;
    return "Just now"
}