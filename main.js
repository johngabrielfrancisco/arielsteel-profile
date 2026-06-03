
document.addEventListener("DOMContentLoaded", () => {

    const today = new Date();

    const todayYear = today.getFullYear();

    document.getElementById('span-year').textContent = todayYear;


    function runClock(){
        const clockElement = document.getElementById('clockdiv');
        
        // Track when the clock next *should* tick ideally
        let expectedTime = performance.now() + 1000;

        function tick() {
            const now = new Date();

            // 1. Format text exactly as requested
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
            let timeString = now.toLocaleTimeString('en-US', timeOptions).toLowerCase();

            const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
            let dateString = now.toLocaleDateString('en-US', dateOptions);

            clockElement.textContent = `${dateString}  ${timeString}`;

            // 2. Calculate Drift
            // performance.now() measures time in microseconds, immune to system clock updates
            const drift = performance.now() - expectedTime; 
            
            // 3. Schedule next expected tick milestone
            expectedTime += 1000;

            // 4. Corrective Math: 1000ms minus the drift penalty. 
            // Ensures the next tick is pulled forward if this one lagged.
            const nextInterval = Math.max(0, 1000 - drift); 
            
            setTimeout(tick, nextInterval);
        }

        // Sync initial execution perfectly with the start of the next systemic second
        const msToNextSecond = 1000 - (Date.now() % 1000);
        setTimeout(() => {
            expectedTime = performance.now() + 1000;
            tick();
        }, msToNextSecond);
    }

    runClock();

});
