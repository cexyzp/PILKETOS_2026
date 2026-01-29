const SUPABASE_URL = 'https://oqspeciykkfmapbagaaa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xc3BlY2l5a2tmbWFwYmFnYWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzMjYxMzYsImV4cCI6MjA4NDkwMjEzNn0._KzYp2cZFP54VFK3h0Yoa3uH3CtVfRlC5i3NIVLCtOM';

const DEFAULT_CANDIDATES = [
    {
        id: 1,
        name: 'Ahmad Fadhil Rahman',
        class: 'XII RPL 1',
        photo: 'https://picsum.photos/seed/candidate1/400/500',
        vision: 'Mewujudkan OSIS yang inovatif, inklusif, dan berprestasi dalam membentuk karakter siswa yang unggul dan berakhlak mulia.',
        missions: [
            'Meningkatkan kualitas kegiatan OSIS yang kreatif dan bermanfaat',
            'Membangun komunikasi yang baik antar siswa dan guru',
            'Mengembangkan program digital dan teknologi'
        ]
    },
    {
        id: 2,
        name: 'Siti Nurhaliza Putri',
        class: 'XII TKJ 2',
        photo: 'https://picsum.photos/seed/candidate2/400/500',
        vision: 'Membangun OSIS yang solid, harmonis, dan progresif untuk menciptakan lingkungan sekolah yang inspiratif dan berprestasi.',
        missions: [
            'Mengoptimalkan potensi siswa melalui berbagai kegiatan',
            'Menciptakan suasana sekolah yang nyaman dan kondusif',
            'Menjalin kerjasama dengan pihak eksternal'
        ]
    },
    {
        id: 3,
        name: 'Muhammad Rizki Pratama',
        class: 'XII MM 1',
        photo: 'https://picsum.photos/seed/candidate3/400/500',
        vision: 'Menjadikan OSIS sebagai wadah pengembangan karakter, kreativitas, dan kepemimpinan siswa yang berintegritas tinggi.',
        missions: [
            'Menyelenggarakan program yang edukatif dan menyenangkan',
            'Meningkatkan partisipasi siswa dalam kegiatan OSIS',
            'Membangun citra positif sekolah di masyarakat'
        ]
    }
];

let candidatesData = [];

async function loadCandidates() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/candidates?select=*&order=id`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch candidates');
        }

        const data = await response.json();
        
        if (data.length === 0) {
            candidatesData = DEFAULT_CANDIDATES;
            await initializeCandidates();
        } else {
            candidatesData = data.map(c => ({
                ...c,
                missions: c.missions || []
            }));
        }

        renderEditors();
    } catch (error) {
        console.error('Error loading candidates:', error);
        candidatesData = DEFAULT_CANDIDATES;
        renderEditors();
    }
}

async function initializeCandidates() {
    try {
        for (const candidate of DEFAULT_CANDIDATES) {
            await fetch(`${SUPABASE_URL}/rest/v1/candidates`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(candidate)
            });
        }
    } catch (error) {
        console.error('Error initializing candidates:', error);
    }
}

function renderEditors() {
    const container = document.getElementById('editorsContainer');
    
    container.innerHTML = candidatesData.map(candidate => `
        <div class="candidate-editor" data-candidate-id="${candidate.id}">
            <div class="editor-header">
                <div class="editor-number">${candidate.id}</div>
                <div class="editor-title">Kandidat ${candidate.id}</div>
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-user"></i>
                        Nama Lengkap
                    </label>
                    <input 
                        type="text" 
                        class="form-input" 
                        id="name-${candidate.id}"
                        value="${candidate.name}"
                        placeholder="Masukkan nama lengkap"
                    >
                </div>

                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-graduation-cap"></i>
                        Kelas
                    </label>
                    <input 
                        type="text" 
                        class="form-input" 
                        id="class-${candidate.id}"
                        value="${candidate.class}"
                        placeholder="Contoh: XII RPL 1"
                    >
                </div>

                <div class="form-group full-width">
                    <label class="form-label">
                        <i class="fas fa-image"></i>
                        URL Foto
                    </label>
                    <input 
                        type="text" 
                        class="form-input" 
                        id="photo-${candidate.id}"
                        value="${candidate.photo}"
                        placeholder="https://example.com/photo.jpg"
                        onchange="updatePreview(${candidate.id})"
                    >
                </div>

                <div class="form-group full-width">
                    <label class="form-label">
                        <i class="fas fa-bullseye"></i>
                        Visi
                    </label>
                    <textarea 
                        class="form-input" 
                        id="vision-${candidate.id}"
                        placeholder="Masukkan visi kandidat"
                    >${candidate.vision}</textarea>
                </div>

                <div class="form-group full-width">
                    <label class="form-label">
                        <i class="fas fa-tasks"></i>
                        Misi (Poin-poin)
                    </label>
                    <div class="mission-items" id="missions-${candidate.id}">
                        ${candidate.missions.map((mission, idx) => `
                            <div class="mission-item">
                                <input 
                                    type="text" 
                                    class="form-input" 
                                    value="${mission}"
                                    placeholder="Poin misi ${idx + 1}"
                                >
                                <button class="remove-mission-btn" onclick="removeMission(${candidate.id}, ${idx})">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="add-mission-btn" onclick="addMission(${candidate.id})">
                        <i class="fas fa-plus"></i>
                        Tambah Poin Misi
                    </button>
                </div>
            </div>

            <div class="preview-section">
                <div class="preview-title">
                    <i class="fas fa-eye"></i>
                    Preview Foto
                </div>
                <img 
                    id="preview-${candidate.id}" 
                    src="${candidate.photo}" 
                    alt="Preview" 
                    class="preview-image"
                    onerror="this.src='https://via.placeholder.com/400x500?text=Error+Loading+Image'"
                >
            </div>

            <button class="save-button" onclick="saveCandidate(${candidate.id})">
                <i class="fas fa-save"></i>
                Simpan Perubahan Kandidat ${candidate.id}
            </button>
        </div>
    `).join('');
}

