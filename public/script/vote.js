const SUPABASE_URL = 'https://oqspeciykkfmapbagaaa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xc3BlY2l5a2tmbWFwYmFnYWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzMjYxMzYsImV4cCI6MjA4NDkwMjEzNn0._KzYp2cZFP54VFK3h0Yoa3uH3CtVfRlC5i3NIVLCtOM';

let isVoting = false;

window.handleVote = async function(candidateId, candidateName) {
    if (isVoting) return;
    
    const result = await Swal.fire({
        title: 'Konfirmasi Pilihan',
        html: `Anda akan memilih:<br><strong>${candidateName}</strong><br><br>Apakah Anda yakin?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Saya Yakin',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#94a3b8',
        reverseButtons: true,
        allowOutsideClick: false
    });

    if (result.isConfirmed) {
        isVoting = true;
        disableAllVoteButtons();
        
        Swal.fire({
            title: 'Menyimpan suara...',
            html: 'Mohon tunggu sebentar',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
        try {
            const response = await fetch(`${SUPABASE_URL}/functions/v1/votes-api`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify({ candidate_id: candidateId })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Failed to save vote');
            }

            Swal.close();

            await Swal.fire({
                title: 'Berhasil',
                html: `Suara Anda untuk <strong>${candidateName}</strong> telah tersimpan.<br><br>Halaman akan direset dalam <strong id="countdown">2</strong> detik...`,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#10b981',
                allowOutsideClick: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: () => {
                    let secondsLeft = 5;
                    const countdownElement = document.getElementById('countdown');
                    
                    const countdownInterval = setInterval(() => {
                        secondsLeft--;
                        if (countdownElement) {
                            countdownElement.textContent = secondsLeft;
                        }
                        
                        if (secondsLeft <= 0) {
                            clearInterval(countdownInterval);
                        }
                    }, 1000);
                },
                willClose: () => {
                    resetVotingInterface();
                }
            });

        } catch (error) {
            console.error('Error saving vote:', error);
            
            Swal.close();
            
            await Swal.fire({
                title: 'Gagal!',
                text: 'Suara Anda gagal disimpan. Silakan coba lagi atau hubungi panitia.',
                icon: 'error',
                confirmButtonText: 'Tutup',
                confirmButtonColor: '#ef4444'
            });
            
            enableAllVoteButtons();
            isVoting = false;
        }
    }
};

function disableAllVoteButtons() {
    const buttons = document.querySelectorAll('.vote-button');
    buttons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.cursor = 'not-allowed';
    });
}

function enableAllVoteButtons() {
    const buttons = document.querySelectorAll('.vote-button');
    buttons.forEach(button => {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
    });
}

function resetVotingInterface() {
    enableAllVoteButtons();
    isVoting = false;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Pilketos SMKN 2 Setu 2026-2027 - Voting System Loaded');
});