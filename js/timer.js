export default class Timer{
    constructor(root){
        root.innerHTML = Timer.getHTML();

        this.el ={
            minutes: root.querySelector(".timer_min"),
            seconds: root.querySelector(".timer_sec"),
            control: root.querySelector(".timer__btn__control"),
            reset: root.querySelector(".timer__btn__reset")
        };
        this.interval= null;
        this.remainingSeconds = 0;

        this.updateInterfaceTime();
        this.updateInterfaceControlls();

        this.el.control.addEventListener("click",()=>{
            if(this.interval === null){
                this.start();
            }else{
                this.stop();
            }
        });
        this.el.reset.addEventListener("click",()=>{
            const inputMinutes =prompt("Enter number of minutes:");
            if(inputMinutes<120){  
                this.stop();
                this.remainingSeconds= inputMinutes * 60;
                this.updateInterfaceTime();
            }
        });
    }

    updateInterfaceTime(){
        const minutes = Math.floor(this.remainingSeconds/60);
        const seconds = this.remainingSeconds%60;
        this.el.minutes.textContent = minutes.toString().padStart(2,'0');
        this.el.seconds.textContent = seconds.toString().padStart(2,'0');
    }
    updateInterfaceControlls(){
        if (this.interval === null){
            this.el.control.innerHTML=`<span class="material-icons">play_arrow</span>`
            this.el.control.classList.add("timer__btn__start");
            this.el.control.classList.remove("timer__btn__stop");
        }else{
            this.el.control.innerHTML=`<span class="material-icons">pause</span>`
            this.el.control.classList.add("timer__btn__stop");
            this.el.control.classList.remove("timer__btn__start");
        }
    }
    start(){
        if(this.remainingSeconds === 0) return;
        this.interval = setInterval(()=>{
            this.remainingSeconds--;
            this.updateInterfaceTime();
            if(this.remainingSeconds===0){
                this.stop();
            }
        },1000);
        this.updateInterfaceControlls();
    }
    stop(){
        clearInterval(this.interval);

        this.interval=null;
        this.updateInterfaceControlls();
    }
    static getHTML(){
        return `
        <div class="time">
            <span class="timer_part timer_min">00</span>
            <span class="timer_part">:</span>
            <span class="timer_part timer_sec">00</span>
        </div>
        <div class="time_btn">
            <button type="button" class="timer__btn timer__btn__control timer__btn__start">
                <span class="material-icons">play_arrow</span>
            </button>
            <button type="button" class="timer__btn timer__btn__reset">
                <span class="material-icons">
                    timer
                    </span>
            </button>
        </div>
        `;
    }
}