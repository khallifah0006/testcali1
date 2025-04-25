// Import modul yang diperlukan
const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');

// Inisialisasi Express app
const app = express();
const PORT = 3000;

// Middleware HARUS ditambahkan sebelum mendefinisikan route
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'index.html'));
});

// Array untuk menyimpan data BMI (dalam aplikasi produksi, gunakan database)
const bmiData = [];

// Endpoint untuk menyimpan data BMI
app.post('/save-bmi', (req, res) => {
  try {
    const { age, height, weight, bmi, category } = req.body;
    
    // Validasi input
    if (!age || !height || !weight || !bmi || !category) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }
    
    // Buat objek data BMI
    const bmiEntry = {
      id: Date.now().toString(),
      age,
      height,
      weight,
      bmi,
      category,
      timestamp: new Date().toISOString()
    };
    
    // Simpan ke array (atau database)
    bmiData.push(bmiEntry);
    
    res.json({ success: true, data: bmiEntry });
  } catch (error) {
    console.error('Error in save-bmi endpoint:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Endpoint untuk mendapatkan riwayat BMI (opsional)
app.get('/bmi-history', (req, res) => {
  res.json({ history: bmiData });
});

const workouts = {
  endurance: {
    endurance_aerobic: [
      {
        name: "Jogging",
        jenis: "endurance",
        subkategori: "endurance_aerobic",
        kesulitan: "Easy",
        target: "cardiovascular system, legs",
        description: "Lari dengan kecepatan sedang untuk meningkatkan kesehatan jantung."
      },
      {
        name: "Lari Jarak Jauh",
        jenis: "endurance",
        subkategori: "endurance_aerobic",
        kesulitan: "Medium",
        target: "cardiovascular system, legs",
        description: "Lari dengan jarak lebih panjang untuk meningkatkan stamina."
      },
      {
        name: "Bersepeda Santai",
        jenis: "endurance",
        subkategori: "endurance_aerobic",
        kesulitan: "Medium",
        target: "cardiovascular system, legs, glutes",
        description: "Bersepeda dengan intensitas ringan hingga sedang."
      },
      {
        name: "Berenang Santai",
        jenis: "endurance",
        subkategori: "endurance_aerobic",
        kesulitan: "Medium",
        target: "cardiovascular system, full body",
        description: "Berenang dengan kecepatan sedang untuk melatih seluruh tubuh."
      },
      {
        name: "Brisk Walking",
        jenis: "endurance",
        subkategori: "endurance_aerobic",
        kesulitan: "Easy",
        target: "cardiovascular system, legs",
        description: "Jalan cepat dengan tempo konstan."
      }
    ],
    endurance_anaerobic: [
      {
        name: "Burpees",
        jenis: "endurance",
        subkategori: "endurance_anaerobic",
        kesulitan: "Hard",
        target: "chest, thighs, glutes, core",
        description: "Gerakan kombinasi squat thrust dan vertical jump."
      },
      {
        name: "Mountain Climbers",
        jenis: "endurance",
        subkategori: "endurance_anaerobic",
        kesulitan: "Medium",
        target: "core, legs, chest, shoulders",
        description: "Gerakan mirip berlari di tempat dengan posisi plank."
      },
      {
        name: "High Knees",
        jenis: "endurance",
        subkategori: "endurance_anaerobic",
        kesulitan: "Medium",
        target: "legs, glutes, cardiovascular system",
        description: "Gerakan mengangkat lutut tinggi secara bergantian."
      },
      {
        name: "Jumping Jacks",
        jenis: "endurance",
        subkategori: "endurance_anaerobic",
        kesulitan: "Medium",
        target: "full body, cardiovascular system",
        description: "Gerakan melompat dengan membuka dan menutup kaki."
      },
      {
        name: "Tuck Jumps",
        jenis: "endurance",
        subkategori: "endurance_anaerobic",
        kesulitan: "Hard",
        target: "legs, glutes, cardiovascular system",
        description: "Melompat dengan menarik lutut ke dada."
      }
    ],
    muscular_endurance: [
      {
        name: "Squats (Repetisi Tinggi)",
        jenis: "endurance",
        subkategori: "muscular_endurance",
        kesulitan: "Medium",
        target: "legs, glutes",
        description: "Gerakan jongkok dengan repetisi tinggi untuk ketahanan otot."
      },
      {
        name: "Lunges",
        jenis: "endurance",
        subkategori: "muscular_endurance",
        kesulitan: "Medium",
        target: "legs, glutes",
        description: "Gerakan melangkah dengan satu kaki ke depan lalu jongkok."
      },
      {
        name: "Plank",
        jenis: "endurance",
        subkategori: "muscular_endurance",
        kesulitan: "Medium",
        target: "core, lower back",
        description: "Menahan posisi push-up tanpa menekuk siku."
      },
      {
        name: "Leg Raises",
        jenis: "endurance",
        subkategori: "muscular_endurance",
        kesulitan: "Medium",
        target: "core, hips",
        description: "Mengangkat kaki lurus ke atas sambil berbaring telentang."
      }
    ]
  },
  strength: {
    maximal_strength: [
      {
        name: "Decline Push-ups",
        jenis: "strength",
        subkategori: "maximal_strength",
        kesulitan: "Hard",
        target: "upper chest, shoulders, triceps",
        description: "Push-up dengan posisi kaki lebih tinggi dari kepala."
      },
      {
        name: "One-Leg Squats",
        jenis: "strength",
        subkategori: "maximal_strength",
        kesulitan: "Hard",
        target: "legs, glutes",
        description: "Squat dengan menggunakan satu kaki."
      },
      {
        name: "Handstand Push-ups",
        jenis: "strength",
        subkategori: "maximal_strength",
        kesulitan: "Very Hard",
        target: "shoulders, chest, triceps",
        description: "Push-up dalam posisi handstand."
      },
      {
        name: "Dips",
        jenis: "strength",
        subkategori: "maximal_strength",
        kesulitan: "Hard",
        target: "triceps, shoulders, chest",
        description: "Gerakan menurunkan dan mengangkat tubuh dengan tangan bertumpu."
      },
      {
        name: "Pull-ups",
        jenis: "strength",
        subkategori: "maximal_strength",
        kesulitan: "Hard",
        target: "back, biceps, shoulders",
        description: "Menarik tubuh ke atas dengan pegangan di atas kepala."
      }
    ],
    explosive_strength: [
      {
        name: "Jump Squats",
        jenis: "strength",
        subkategori: "explosive_strength",
        kesulitan: "Hard",
        target: "legs, glutes",
        description: "Squat diikuti dengan lompatan eksplosif."
      },
      {
        name: "Clapping Push-ups",
        jenis: "strength",
        subkategori: "explosive_strength",
        kesulitan: "Hard",
        target: "chest, shoulders, triceps",
        description: "Push-up eksplosif dengan tepuk tangan di tengahnya."
      },
      {
        name: "Box Jumps",
        jenis: "strength",
        subkategori: "explosive_strength",
        kesulitan: "Hard",
        target: "legs, glutes",
        description: "Melompat ke atas box atau platform."
      },
      {
        name: "Broad Jumps",
        jenis: "strength",
        subkategori: "explosive_strength",
        kesulitan: "Hard",
        target: "legs, glutes",
        description: "Melompat ke depan sejauh mungkin."
      }
    ],
    strength_endurance: [
      {
        name: "Plank (Long Duration)",
        jenis: "strength",
        subkategori: "strength_endurance",
        kesulitan: "Medium",
        target: "core, lower back",
        description: "Plank dengan durasi yang lebih lama."
      },
      {
        name: "Walking Lunges",
        jenis: "strength",
        subkategori: "strength_endurance",
        kesulitan: "Medium",
        target: "legs, glutes",
        description: "Lunges sambil berjalan ke depan."
      },
      {
        name: "Dips (High Reps)",
        jenis: "strength",
        subkategori: "strength_endurance",
        kesulitan: "Medium",
        target: "triceps, chest, shoulders",
        description: "Dips dengan repetisi tinggi untuk ketahanan otot."
      }
    ],
    relative_strength: [
      {
        name: "Pistol Squats",
        jenis: "strength",
        subkategori: "relative_strength",
        kesulitan: "Hard",
        target: "legs, glutes",
        description: "Squat satu kaki dengan kaki lainnya diluruskan ke depan."
      },
      {
        name: "Muscle-ups",
        jenis: "strength",
        subkategori: "relative_strength",
        kesulitan: "Very Hard",
        target: "chest, shoulders, back, arms",
        description: "Kombinasi pull-up dan dip dalam satu gerakan."
      },
      {
        name: "Human Flag",
        jenis: "strength",
        subkategori: "relative_strength",
        kesulitan: "Very Hard",
        target: "core, shoulders, lats",
        description: "Memegang tiang secara horizontal dengan tubuh sejajar dengan tanah."
      },
      {
        name: "Dragon Flags",
        jenis: "strength",
        subkategori: "relative_strength",
        kesulitan: "Very Hard",
        target: "core, upper body",
        description: "Mengangkat seluruh tubuh dengan hanya bertumpu pada bahu."
      }
    ]
  }
};

// Endpoint untuk rekomendasi gerakan calisthenics
app.post('/recommend', (req, res) => {
  try {
    const { workoutType, difficultyLevel } = req.body;
    
    // Validasi input
    if (!workoutType) {
      return res.status(400).json({ error: 'Jenis latihan harus di isi' });
    }
    
    // Jika memilih "semua" untuk jenis workout
    if (workoutType === 'semua') {
      // Gabungkan semua gerakan dari semua kategori
      let allWorkouts = [];
      for (const type in workouts) {
        for (const sub in workouts[type]) {
          allWorkouts = [...allWorkouts, ...workouts[type][sub]];
        }
      }
      
      // Filter berdasarkan kesulitan jika ditentukan
      if (difficultyLevel && difficultyLevel !== 'all') {
        const difficultyMap = {
          'beginner': 'Easy',
          'intermediate': 'Medium',
          'advanced': 'Hard'
        };
        allWorkouts = allWorkouts.filter(w => w.kesulitan === difficultyMap[difficultyLevel]);
      }
      
      return res.json({ recommendations: allWorkouts });
    } else if (workouts[workoutType]) {
      // Jika memilih jenis tertentu (strength atau endurance)
      // Gabungkan semua gerakan dari jenis yang dipilih
      let typeWorkouts = [];
      for (const sub in workouts[workoutType]) {
        typeWorkouts = [...typeWorkouts, ...workouts[workoutType][sub]];
      }
      
      // Filter berdasarkan kesulitan jika ditentukan
      if (difficultyLevel && difficultyLevel !== 'all') {
        const difficultyMap = {
          'beginner': 'Easy',
          'intermediate': 'Medium',
          'advanced': 'Hard'
        };
        typeWorkouts = typeWorkouts.filter(w => w.kesulitan === difficultyMap[difficultyLevel]);
      }
      
      return res.json({ recommendations: typeWorkouts });
    } else {
      // Jika jenis tidak ditemukan
      return res.status(400).json({ error: 'Jenis latihan tidak valid' });
    }
  } catch (error) {
    console.error('Error in recommend endpoint:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Endpoint untuk ML-based recommendations (untuk pengembangan lanjutan)
app.post('/ml-recommend', (req, res) => {
  const { bodyPart, movementType, difficultyLevel } = req.body;
  
  // Jalankan script Python untuk ML recommendation
  const pythonProcess = spawn('python', [
    'ml_recommend.py', 
    bodyPart, 
    movementType, 
    difficultyLevel || 'all'
  ]);
  
  let pythonData = '';
  
  pythonProcess.stdout.on('data', (data) => {
    pythonData += data.toString();
  });
  
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`);
  });
  
  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'ML recommendation failed' });
    }
    
    try {
      const recommendations = JSON.parse(pythonData);
      return res.json({ recommendations });
    } catch (error) {
      console.error('Error parsing Python output:', error);
      return res.status(500).json({ error: 'Failed to parse ML recommendations' });
    }
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});