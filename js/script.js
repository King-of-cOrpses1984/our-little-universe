
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // CHAPTER / PAGE NAVIGATION
    // =====================================

    const pages = Array.from(
        document.querySelectorAll(
            ".hero, .story-section, .chapter-placeholder"
        )
    );

    const pageMap = new Map();

    pages.forEach((page, index) => {
        pageMap.set(page.id, page);
        page.classList.remove("chapter-active");

        page.setAttribute(
            "aria-hidden",
            index === 0 ? "false" : "true"
        );
    });

    console.log("Registered pages:", [...pageMap.keys()]);
    console.log("Playroom found:", pageMap.has("playroom"));


    function showPage(id) {
    const nextPage = pageMap.get(id);

    if (!nextPage) return;

    pages.forEach(page => {
        page.classList.remove("chapter-active");
        page.setAttribute("aria-hidden", "true");
    });

    nextPage.classList.add("chapter-active");
    nextPage.setAttribute("aria-hidden", "false");

    nextPage.scrollTop = 0;
    window.scrollTo(0, 0);

    history.replaceState(null, "", "#" + id);
    }

    document.addEventListener("click", event => {
        const link = event.target.closest('a[href^="#"]');

        if (!link) return;

        const id = link.getAttribute("href").substring(1);

        if (pageMap.has(id)) {
            event.preventDefault();
            showPage(id);
        }
    });

    const startingId = window.location.hash.substring(1);

    if (pageMap.has(startingId)) {
        showPage(startingId);
    } else if (pages.length) {
        showPage(pages[0].id);
    }


    // =====================================
    // NEW YEAR 2027 COUNTDOWN
    // =====================================

    const targetDate = new Date(
        "2027-01-01T00:00:00+05:30"
    ).getTime();

    function updateCountdown() {

        const countdown = document.getElementById("countdown");
        const note = document.getElementById("countdownNote");

        if (!countdown || !note) return;

        const difference = targetDate - Date.now();

        if (difference <= 0) {

            countdown.innerHTML = `
                <div class="timebox"><b>00</b><span>Days</span></div>
                <div class="timebox"><b>00</b><span>Hours</span></div>
                <div class="timebox"><b>00</b><span>Minutes</span></div>
                <div class="timebox"><b>00</b><span>Seconds</span></div>
            `;

            note.textContent = "A beautiful new chapter begins ♡";
            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        const values = [days, hours, minutes, seconds];

        const boxes = countdown.querySelectorAll(".timebox b");

        boxes.forEach((box, index) => {
            if (values[index] !== undefined) {
                box.textContent = String(values[index]).padStart(2, "0");
            }
        });

        note.textContent = "Counting down to our new chapter ♡";
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    // =====================================
    // GALAXY / PLANET INTERACTIONS
    // =====================================

    const galaxy = document.getElementById("magic");

    if (!galaxy) return;

    const planets = galaxy.querySelectorAll(".planet");

    const planetarium = document.getElementById("planetarium");
    const hint = document.getElementById("planetariumHint");

    const reveal = document.getElementById("planetReveal");
    const growingStar = document.getElementById("growingStar");

    const message = document.getElementById("planetMessage");
    const messageTitle = document.getElementById("planetMessageTitle");
    const messageText = document.getElementById("planetMessageText");

    const backButton = document.getElementById("backToPlanets");
    const continueButton = document.getElementById("heartContinue");
    const exitButton = document.getElementById("galaxyExit");

    // Check that all required galaxy elements exist
    if (
        !planetarium ||
        !hint ||
        !reveal ||
        !growingStar ||
        !message ||
        !messageTitle ||
        !messageText ||
        !backButton ||
        !continueButton ||
        !exitButton
    ) {
        console.error("Some galaxy HTML elements are missing.");
        return;
    }

    let heartTimer = null;
    let currentPlanet = null;


    // =====================================
    // SEVEN PLANETS — THEIR SECRET MESSAGES
    // =====================================

    const planetMessages = {

        // 1. MOON
        moon: {
            title: "The Way You Changed My World ♡",

            text: `It's funny how one person can become such an important part of your world without even realising it.

Somewhere along the way, you became someone I look forward to talking to, someone whose messages can change the mood of an ordinary day, and someone who crosses my mind even when I'm busy doing a hundred other things.

I don't think you realise how much happiness can hide inside the smallest moments.

And if there's one thing I want you to know, it's this: having you as a part of my world has made it a little more beautiful.`
        },


        // 2. VENUS
        venus: {
            title: "The Person You Are ♡",

            text: `If someone asked me what makes you special, I don't think I could give them just one answer.

It's not about being perfect. It's about being you.

Your own way of thinking, your personality, your little expressions, the way you see things, and all those tiny details that make you different from everyone else.

I hope you never feel like you have to become someone else to be appreciated.

Because the person I want to know more about, understand more deeply, and keep discovering is simply YOU.

Never forget how special you are.`
        },


        // 3. STARLIGHT
        starlight: {
            title: "The Little Things ✨",

            text: `Maybe the best parts of life aren't always the big moments.

Sometimes they're just a random message, a silly conversation, an unexpected laugh, a little update about your day, or simply knowing that there's someone you can talk to.

Those little things might look ordinary to everyone else.

But somehow, they become the moments I want to keep.

I hope we never stop collecting these tiny pieces of happiness. Even the most ordinary days can become beautiful when we have something worth remembering in them.`
        },


        // 4. ROSE
        rose: {
            title: "Things Words Cannot Explain 🌹",

            text: `There are feelings that are easy to explain, and then there are feelings that make you search for the right words and still come up short.

Sometimes I may not know exactly how to express what you mean to me.

Sometimes a simple sentence won't be enough to describe how much a moment matters.

But I hope you can find those feelings in the little things I do, in the effort I make, and in the way I try to understand you.

Not every beautiful feeling needs a perfect explanation.

Some things are simply meant to be felt.`
        },


        // 5. SATURN
        saturn: {
            title: "A Few Things I Promise 🪐",

            text: `I don't want to make a hundred promises just because they sound beautiful.

I'd rather promise you things that actually matter.

I promise to be honest with you, even when a conversation is difficult.

I promise to respect your feelings, your space, and the person you are.

I promise to keep learning how to understand you better instead of assuming I already know everything.

I promise that we don't have to be perfect. We can make mistakes, learn, communicate, and grow.

And most importantly, I want my actions to mean more than the promises written on this little planet.`
        },


        // 6. DREAM
        dream: {
            title: "A Thousand Tomorrows ✨",

            text: `There's so much of life still waiting to happen.

Places we haven't visited, photographs we haven't taken, conversations we haven't had, sunsets we haven't watched, and countless little memories we haven't even imagined yet.

I don't know exactly what every tomorrow will look like.

But I know I'd love to keep discovering it with you, one step at a time.

I want us to have stories that we'll look back at someday and smile about.

Not because every day was perfect, but because we made something meaningful out of the days we were given.

Here's to all the little tomorrows waiting for us.`
        },


        // 7. HEART — THE FINAL PLANET
        heart: {
            title: "My Favourite Universe ♡",

            text: `Out of all the stars, planets, and endless possibilities in this universe, there's one person who has become incredibly special to me.

And that's you, Arryamol.

This little universe isn't really about planets or stars. It's about all the feelings, memories, hopes, and little moments that make our story ours.

I made this because sometimes a simple message doesn't feel enough to express everything I want you to know.

I don't know what every chapter ahead will hold, but I hope we keep making memories worth remembering, keep understanding each other, and keep finding happiness in the little things.

If this universe has a favourite place, it's wherever a beautiful memory of us lives.

And if it has a favourite person...

Well, you already know. ♡`
        }

    };


    // =====================================
    // CLEAR HEART TIMER
    // =====================================

    function clearHeartTimer() {

        if (heartTimer !== null) {
            clearTimeout(heartTimer);
            heartTimer = null;
        }

    }


    // =====================================
    // OPEN A PLANET
    // =====================================

    function openPlanet(planetName) {

        const planetData = planetMessages[planetName];

        if (!planetData) return;

        clearHeartTimer();

        currentPlanet = planetName;

        // Reset previous reveal
        reveal.hidden = false;

        reveal.classList.remove("reveal-active");
        message.classList.remove("message-visible");
        growingStar.classList.remove("star-growing");

        continueButton.hidden = true;
        continueButton.classList.remove("continue-visible");

        // Set the selected planet's message
        messageTitle.textContent = planetData.title;
        messageText.textContent = planetData.text;

        // Reset message scrolling
        message.scrollTop = 0;

        // Hide the galaxy behind the reveal
        planetarium.style.opacity = "0";
        planetarium.style.pointerEvents = "none";

        hint.style.opacity = "0";
        hint.style.pointerEvents = "none";

        // Trigger the animations again
        void reveal.offsetWidth;

        reveal.classList.add("reveal-active");
        growingStar.classList.add("star-growing");
        message.classList.add("message-visible");


        // =================================
        // HEART PLANET — FINAL REVEAL
        // =================================

        if (planetName === "heart") {

            // Give her time to read the final message
            heartTimer = setTimeout(() => {

                if (currentPlanet !== "heart") return;

                continueButton.hidden = false;

                requestAnimationFrame(() => {
                    continueButton.classList.add("continue-visible");
                });

            }, 8000);

        }

    }


    // =====================================
    // PLANET CLICK EVENTS
    // =====================================

    planets.forEach(planet => {

        planet.addEventListener("click", () => {

            const planetName = planet.dataset.planet;

            openPlanet(planetName);

        });

    });


    // =====================================
    // RETURN TO GALAXY
    // =====================================

    backButton.addEventListener("click", () => {

        clearHeartTimer();

        currentPlanet = null;

        reveal.classList.remove("reveal-active");
        message.classList.remove("message-visible");
        growingStar.classList.remove("star-growing");

        continueButton.hidden = true;
        continueButton.classList.remove("continue-visible");

        reveal.hidden = true;

        // Bring the galaxy back
        planetarium.style.opacity = "1";
        planetarium.style.pointerEvents = "auto";

        hint.style.opacity = "1";
        hint.style.pointerEvents = "auto";

    });


    // =====================================
    // HEART — CONTINUE TO NEXT CHAPTER
    // =====================================

    continueButton.addEventListener("click", () => {

        if (currentPlanet !== "heart") return;

        clearHeartTimer();

        currentPlanet = null;

        showPage("playroom");

    });


    // =====================================
    // EXIT GALAXY
    // =====================================

    exitButton.addEventListener("click", () => {

        clearHeartTimer();

        currentPlanet = null;

        showPage("little-things");

    });

    
    // =====================================
    // CHAPTER 05 — OPEN THE CINEMATIC LETTER
    // =====================================

    const letterScene = document.getElementById("letterScene");
    const openLetterButton = document.getElementById("openLetter");
    const letterPaper = document.getElementById("letterPaper");
    const letterScroll = document.getElementById("letterScroll");

    if (letterScene && openLetterButton && letterPaper) {

        openLetterButton.addEventListener("click", () => {

            // Open the envelope
            letterScene.classList.add("is-open");

            // Update accessibility states
            openLetterButton.setAttribute("aria-expanded", "true");
            letterPaper.setAttribute("aria-hidden", "false");

            // Start reading from the beginning
            if (letterScroll) {
                letterScroll.scrollTop = 0;
            }

        });

    }

    
// =========================================
// OUR LITTLE THINGS — SCRAPBOOK INTERACTIONS
// =========================================

const scrapbookCover = document.getElementById("scrapbookCover");
const openScrapbook = document.getElementById("openScrapbook");
const scrapbookBook = document.getElementById("scrapbookBook");
const closeScrapbook = document.getElementById("closeScrapbook");

const scrapbookPages = Array.from(
    document.querySelectorAll(".scrapbook-page")
);

const bookPrevious = document.getElementById("bookPrevious");
const bookNext = document.getElementById("bookNext");
const bookDots = document.getElementById("bookDots");
const scrapbookPageNumber = document.getElementById("scrapbookPageNumber");

let currentBookPage = 0;



function showScrapbookPage(index) {
    if (!scrapbookPages.length) return;

    const previousPage = currentBookPage;

    currentBookPage = Math.max(
        0,
        Math.min(index, scrapbookPages.length - 1)
    );

    const isNext = currentBookPage > previousPage;

    scrapbookPages.forEach((page, i) => {
        page.classList.remove(
            "active",
            "page-turn-next",
            "page-turn-previous"
        );

        if (i === currentBookPage) {
            page.classList.add("active");
        }
    });

    const activePage = scrapbookPages[currentBookPage];

    // Restart the page-turn animation
    void activePage.offsetWidth;

    activePage.classList.add(
        isNext ? "page-turn-next" : "page-turn-previous"
    );

    // Update page number
    if (scrapbookPageNumber) {
        scrapbookPageNumber.textContent =
            `${String(currentBookPage + 1).padStart(2, "0")} / ${String(scrapbookPages.length).padStart(2, "0")}`;
    }

    // Update Previous and Next buttons
    if (bookPrevious) {
        bookPrevious.disabled = currentBookPage === 0;
    }

    if (bookNext) {
        bookNext.disabled =
            currentBookPage === scrapbookPages.length - 1;
    }

    // Update page dots
    if (bookDots) {
        bookDots.querySelectorAll("button").forEach((dot, i) => {
            dot.classList.toggle(
                "active",
                i === currentBookPage
            );
        });
    }

    // Wait for the page-turn animation before resetting scroll
    let scrollResetDone = false;

    function resetBookScroll() {
        if (scrollResetDone) return;
        scrollResetDone = true;

        scrapbookBook.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        const section = document.getElementById("little-things");

        if (section && scrapbookBook) {
            const sectionRect = section.getBoundingClientRect();
            const bookRect = scrapbookBook.getBoundingClientRect();

            const targetPosition =
                section.scrollTop +
                bookRect.top -
                sectionRect.top - 12;

            section.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    }

    activePage.addEventListener(
        "animationend",
        resetBookScroll,
        { once: true }
    );

    // Fallback in case the animation event doesn't fire
    setTimeout(resetBookScroll, 900);
}



// Create page indicator dots
if (bookDots && scrapbookPages.length) {
    bookDots.innerHTML = "";

    scrapbookPages.forEach((page, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.setAttribute("aria-label", `Open scrapbook page ${index + 1}`);

        dot.addEventListener("click", () => {
            showScrapbookPage(index);
        });

        bookDots.appendChild(dot);
    });
}


// Open scrapbook with cover animation
if (openScrapbook && scrapbookCover && scrapbookBook) {
    openScrapbook.addEventListener("click", () => {
        scrapbookCover.classList.add("cover-opening");

        setTimeout(() => {
            scrapbookCover.hidden = true;
            scrapbookCover.classList.remove("cover-opening");

            scrapbookBook.hidden = false;
            scrapbookBook.classList.remove("book-opening");

            void scrapbookBook.offsetWidth;
            scrapbookBook.classList.add("book-opening");

            showScrapbookPage(0);
            scrapbookBook.scrollTop = 0;
        }, 750);
    });
}


// Previous page
if (bookPrevious) {
    bookPrevious.addEventListener("click", () => {
        showScrapbookPage(currentBookPage - 1);
    });
}

// Next page
if (bookNext) {
    bookNext.addEventListener("click", () => {
        showScrapbookPage(currentBookPage + 1);
    });
}

// Close scrapbook and return to cover
if (closeScrapbook && scrapbookCover && scrapbookBook) {
    closeScrapbook.addEventListener("click", () => {
        scrapbookBook.hidden = true;
        scrapbookCover.hidden = false;
        currentBookPage = 0;
    });
}

// Reveal little notes
document.querySelectorAll(".notice-note").forEach(note => {
    note.addEventListener("click", () => {
        note.classList.toggle("note-open");
    });
});

// Highlight nicknames when clicked
document.querySelectorAll(".nickname-item").forEach(nickname => {
    nickname.addEventListener("click", () => {
        nickname.classList.toggle("nickname-selected");
    });
});

// Reveal Polaroid captions
document.querySelectorAll(".little-polaroid").forEach(polaroid => {
    polaroid.addEventListener("click", () => {
        polaroid.classList.toggle("polaroid-open");
    });
});

// Unfold future notes
document.querySelectorAll(".future-note").forEach(note => {
    note.addEventListener("click", () => {
        note.classList.toggle("note-unfolded");
    });
});

// Start with the cover visible and book hidden
if (scrapbookCover && scrapbookBook) {
    scrapbookCover.hidden = false;
    scrapbookBook.hidden = true;
}



/* =========================================
   OUR LITTLE BUCKET LIST — INTERACTIONS
========================================= */

const futureItems = Array.from(
    document.querySelectorAll("#little-things .future-item")
);

const futureProgressFill = document.getElementById("futureProgressFill");
const futureProgressText = document.getElementById("futureProgressText");

let celebrationPlayed = false;

function createBucketCelebration() {
    if (celebrationPlayed) return;
    celebrationPlayed = true;

    const celebration = document.createElement("div");
    celebration.className = "bucket-celebration";
    celebration.setAttribute("aria-hidden", "true");

    const colours = [
        "#ef9fbd", "#c5a4e8", "#f6d18c",
        "#9fd7bd", "#a8c9ef", "#f5a98d"
    ];

    // Falling confetti
    for (let i = 0; i < 130; i++) {
        const piece = document.createElement("span");
        piece.className = "celebration-piece";

        piece.style.setProperty("--left", Math.random() * 100 + "%");
        piece.style.setProperty("--size", (5 + Math.random() * 8) + "px");
        piece.style.setProperty("--duration", (3 + Math.random() * 3) + "s");
        piece.style.setProperty("--delay", Math.random() * 1.5 + "s");
        piece.style.setProperty("--drift", (Math.random() * 300 - 150) + "px");
        piece.style.setProperty(
            "--piece-color",
            colours[Math.floor(Math.random() * colours.length)]
        );

        celebration.appendChild(piece);
    }

    // Floating balloons
    for (let i = 0; i < 12; i++) {
        const balloon = document.createElement("span");
        balloon.className = "celebration-balloon";

        balloon.style.setProperty("--left", Math.random() * 95 + "%");
        balloon.style.setProperty("--duration", (5 + Math.random() * 3) + "s");
        balloon.style.setProperty("--delay", Math.random() * 2 + "s");
        balloon.style.setProperty(
            "--balloon-color",
            colours[Math.floor(Math.random() * colours.length)]
        );

        celebration.appendChild(balloon);
    }

    // Floating ribbons
    for (let i = 0; i < 22; i++) {
        const ribbon = document.createElement("span");
        ribbon.className = "celebration-ribbon";

        ribbon.style.setProperty("--left", Math.random() * 100 + "%");
        ribbon.style.setProperty("--duration", (3 + Math.random() * 3) + "s");
        ribbon.style.setProperty("--delay", Math.random() * 2 + "s");
        ribbon.style.setProperty(
            "--ribbon-color",
            colours[Math.floor(Math.random() * colours.length)]
        );

        celebration.appendChild(ribbon);
    }

    document.body.appendChild(celebration);

    setTimeout(() => celebration.remove(), 9500);
}

function updateFutureProgress() {
    const selectedCount = futureItems.filter(
        item => item.querySelector("input").checked
    ).length;

    const total = futureItems.length;
    const percentage = total ? (selectedCount / total) * 100 : 0;

    if (futureProgressText) {
        futureProgressText.textContent = `${selectedCount} / ${total} chosen`;
    }

    if (futureProgressFill) {
        futureProgressFill.style.height = percentage + "%";
        futureProgressFill.style.width = percentage + "%";
    }

    futureItems.forEach(item => {
        const checkbox = item.querySelector("input");
        item.classList.toggle("is-selected", checkbox.checked);
    });

    if (selectedCount === total && total > 0) {
        createBucketCelebration();
    } else {
        celebrationPlayed = false;
    }
}

futureItems.forEach(item => {
    const checkbox = item.querySelector("input");

    if (checkbox) {
        checkbox.addEventListener("change", updateFutureProgress);
    }
});

updateFutureProgress();


/* =========================================
   NEW YEAR 2027 TIME LOCK
========================================= */

// TEST MODE:
// true  = show the passcode immediately for testing
// false = wait until 1 January 2027, 12 AM IST

const LOCK_TEST_MODE = true;

const lockTargetDate = new Date(
    "2027-01-01T00:00:00+05:30"
).getTime();

const timeLock = document.getElementById("timeLock");
const lockCountdown = document.getElementById("lockCountdown");
const passcodeArea = document.getElementById("passcodeArea");
const passcodeForm = document.getElementById("passcodeForm");
const passcodeError = document.getElementById("passcodeError");
const passcodeBoxes = Array.from(
    document.querySelectorAll(".passcode-digit")
);

const lockDays = document.getElementById("lockDays");
const lockHours = document.getElementById("lockHours");
const lockMinutes = document.getElementById("lockMinutes");
const lockSeconds = document.getElementById("lockSeconds");

let lockInterval;

// -----------------------------------------
// ALREADY UNLOCKED CHECK
// -----------------------------------------

if (
    !LOCK_TEST_MODE &&
    localStorage.getItem("olu_unlocked_2027") === "yes"
) {
    if (timeLock) {
        timeLock.style.display = "none";
    }
}

// -----------------------------------------
// COUNTDOWN
// -----------------------------------------

function updateLockCountdown() {

    if (!timeLock || timeLock.style.display === "none") {
        return;
    }

    const now = Date.now();
    const difference = lockTargetDate - now;

    if (LOCK_TEST_MODE) {
        if (lockCountdown) {
            lockCountdown.style.display = "none";
        }

        if (passcodeArea) {
            passcodeArea.hidden = false;
        }

        return;
    }

    if (difference <= 0) {

        if (lockCountdown) {
            lockCountdown.style.display = "none";
        }

        if (passcodeArea) {
            passcodeArea.hidden = false;
        }

        if (passcodeBoxes[0] && !passcodeBoxes.some(box => box.value)) {
            passcodeBoxes[0].focus();
        }

        clearInterval(lockInterval);
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    if (lockDays) lockDays.textContent = String(days).padStart(3, "0");
    if (lockHours) lockHours.textContent = String(hours).padStart(2, "0");
    if (lockMinutes) lockMinutes.textContent = String(minutes).padStart(2, "0");
    if (lockSeconds) lockSeconds.textContent = String(seconds).padStart(2, "0");
}

updateLockCountdown();
lockInterval = setInterval(updateLockCountdown, 1000);

// -----------------------------------------
// EIGHT DIGIT INPUT
// -----------------------------------------

passcodeBoxes.forEach((box, index) => {

    box.addEventListener("input", () => {

        const digits = box.value.replace(/\D/g, "");

        box.value = digits.slice(-1);

        if (box.value && index < passcodeBoxes.length - 1) {
            passcodeBoxes[index + 1].focus();
        }

        if (passcodeError) {
            passcodeError.textContent = "";
        }
    });

    box.addEventListener("keydown", (event) => {

        if (
            event.key === "Backspace" &&
            !box.value &&
            index > 0
        ) {
            passcodeBoxes[index - 1].focus();
        }

        if (event.key === "ArrowLeft" && index > 0) {
            passcodeBoxes[index - 1].focus();
        }

        if (
            event.key === "ArrowRight" &&
            index < passcodeBoxes.length - 1
        ) {
            passcodeBoxes[index + 1].focus();
        }
    });

    // Paste a complete date into any box
    box.addEventListener("paste", (event) => {

        event.preventDefault();

        const pastedText = (
            event.clipboardData || window.clipboardData
        ).getData("text");

        const digits = pastedText.replace(/\D/g, "").slice(0, 8);

        passcodeBoxes.forEach((input, i) => {
            input.value = digits[i] || "";
        });

        const nextEmpty = passcodeBoxes.find(input => !input.value);

        if (nextEmpty) {
            nextEmpty.focus();
        } else if (passcodeBoxes[7]) {
            passcodeBoxes[7].focus();
        }

        if (passcodeError) {
            passcodeError.textContent = "";
        }
    });

});

// -----------------------------------------
// CHECK THE DATE
// -----------------------------------------

if (passcodeForm) {

    passcodeForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const enteredCode = passcodeBoxes
            .map(box => box.value)
            .join("");

        if (enteredCode.length !== 8) {

            if (passcodeError) {
                passcodeError.textContent =
                    "Fill in all eight little boxes ♡";
            }

            const firstEmpty = passcodeBoxes.find(box => !box.value);

            if (firstEmpty) firstEmpty.focus();

            return;
        }

        if (enteredCode === "14092026") {

            if (passcodeError) {
                passcodeError.textContent = "";
            }

            // Save successful unlock outside testing mode
            if (!LOCK_TEST_MODE) {
                localStorage.setItem("olu_unlocked_2027", "yes");
            }

            // Reveal the actual website
            if (timeLock) {

                timeLock.style.transition =
                    "opacity 1s ease, visibility 1s ease";

                timeLock.style.opacity = "0";
                timeLock.style.pointerEvents = "none";

                setTimeout(() => {
                    timeLock.style.display = "none";
                }, 1000);
            }

        } else {

            if (passcodeError) {
                passcodeError.textContent =
                    "Not quite! Think of our special day again ♡";
            }

            passcodeBoxes.forEach(box => {
                box.value = "";
            });

            if (passcodeBoxes[0]) {
                passcodeBoxes[0].focus();
            }
        }

    });

}


    // =====================================
    
    // =====================================
    // CHAPTER 02 — PHOTO + VIDEO ALBUM
    // =====================================

    const memoryGallery = document.getElementById("memoryGallery");
    const memoryPrevious = document.getElementById("memoryPrevious");
    const memoryNext = document.getElementById("memoryNext");
    const memoryPageLabel = document.getElementById("memoryPageLabel");

    // Video viewer
    const memoryVideoViewer = document.getElementById("memoryVideoViewer");
    const memoryVideoPlayer = document.getElementById("memoryVideoPlayer");
    const memoryVideoClose = document.getElementById("memoryVideoClose");

    // Photo viewer
    const memoryPhotoViewer = document.getElementById("memoryPhotoViewer");
    const memoryPhotoDisplay = document.getElementById("memoryPhotoDisplay");
    const memoryPhotoLabel = document.getElementById("memoryPhotoLabel");
    const memoryPhotoTitle = document.getElementById("memoryPhotoTitle");
    const memoryPhotoClose = document.getElementById("memoryPhotoClose");
    const memoryPhotoBack = document.getElementById("memoryPhotoBack");

    if (memoryGallery && memoryPrevious && memoryNext && memoryPageLabel) {

        const photoMemories = Array.from({ length: 11 }, (_, i) => ({
            src: `images/memory-${String(i + 1).padStart(2, "0")}.jpeg`,
            label: `PHOTO MEMORY ${String(i + 1).padStart(2, "0")}`,
            title: [
                "A little piece of us",
                "A moment to keep",
                "One for the memories",
                "A day to remember",
                "Our little world",
                "A favourite moment",
                "Captured in time",
                "A memory worth keeping",
                "Little things, big feelings",
                "A moment together",
                "Forever in this frame"
            ][i]
        }));

        const videoMemories = Array.from({ length: 7 }, (_, i) => ({
            src: `videos/video-${String(i + 1).padStart(2, "0")}.mp4`,
            poster: `videos/posters/video-${String(i + 1).padStart(2, "0")}.jpg`,
            label: `VIDEO MEMORY ${String(i + 1).padStart(2, "0")}`,
            title: `A memory in motion ${i + 1}`
        }));

        const albumPages = [];

        for (let i = 0; i < photoMemories.length; i += 4) {
            albumPages.push({
                type: "photo",
                items: photoMemories.slice(i, i + 4)
            });
        }

        for (let i = 0; i < videoMemories.length; i += 4) {
            albumPages.push({
                type: "video",
                items: videoMemories.slice(i, i + 4)
            });
        }

        let albumPageIndex = 0;

        // -------------------------------------
        // RENDER ALBUM PAGE
        // -------------------------------------

        function renderMemoryPage() {

            const page = albumPages[albumPageIndex];

            memoryGallery.replaceChildren();

            page.items.forEach(item => {

                const card = document.createElement("article");

                card.className =
                    `memory-card${page.type === "video" ? " is-video" : ""}`;

                const frame = document.createElement("div");
                frame.className = "memory-photo-frame";

                if (page.type === "photo") {

                    // ZIP FOLDER PHOTO CARD
                    frame.classList.add("memory-zip-frame");

                    const zipButton = document.createElement("button");
                    zipButton.type = "button";
                    zipButton.className = "memory-zip-cover";
                    zipButton.setAttribute(
                        "aria-label",
                        `Unzip and view ${item.label}`
                    );

                    const folder = document.createElement("div");
                    folder.className = "memory-zip-folder";

                    const zipLabel = document.createElement("small");
                    zipLabel.textContent = "A LITTLE MEMORY";

                    const zipTitle = document.createElement("strong");
                    zipTitle.textContent = "Packed with love ♡";

                    const tapHint = document.createElement("span");
                    tapHint.className = "zip-tap-hint";
                    tapHint.textContent = "TAP TO UNZIP";

                    zipButton.append(
                        folder,
                        zipLabel,
                        zipTitle,
                        tapHint
                    );

                    zipButton.addEventListener("click", () => {
                        openMemoryPhoto(item);
                    });

                    frame.appendChild(zipButton);

                } else {

                    // EXISTING VIDEO CARD
                    const img = document.createElement("img");
                    img.src = item.poster;
                    img.alt = item.label;
                    img.loading = "lazy";

                    frame.appendChild(img);

                    const play = document.createElement("button");
                    play.type = "button";
                    play.className = "memory-play";
                    play.setAttribute(
                        "aria-label",
                        `Play ${item.label}`
                    );
                    play.textContent = "▶";

                    play.addEventListener("click", () => {
                        openMemoryVideo(item.src);
                    });

                    frame.appendChild(play);
                }

                // CARD CAPTION
                const caption = document.createElement("div");
                caption.className = "memory-caption";

                const label = document.createElement("span");
                label.textContent = item.label;

                const title = document.createElement("h3");
                title.textContent = item.title;

                caption.append(label, title);
                card.append(frame, caption);

                memoryGallery.appendChild(card);
            });

            // PAGE INFORMATION
            const pageTypeLabel =
                page.type === "photo" ? "PHOTO" : "VIDEO";

            const pageNumber =
                page.type === "photo"
                    ? albumPageIndex + 1
                    : albumPageIndex - 2;

            const totalPages =
                page.type === "photo" ? 3 : 2;

            memoryPageLabel.textContent =
                `${pageTypeLabel} PAGE ${pageNumber} / ${totalPages}`;

            memoryPrevious.disabled = albumPageIndex === 0;

            memoryNext.textContent =
                albumPageIndex === albumPages.length - 1
                    ? "Album end ♡"
                    : "Next →";

            memoryNext.disabled =
                albumPageIndex === albumPages.length - 1;
        }

        // -------------------------------------
        // OPEN PHOTO
        // -------------------------------------

        function openMemoryPhoto(item) {

            if (
                !memoryPhotoViewer ||
                !memoryPhotoDisplay ||
                !memoryPhotoLabel ||
                !memoryPhotoTitle
            ) return;

            memoryPhotoDisplay.src = item.src;
            memoryPhotoDisplay.alt = item.label;

            memoryPhotoLabel.textContent = item.label;
            memoryPhotoTitle.textContent = item.title;

            const imageWrap = memoryPhotoDisplay.parentElement;

            imageWrap.style.animation = "none";
            void imageWrap.offsetWidth;
            imageWrap.style.animation = "";

            memoryPhotoViewer.hidden = false;
            document.body.style.overflow = "hidden";
        }

        // -------------------------------------
        // CLOSE PHOTO
        // -------------------------------------

        function closeMemoryPhoto() {

            if (!memoryPhotoViewer) return;

            memoryPhotoViewer.hidden = true;

            if (memoryPhotoDisplay) {
                memoryPhotoDisplay.removeAttribute("src");
            }

            document.body.style.overflow = "";
        }

        // -------------------------------------
        // VIDEO VIEWER
        // -------------------------------------

        function openMemoryVideo(src) {

            if (!memoryVideoViewer || !memoryVideoPlayer) return;

            memoryVideoPlayer.src = src;
            memoryVideoViewer.hidden = false;

            memoryVideoPlayer.play().catch(() => {});
        }

        function closeMemoryVideo() {

            if (!memoryVideoViewer || !memoryVideoPlayer) return;

            memoryVideoPlayer.pause();
            memoryVideoPlayer.removeAttribute("src");
            memoryVideoPlayer.load();

            memoryVideoViewer.hidden = true;
        }

        // -------------------------------------
        // PAGE CONTROLS
        // -------------------------------------

        memoryPrevious.addEventListener("click", () => {

            if (albumPageIndex > 0) {
                albumPageIndex--;
                renderMemoryPage();
            }

        });

        memoryNext.addEventListener("click", () => {

            if (albumPageIndex < albumPages.length - 1) {
                albumPageIndex++;
                renderMemoryPage();
            }

        });

        // -------------------------------------
        // PHOTO VIEWER BUTTONS
        // -------------------------------------

        if (memoryPhotoClose) {
            memoryPhotoClose.addEventListener(
                "click",
                closeMemoryPhoto
            );
        }

        if (memoryPhotoBack) {
            memoryPhotoBack.addEventListener(
                "click",
                closeMemoryPhoto
            );
        }

        if (memoryPhotoViewer) {
            memoryPhotoViewer.addEventListener("click", event => {

                if (event.target === memoryPhotoViewer) {
                    closeMemoryPhoto();
                }

            });
        }

        // -------------------------------------
        // VIDEO VIEWER BUTTONS
        // -------------------------------------

        if (memoryVideoClose) {
            memoryVideoClose.addEventListener(
                "click",
                closeMemoryVideo
            );
        }

        if (memoryVideoViewer) {
            memoryVideoViewer.addEventListener("click", event => {

                if (event.target === memoryVideoViewer) {
                    closeMemoryVideo();
                }

            });
        }

        // -------------------------------------
        // ESCAPE KEY
        // -------------------------------------

        document.addEventListener("keydown", event => {

            if (
                event.key === "Escape" &&
                memoryPhotoViewer &&
                !memoryPhotoViewer.hidden
            ) {
                closeMemoryPhoto();
            }

            if (
                event.key === "Escape" &&
                memoryVideoViewer &&
                !memoryVideoViewer.hidden
            ) {
                closeMemoryVideo();
            }

        });

        renderMemoryPage();
    }


    // =====================================
    // CHAPTER 05 — MATCH OUR MEMORIES
    // =====================================

    const matchGameGrid = document.getElementById("matchGameGrid");
    const matchPairs = document.getElementById("matchPairs");
    const matchMoves = document.getElementById("matchMoves");
    const matchFeedback = document.getElementById("matchGameFeedback");
    const matchRestart = document.getElementById("matchGameRestart");
    const matchComplete = document.getElementById("matchGameComplete");

    if (
        matchGameGrid &&
        matchPairs &&
        matchMoves &&
        matchFeedback &&
        matchRestart &&
        matchComplete
    ) {

        const memorySymbols = [
            "🌙", "🌷", "🎀", "⭐", "🧸", "💌"
        ];

        let firstCard = null;
        let secondCard = null;
        let lockBoard = false;
        let foundPairs = 0;
        let moves = 0;

        function shuffleMemories() {
            const shuffled = [...memorySymbols, ...memorySymbols];

            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] =
                    [shuffled[j], shuffled[i]];
            }

            return shuffled;
        }

        function updateMatchStats() {
            matchPairs.textContent = `${foundPairs} / 6`;
            matchMoves.textContent = moves;
        }

        function resetTurn() {
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }

        function handleMatchCard(card) {

            if (
                lockBoard ||
                card === firstCard ||
                card.classList.contains("matched") ||
                card.classList.contains("flipped")
            ) return;

            card.classList.add("flipped");
            card.textContent = card.dataset.symbol;

            if (!firstCard) {
                firstCard = card;
                return;
            }

            secondCard = card;
            moves++;

            updateMatchStats();

            if (
                firstCard.dataset.symbol ===
                secondCard.dataset.symbol
            ) {

                firstCard.classList.add("matched");
                secondCard.classList.add("matched");

                firstCard.disabled = true;
                secondCard.disabled = true;

                foundPairs++;
                updateMatchStats();

                matchFeedback.textContent =
                    "Aww, you found a matching pair! ♡";

                resetTurn();

                if (foundPairs === 6) {
                    matchFeedback.textContent =
                        "You remembered every little thing! 🥹";

                    matchComplete.hidden = false;
                }

            } else {

                lockBoard = true;

                matchFeedback.textContent =
                    "Not a match! Try another pair ♡";

                const cardOne = firstCard;
                const cardTwo = secondCard;

                setTimeout(() => {

                    cardOne.classList.remove("flipped");
                    cardTwo.classList.remove("flipped");

                    cardOne.textContent = "♡";
                    cardTwo.textContent = "♡";

                    resetTurn();

                }, 850);
            }
        }

        function startMatchGame() {

            matchGameGrid.replaceChildren();

            foundPairs = 0;
            moves = 0;

            firstCard = null;
            secondCard = null;
            lockBoard = false;

            matchComplete.hidden = true;

            matchFeedback.textContent =
                "Tap any two cards to find a matching pair ♡";

            updateMatchStats();

            const shuffledSymbols = shuffleMemories();

            shuffledSymbols.forEach((symbol, index) => {

                const card = document.createElement("button");

                card.type = "button";
                card.className = "match-card";
                card.textContent = "♡";
                card.dataset.symbol = symbol;

                card.setAttribute(
                    "aria-label",
                    `Memory card ${index + 1}`
                );

                card.addEventListener("click", () => {
                    handleMatchCard(card);
                });

                matchGameGrid.appendChild(card);
            });
        }

        matchRestart.addEventListener(
            "click",
            startMatchGame
        );

        startMatchGame();
    }

})