window.addMission = function(candidateId) {
    const container = document.getElementById(`missions-${candidateId}`);
    const currentCount = container.querySelectorAll('.mission-item').length;
    
    const newMission = document.createElement('div');
    newMission.className = 'mission-item';
    newMission.innerHTML = `
        <input 
            type="text" 
            class="form-input" 
            value=""
            placeholder="Poin misi ${currentCount + 1}"
        >
        <button class="remove-mission-btn" onclick="removeMission(${candidateId}, ${currentCount})">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(newMission);
};

window.removeMission = function(candidateId, index) {
    const container = document.getElementById(`missions-${candidateId}`);
    const items = container.querySelectorAll('.mission-item');
    
    if (items.length > 1) {
        items[index].remove();
    } else {
        Swal.fire({
            title: 'Perhatian!',
            text: 'Minimal harus ada 1 poin misi',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3b82f6'
        });
    }
};

window.updatePreview = function(candidateId) {
    const photoUrl = document.getElementById(`photo-${candidateId}`).value;
    const preview = document.getElementById(`preview-${candidateId}`);
    preview.src = photoUrl;
};

window.saveCandidate = async function(candidateId) {
    const name = document.getElementById(`name-${candidateId}`).value.trim();
    const classValue = document.getElementById(`class-${candidateId}`).value.trim();
    const photo = document.getElementById(`photo-${candidateId}`).value.trim();
    const vision = document.getElementById(`vision-${candidateId}`).value.trim();
    
    const missionInputs = document.querySelectorAll(`#missions-${candidateId} input`);
    const missions = Array.from(missionInputs)
        .map(input => input.value.trim())
        .filter(mission => mission.length > 0);

    if (!name || !classValue || !photo || !vision || missions.length === 0) {
        await Swal.fire({
            title: '⚠️ Data Tidak Lengkap',
            text: 'Semua field harus diisi, termasuk minimal 1 poin misi!',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ef4444'
        });
        return;
    }

    try {
        Swal.fire({
            title: 'Menyimpan...',
            html: 'Mohon tunggu sebentar',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await fetch(`${SUPABASE_URL}/rest/v1/candidates?id=eq.${candidateId}`, {
            method: 'PATCH',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                name,
                class: classValue,
                photo,
                vision,
                missions
            })
        });

        if (!response.ok) {
            throw new Error('Failed to save candidate');
        }

        Swal.close();

        await Swal.fire({
            title: '✅ Berhasil!',
            text: `Data Kandidat ${candidateId} berhasil disimpan`,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#10b981',
            timer: 2000
        });

        await loadCandidates();

    } catch (error) {
        console.error('Error saving candidate:', error);
        
        await Swal.fire({
            title: '❌ Gagal!',
            text: 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.',
            icon: 'error',
            confirmButtonText: 'Tutup',
            confirmButtonColor: '#ef4444'
        });
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    await loadCandidates();
    console.log('Admin panel loaded');
});