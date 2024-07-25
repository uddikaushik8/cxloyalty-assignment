export class SharedUtils {
  public static convertTo24Hour(time: string): number {
    const [hour, modifier] = time.split(/(am|pm)/);
    let [hours, minutes] = hour.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'pm') {
      hours = String(parseInt(hours, 10) + 12);
    }
    return parseInt(hours + minutes, 10);
  }

  public static getDurationInMinutes(duration: string): number {
    const [hours, minutes] = duration.split(' ').map((d) => parseInt(d, 10));
    return hours * 60 + minutes;
  }
}
