export class Scan {

    constructor() {
        this.codeReader = new ZXing.BrowserMultiFormatReader();
        this.devices = this.getInputDevices();
    }

    getCodeReader() {
        return this.codeReader;
    }

    getInputDevices() {
        const devices = [];
        this.codeReader.listVideoInputDevices().then(videoInputDevices => {
            videoInputDevices.forEach(videoInputDevice => {
                devices.push({id : videoInputDevice.deviceId}); 
            })
        }).catch(() => {
            return [];
        })
        return devices;
    }

    getDevices() {
        return this.devices;
    }

    tieneCamara() {
        return this.devices.length > 0;
    }

    tieneCamaraTrasera() {
        return this.devices.length > 1;
    }

   escanear(videoIdHtml,deviceId) {
       if (this.tieneCamara() ) {
           return new Promise((resolve,reject) => {
               const codeReader = this.getCodeReader();
               codeReader.decodeFromVideoDevice(deviceId,videoIdHtml, (result,error) => {
                    if (result) {
                        return resolve(result);
                    }
                    if (error && !(error instanceof ZXing.NotFoundException)) {
                        return reject(error);
                    }
               })
           })
       }
   }

   escanearPorCamaraFrontal(videoIdHtml) {
       if (this.tieneCamara() ) {
           const deviceIdFrontal = this.getDevices()[0].id;
           this.escanear(videoIdHtml,deviceIdFrontal).then(response => {
            return response;
           }).catch(error => {   
            return error;
           })
       }
   }

   escanearPorCamaraTrasera(videoIdHtml) {
    if (this.tieneCamara() && this.tieneCamaraTrasera() ) {
        const deviceIdTrasera = this.getDevices()[1].id;
        this.escanear(videoIdHtml,deviceIdTrasera).then(response => { 
        return response;
        }).catch(error => {    
        return error;
        })
    }
   }



    reset() {
        const codeReader = this.getCodeReader();
        codeReader.reset();
    }
    
 
}


