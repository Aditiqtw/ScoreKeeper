    const p1 = {
        score: 0,
        button: document.querySelector('#p1Button'),
        display: document.querySelector('#p1Display')
    };
    const p2 = {
        score: 0,
        button: document.querySelector('#p2Button'),
        display: document.querySelector('#p2Display')
    };

    const resetButton = document.querySelector('#reset');
    const winningScoreSelect = document.querySelector('#playto');
    let winningScore = 3;
    let isGameOver = false;

    // Fireworks setup
    const overlay = document.querySelector('.fireworks-overlay');

    function updateScores(player, opponent) {
        if (!isGameOver) {
            player.score += 1;
            if (player.score === winningScore) {
                isGameOver = true;
                player.display.classList.add('has-text-success');
                opponent.display.classList.add('has-text-danger');
                player.button.disabled = true;
                opponent.button.disabled = true;

                // Show fireworks on win
                startFireworks();
            }
            player.display.textContent = player.score;
        }
    }

    // Start fireworks
    function startFireworks() {
        overlay.style.display = 'block';
        
        const fireworks = new Fireworks(overlay, {
            autoresize: false,  // Prevent auto resizing
            opacity: 0.5,
            particles: 100,
            trace: 3,
            explosion: 5,
            intensity: 30,
            flickering: 50,
            lineStyle: 'round',
            gravity: 1.5,
            decay: {
                min: 0.015,
                max: 0.03
            }
        });

        fireworks.start();

        // Stop fireworks after 5 seconds and hide the overlay
        setTimeout(() => {
            fireworks.stop();
            overlay.style.display = 'none';
        }, 5000);
    }

    // Button events
    p1.button.addEventListener('click', function () {
        updateScores(p1, p2);
    });
    p2.button.addEventListener('click', function () {
        updateScores(p2, p1);
    });

    // Update winning score
    winningScoreSelect.addEventListener('change', function () {
        winningScore = parseInt(this.value);
        reset();
    });

    // Reset the game
    resetButton.addEventListener('click', reset);

    function reset() {
        isGameOver = false;
        for (let p of [p1, p2]) {
            p.score = 0;
            p.display.textContent = 0;
            p.display.classList.remove('has-text-success', 'has-text-danger');
            p.button.disabled = false;
        }
    }
