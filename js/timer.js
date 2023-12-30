class Timer {
    constructor(timerBlock) {
        this.hoursEl = timerBlock.querySelector('.clock-face.hours');
        this.minutesEl = timerBlock.querySelector('.clock-face.minutes');
        this.secondsEl = timerBlock.querySelector('.clock-face.seconds');
        this.endTime = null;
        this.frameRequest = null;
    }

    start(duration) {
        this.endTime = Date.now() + duration;
        this.frameRequest = requestAnimationFrame(this.update.bind(this));
    }

    update() {
        const currentTime = Date.now();
        const remaining = this.endTime - currentTime;

        if (remaining <= 0) {
            this.stop();
            this.updateDisplay(0, 0, 0);
            return;
        }

        const hours = Math.floor(remaining / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

        this.updateDisplay(hours, minutes, seconds);
        this.frameRequest = requestAnimationFrame(this.update.bind(this));
    }

    updateDisplay(hours, minutes, seconds) {
        this.hoursEl.textContent = String(hours).padStart(2, '0');
        this.minutesEl.textContent = String(minutes).padStart(2, '0');
        this.secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    stop() {
        if (this.frameRequest) {
            cancelAnimationFrame(this.frameRequest);
            this.frameRequest = null;
        }
    }
}

export default Timer;
