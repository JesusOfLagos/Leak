import { Gpio } from 'onoff';  

const sensorPin = new Gpio(4, 'in', 'both'); 

export const getSensorData = async () => {
    return new Promise((resolve, reject) => {
        sensorPin.read((err, value) => {
            if (err) {
                reject(err);
            }
            resolve({ isLeaking: value === 1 });
        });
    });
};

export const alertLeak = async () => {
    console.log('Leak detected! Triggering alert...');
};
