const SUPABASE_URL = 'https://oqspeciykkfmapbagaaa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xc3BlY2l5a2tmbWFwYmFnYWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzMjYxMzYsImV4cCI6MjA4NDkwMjEzNn0._KzYp2cZFP54VFK3h0Yoa3uH3CtVfRlC5i3NIVLCtOM';

const CANDIDATES = {
    1: { name: 'Iswad Nur Fajri & Anita Fadhilah', class: 'Paslon 1' },
    2: { name: 'Sugia & Nur Jannah', class: 'Paslon 2' },
    3: { name: 'Rasya Kayana & Abdul Rahman', class: 'Paslon 3' }
};

const REFRESH_INTERVAL = 2000;

async function fetchVotingResults() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/votes?select=candidate_id`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch votes');
        }

        const votes = await response.json();
        return processVotes(votes);
    } catch (error) {
        console.error('Error fetching results:', error);
        return null;
    }
}

function processVotes(votes) {
    const voteCounts = { 1: 0, 2: 0, 3: 0 };
    
    votes.forEach(vote => {
        if (voteCounts.hasOwnProperty(vote.candidate_id)) {
            voteCounts[vote.candidate_id]++;
        }
    });

    const totalVotes = votes.length;
    
    const results = Object.keys(CANDIDATES).map(candidateId => {
        const id = parseInt(candidateId);
        const count = voteCounts[id];
        const percentage = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : 0;
        
        return {
            id,
            name: CANDIDATES[id].name,
            class: CANDIDATES[id].class,
            votes: count,
            percentage: parseFloat(percentage)
        };
    });

    results.sort((a, b) => b.votes - a.votes);

    return { results, totalVotes };
}

function renderResults(data) {
    if (!data) {
        document.getElementById('resultsContainer').innerHTML = `
            <div class="no-votes">
                <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 1rem; color: #ef4444;"></i>
                <p>Gagal memuat data. Silakan refresh halaman.</p>
            </div>
        `;
        return;
    }

    const { results, totalVotes } = data;

    document.getElementById('totalVotes').textContent = totalVotes.toLocaleString('id-ID');
    document.getElementById('lastUpdated').textContent = `Terakhir diperbarui: ${new Date().toLocaleTimeString('id-ID')}`;

    if (totalVotes === 0) {
        document.getElementById('resultsContainer').innerHTML = `
            <div class="no-votes">
                <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>Belum ada suara yang masuk.</p>
            </div>
        `;
        return;
    }

    const resultsHTML = results.map(candidate => `
        <div class="result-card">
            <div class="result-header">
                <div class="candidate-info-result">
                    <div class="candidate-name-result">${candidate.name}</div>
                    <div class="candidate-class-result">${candidate.class}</div>
                </div>
                <div class="vote-stats">
                    <div class="vote-count">${candidate.votes.toLocaleString('id-ID')}</div>
                    <div class="vote-percentage">${candidate.percentage}%</div>
                </div>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${candidate.percentage}%">
                    ${candidate.percentage > 5 ? `${candidate.percentage}%` : ''}
                </div>
            </div>
        </div>
    `).join('');

    document.getElementById('resultsContainer').innerHTML = resultsHTML;
}

function showRefreshIndicator() {
    const indicator = document.getElementById('refreshIndicator');
    indicator.classList.add('show');
    
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 600);
}

async function updateResults() {
    showRefreshIndicator();
    const data = await fetchVotingResults();
    renderResults(data);
}

window.handleResetVotes = async function() {
    const result = await Swal.fire({
        title: 'Konfirmasi Reset',
        html: `<p style="font-size: 1.1rem; margin-bottom: 1rem;">Anda akan menghapus <strong>SEMUA SUARA</strong> yang telah masuk.</p>
               <p style="font-size: 1rem; color: #ef4444; font-weight: 600;">Tindakan ini TIDAK DAPAT dibatalkan!</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Reset Semua',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#94a3b8',
        reverseButtons: true,
        allowOutsideClick: false,
        input: 'text',
        inputPlaceholder: 'Ketik "RESET" untuk konfirmasi',
        inputValidator: (value) => {
            if (value !== 'RESET') {
                return 'Ketik "RESET" dengan huruf kapital untuk melanjutkan!'
            }
        }
    });

    if (result.isConfirmed) {
        try {
            Swal.fire({
                title: 'Menghapus data...',
                html: 'Mohon tunggu sebentar',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await fetch(`${SUPABASE_URL}/rest/v1/votes?id=gt.0`, {
                method: 'DELETE',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Prefer': 'return=minimal'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to reset votes');
            }

            Swal.close();

            await Swal.fire({
                title: 'Success',
                text: 'Semua suara telah dihapus',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#10b981',
                timer: 1500
            });

            await updateResults();

        } catch (error) {
            console.error('Error resetting votes:', error);
            
            await Swal.fire({
                title: 'Gagal',
                text: 'Terjadi kesalahan saat menghapus data. Silakan coba lagi.',
                icon: 'error',
                confirmButtonText: 'Tutup',
                confirmButtonColor: '#ef4444'
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    await updateResults();
    
    setInterval(updateResults, REFRESH_INTERVAL);
    
    console.log('Results page loaded - Auto-refresh every 2 seconds');
});