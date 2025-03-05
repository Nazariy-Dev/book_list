import moment from "moment-timezone";

export function redirect(url: string) {
    window.history.pushState(null, '', url)
    window.dispatchEvent(new PopStateEvent("popstate", { state: history.state }));
}

export  function toCurrentTimeZone (date: string){
    const userTimezone = moment.tz.guess();
    return moment(date).tz(userTimezone).format('D MMMM YYYY, H:mmA');
}
