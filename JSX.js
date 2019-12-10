const jsx = {
    onBreak:  `
        <h2 class="modal-title display-4 mx-auto mt-3">It's time to work!</h2>
        <p class="modal-body mx-auto">Keep on the good work after that nice break!</p>
        <div class="mx-auto mb-3">
        <button class="btn btn-outline-success continue">Keep going!</button>
        </div>`,
    workSessionComplete: `
        <h2 class="modal-title display-4 mx-auto mt-3">It's time for a long break!</h2>
        <p class="modal-body mx-auto">Go walk for a bit, get something to eat or just stretch it out! You've earned it!</p>
        <div class="mx-auto mb-3">
            <button class="btn btn-outline-primary break">Long Break</button>
        </div>`,
    workSessionInomplete: `
        <h2 class="modal-title display-4 mx-auto mt-3">It's time for a short break!</h2>
        <p class="modal-body mx-auto">Go get a coffee or a snack, walk a bit or would you like to keep going?</p>
        <div class="mx-auto mb-3">
            <button class="btn btn-outline-primary break">Break</button>
            <button class="btn btn-outline-success continue">Keep going!</button>
        </div>`,
    playSVG: `
        <svg width="40" height="52" viewBox="-5 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 26L0.750001 51.1147L0.750004 0.885262L36 26Z" fill="#000"/>
        </svg>`,
    pauseSvg: `
        <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H13.2174V42H0V0Z" fill="#313131"/>
        <path d="M18.7826 0H32V42H18.7826V0Z" fill="#313131"/>
        </svg>`,
}

export default jsx