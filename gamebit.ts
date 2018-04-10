
/*
 * @file gamebit
 * @brief Laplus's game:bit makecode library.
 * @consist of one of rocker ,four button and buzzer
 * @copyright	[Labplus](http://wiki.labplus.com), 2018
 * @copyright	GNU Lesser General Public License
 * @author [tangliufeng]
 * @date  2018.4.10
 */

/**
* User Buttons for game:bit Players.
*/
//%
enum GameBitPin {
    //% block="X button"
    X_Button = 1,
    //% block="Y button"
    Y_Button = 2,
    //% block="A button"
    A_Button = 3,
    //% block="B button"
    B_Button = 4,
    //% block="START button"
    START_Button = 5,
    //% block="SELECT button"
    SELECT_Button = 6,
    //% block="ROCKER button"
    ROCKER_Button = 7,

}



/**
 * Functions for Labplus game:bit Players
 */
//% weight=10 color=#A020F0 icon="\uf11b" block="gamebit"
namespace gamebit {
    let PIN_INIT = 0;

    export enum Motor {
        //% blockId="OFF" block="off"
        OFF = 0,
        //% blockId="ON" block="on"
        ON = 1
    }

    export enum axis {
        //% blockId="x-axis" block="x-axis"
        x_axis = 0,
        //% blockId="y-axis" block="y-axis"
        y_axis = 1
    }

    function PinInit(): void {

        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P8, PinPullMode.PullNone);
        PIN_INIT = 1;
        return;
    }

    /**
       * return rocker x/y-axis analog value
       */
    //% weight=70
    //% blockId=rocker block="rocker|%index"
    export function rocker(index: axis): number {
        let value = 0;
        switch (index) {
            case 0: return  pins.analogReadPin(AnalogPin.P2); 
            case 1: return  pins.analogReadPin(AnalogPin.P1); 
            default:  break;
        }
        return value;

    }

    /**
      * return rocker y-axis analog value
      */
    //% weight=70
    //% blockId=y_axis block="y-axis value"
    export function y_axis(): number {
        return pins.analogReadPin(AnalogPin.P1);

    }

    /**
     * scan a button whether be triggered : return 'true' if pressed; return'false' if not.
     */
    //% weight=70
    //% blockId=gamebit_keyState block="|%button|is pressed"
    //% button.fieldEditor="gridpicker" button.fieldOptions.width=300  button.fieldOptions.columns=3
    export function keyState(button: GameBitPin): boolean {

        let status = false;
        let val = 0;
        if ((0 < button && button < 5) || button == 7) {
            val = pins.analogReadPin(AnalogPin.P0);

        }

        switch (button) {
            // X button
            case 1: if (val < 250 && val > 200) {
                status = true;
            } break;
            // Y button
            case 2: if (val < 50) {
                status = true;
            } break;
            // A button 
            case 3: if (val < 650 && val > 600) {
                status = true;
            } break;
            // B button 
            case 4: if (val < 450 && val > 400) {
                status = true;
            } break;
            // START button 
            case 5: if (input.buttonIsPressed(Button.A) == true) {

                status = true;
            } break;
            // SELECT button 
            case 6: if (input.buttonIsPressed(Button.B) == true) {
                status = true;

            } break;
            // ROCKER button 
            case 7: if (val < 850 && val > 800) {
                status = true;

            } break;

            default:
                break;

        }
        return status;
    }

    /**
    * vibrator Motor switch.
    */
    //% weight=20
    //% blockId=gamebit_Motor block="vibratorMotor|%index|"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2 index.fieldOptions.width=200
    export function vibratorMotor(index: Motor): void {
        if (!PIN_INIT) {
            PinInit();
        }
        pins.digitalWritePin(DigitalPin.P16, <number>index);
    }

    /**
      * buzzer Emits a Pulse-width modulation (PWM) signal to the  pin8 
      * @param frequency frequency to modulate in Hz. eg:1000
      * @param ms duration of the pitch in milli seconds.     eg:1000
      */
    //% blockId=buzzer_pitch block="buzzer pitch %frequency|for (ms) %ms"
    //% weight=4  blockGap=8
    export function BuzzerPitch(frequency: number, ms: number): void {

        pins.analogSetPitchPin(AnalogPin.P8);
        pins.analogPitch(frequency, ms);
    }
}
