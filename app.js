// Données des matchs pour chaque championnat
const matchData = {
    'ligue1': [
        { title: 'PSG vs Lyon', time: '19h00', stadium: 'Parc des Princes, Paris' },
        { title: 'Marseille vs Monaco', time: '21h00', stadium: 'Stade Vélodrome, Marseille' }
    ],
    'liga': [
        { title: 'Real Madrid vs FC Barcelone', time: '21h00', stadium: 'Santiago Bernabéu, Madrid' }
    ],
    'premierLeague': [
        { title: 'Liverpool vs Manchester City', time: '17h00', stadium: 'Anfield, Liverpool' },
        { title: 'Chelsea vs Arsenal', time: '20h30', stadium: 'Stamford Bridge, Londres' }
    ],
    'bundesliga': [
        { title: 'Bayern Munich vs RB Leipzig', time: '16h30', stadium: 'Allianz Arena, Munich' },
        { title: 'Dortmund vs Schalke', time: '19h00', stadium: 'Signal Iduna Park, Dortmund' }
    ]
};

// Fonction pour afficher les matchs du championnat sélectionné
function showMatches(championshipId) {
    const matches = matchData[championshipId];
    const matchesContainer = document.getElementById('matches-container');
    const championshipTitle = document.getElementById('championship-title');

    matchesContainer.innerHTML = '';
    const championshipNames = {
        'ligue1': 'Ligue 1',
        'liga': 'La Liga',
        'premierLeague': 'Premier League',
        'bundesliga': 'Bundesliga'
    };
    championshipTitle.textContent = `Matchs du Jour - ${championshipNames[championshipId]}`;

    matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'match-card';
        matchElement.textContent = `${match.title} - ${match.time}`;
        matchElement.onclick = () => showMatchDetails(match);
        matchesContainer.appendChild(matchElement);
    });

    document.getElementById('match-list').classList.remove('hidden');
    document.getElementById('match-list').classList.add('visible');
    document.getElementById("selected-match-details").classList.add("hidden");
}

// Fonction pour afficher les détails du match et le lecteur vidéo si c'est Real vs Barça
function showMatchDetails(match) {
    document.getElementById('match-title').textContent = match.title;
    document.getElementById('match-time').textContent = `Heure : ${match.time}`;
    document.getElementById('match-stadium').textContent = `Stade : ${match.stadium}`;

    const detailsSection = document.getElementById("selected-match-details");
    detailsSection.classList.remove("hidden");
    detailsSection.classList.add("visible");

    if (match.title === "Real Madrid vs FC Barcelone") {
        const videoPlayer = document.getElementById("video-player");
        videoPlayer.classList.remove("hidden");
        videoPlayer.classList.add("visible");

        const videoElement = document.getElementById('live-stream');
        const streamURL = "http://tv.tvprovip.com:25443/live/V5dAX4XZBOGX/FtozYhc1Nb/9211.ts";

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamURL);
            hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            videoElement.src = streamURL;
        }
    } else {
        document.getElementById("video-player").classList.add("hidden");
    }
}
