import { addDays } from 'date-fns';
import { Platform } from 'react-native';

// # Tratando caso especifico de atraso no IPHONE
export function getPlatformDate(date: Date){
    if(Platform.OS == 'ios'){
        return addDays(date, 1);
    }
    else{
        return date;
    }
}