#!/usr/bin/env python3
import sys
import json

def recommend_workouts(body_part, movement_type, user_level):
    # Fixed workout database - aligned property names with JS version
    workout_db = {
      "endurance": {
        "endurance_aerobic": [
          { 
            "name": "Jogging", 
            "jenis": "endurance", 
            "subkategori": "endurance_aerobic", 
            "kesulitan": "Easy", 
            "target": "Cardiovascular system, legs",
            "description": "Lari dengan kecepatan sedang untuk meningkatkan kesehatan jantung."
          },
          { 
            "name": "Lari Jarak Jauh", 
            "jenis": "endurance", 
            "subkategori": "endurance_aerobic", 
            "kesulitan": "Medium", 
            "target": "Cardiovascular system, legs",
            "description": "Lari dengan jarak lebih panjang untuk meningkatkan stamina."
          },
          { 
            "name": "Bersepeda Santai", 
            "jenis": "endurance", 
            "subkategori": "endurance_aerobic", 
            "kesulitan": "Medium", 
            "target": "Cardiovascular system, legs, glutes",
            "description": "Bersepeda dengan intensitas ringan hingga sedang."
          },
          {
            "name": "Berenang Santai", 
            "jenis": "endurance", 
            "subkategori": "endurance_aerobic", 
            "kesulitan": "Medium", 
            "target": "Cardiovascular system, full body",
            "description": "Berenang dengan kecepatan sedang untuk melatih seluruh tubuh."
          },
          {
            "name": "Brisk Walking", 
            "jenis": "endurance", 
            "subkategori": "endurance_aerobic", 
            "kesulitan": "Easy", 
            "target": "Cardiovascular system, legs",
            "description": "Jalan cepat dengan tempo konstan."
          }
        ],
        "endurance_anaerobic": [
          { 
            "name": "Burpees", 
            "jenis": "endurance", 
            "subkategori": "endurance_anaerobic", 
            "kesulitan": "Hard", 
            "target": "Chest, thighs, glutes, core",
            "description": "Gerakan kombinasi squat thrust dan vertical jump."
          },
          { 
            "name": "Mountain Climbers", 
            "jenis": "endurance", 
            "subkategori": "endurance_anaerobic", 
            "kesulitan": "Medium", 
            "target": "Core, legs, chest, shoulders",
            "description": "Gerakan mirip berlari di tempat dengan posisi plank."
          },
          { 
            "name": "High Knees", 
            "jenis": "endurance", 
            "subkategori": "endurance_anaerobic", 
            "kesulitan": "Medium", 
            "target": "Legs, glutes, cardiovascular system",
            "description": "Gerakan mengangkat lutut tinggi secara bergantian."
          },
          { 
            "name": "Jumping Jacks", 
            "jenis": "endurance", 
            "subkategori": "endurance_anaerobic", 
            "kesulitan": "Medium", 
            "target": "Full body, cardiovascular system",
            "description": "Gerakan melompat dengan membuka dan menutup kaki."
          },
          { 
            "name": "Tuck Jumps", 
            "jenis": "endurance", 
            "subkategori": "endurance_anaerobic", 
            "kesulitan": "Hard", 
            "target": "Legs, glutes, cardiovascular system",
            "description": "Melompat dengan menarik lutut ke dada."
          }
        ],
        "muscular_endurance": [
          { 
            "name": "Squats (Repetisi Tinggi)", 
            "jenis": "endurance", 
            "subkategori": "muscular_endurance", 
            "kesulitan": "Medium", 
            "target": "Legs, glutes",
            "description": "Gerakan jongkok dengan repetisi tinggi untuk ketahanan otot."
          },
          { 
            "name": "Lunges", 
            "jenis": "endurance", 
            "subkategori": "muscular_endurance", 
            "kesulitan": "Medium", 
            "target": "Legs, glutes",
            "description": "Gerakan melangkah dengan satu kaki ke depan lalu jongkok."
          },
          { 
            "name": "Plank", 
            "jenis": "endurance", 
            "subkategori": "muscular_endurance", 
            "kesulitan": "Medium", 
            "target": "Core, lower back",
            "description": "Menahan posisi push-up tanpa menekuk siku."
          },
          { 
            "name": "Push-ups (High Reps)", 
            "jenis": "endurance", 
            "subkategori": "muscular_endurance", 
            "kesulitan": "Medium", 
            "target": "Chest, shoulders, triceps, core",
            "description": "Push-up dengan repetisi tinggi untuk ketahanan otot."
          },
          { 
            "name": "Leg Raises", 
            "jenis": "endurance", 
            "subkategori": "muscular_endurance", 
            "kesulitan": "Medium", 
            "target": "Core, hips",
            "description": "Mengangkat kaki lurus ke atas sambil berbaring telentang."
          }
        ]
      },
      "strength": {
        "maximal_strength": [
          { 
            "name": "Decline Push-ups", 
            "jenis": "strength", 
            "subkategori": "maximal_strength", 
            "kesulitan": "Hard", 
            "target": "Upper chest, shoulders, triceps",
            "description": "Push-up dengan posisi kaki lebih tinggi dari kepala."
          },
          { 
            "name": "One-Leg Squats", 
            "jenis": "strength", 
            "subkategori": "maximal_strength", 
            "kesulitan": "Hard", 
            "target": "Legs, glutes",
            "description": "Squat dengan menggunakan satu kaki."
          },
          { 
            "name": "Handstand Push-ups", 
            "jenis": "strength", 
            "subkategori": "maximal_strength", 
            "kesulitan": "Very Hard", 
            "target": "Shoulders, chest, triceps",
            "description": "Push-up dalam posisi handstand."
          },
          { 
            "name": "Dips", 
            "jenis": "strength", 
            "subkategori": "maximal_strength", 
            "kesulitan": "Hard", 
            "target": "Triceps, shoulders, chest",
            "description": "Gerakan menurunkan dan mengangkat tubuh dengan tangan bertumpu."
          },
          { 
            "name": "Pull-ups", 
            "jenis": "strength", 
            "subkategori": "maximal_strength", 
            "kesulitan": "Hard", 
            "target": "Back, biceps, shoulders",
            "description": "Menarik tubuh ke atas dengan pegangan di atas kepala."
          }
        ],
        "explosive_strength": [
          { 
            "name": "Jump Squats", 
            "jenis": "strength", 
            "subkategori": "explosive_strength", 
            "kesulitan": "Hard", 
            "target": "Legs, glutes",
            "description": "Squat diikuti dengan lompatan eksplosif."
          },
          { 
            "name": "Clapping Push-ups", 
            "jenis": "strength", 
            "subkategori": "explosive_strength", 
            "kesulitan": "Hard", 
            "target": "Chest, shoulders, triceps",
            "description": "Push-up eksplosif dengan tepuk tangan di tengahnya."
          },
          { 
            "name": "Box Jumps", 
            "jenis": "strength", 
            "subkategori": "explosive_strength", 
            "kesulitan": "Hard", 
            "target": "Legs, glutes",
            "description": "Melompat ke atas box atau platform."
          },
          { 
            "name": "Broad Jumps", 
            "jenis": "strength", 
            "subkategori": "explosive_strength", 
            "kesulitan": "Hard", 
            "target": "Legs, glutes",
            "description": "Melompat ke depan sejauh mungkin."
          }
        ],
        "strength_endurance": [
          { 
            "name": "Push-ups (High Reps)", 
            "jenis": "strength", 
            "subkategori": "strength_endurance", 
            "kesulitan": "Medium", 
            "target": "Chest, shoulders, triceps, core",
            "description": "Push-up dengan repetisi tinggi untuk ketahanan otot."
          },
          { 
            "name": "Plank (Long Duration)", 
            "jenis": "strength", 
            "subkategori": "strength_endurance", 
            "kesulitan": "Medium", 
            "target": "Core, lower back",
            "description": "Plank dengan durasi yang lebih lama."
          },
          { 
            "name": "Walking Lunges", 
            "jenis": "strength", 
            "subkategori": "strength_endurance", 
            "kesulitan": "Medium", 
            "target": "Legs, glutes",
            "description": "Lunges sambil berjalan ke depan."
          },
          { 
            "name": "Dips (High Reps)", 
            "jenis": "strength", 
            "subkategori": "strength_endurance", 
            "kesulitan": "Medium", 
            "target": "Triceps, chest, shoulders",
            "description": "Dips dengan repetisi tinggi untuk ketahanan otot."
          }
        ],
        "relative_strength": [
          { 
            "name": "Pistol Squats", 
            "jenis": "strength", 
            "subkategori": "relative_strength", 
            "kesulitan": "Hard", 
            "target": "Legs, glutes",
            "description": "Squat satu kaki dengan kaki lainnya diluruskan ke depan."
          },
          { 
            "name": "Muscle-ups", 
            "jenis": "strength", 
            "subkategori": "relative_strength", 
            "kesulitan": "Very Hard", 
            "target": "Chest, shoulders, back, arms",
            "description": "Kombinasi pull-up dan dip dalam satu gerakan."
          },
          { 
            "name": "Human Flag", 
            "jenis": "strength", 
            "subkategori": "relative_strength", 
            "kesulitan": "Very Hard", 
            "target": "Core, shoulders, lats",
            "description": "Memegang tiang secara horizontal dengan tubuh sejajar dengan tanah."
          },
          { 
            "name": "Dragon Flags", 
            "jenis": "strength", 
            "subkategori": "relative_strength", 
            "kesulitan": "Very Hard", 
            "target": "Core, upper body",
            "description": "Mengangkat seluruh tubuh dengan hanya bertumpu pada bahu."
          }
        ]
      }
    }

    try:
        # Get all workouts from the specified category and type
        all_workouts = workout_db[body_part][movement_type]
        
        # Filter by difficulty level if specified
        if user_level == 'beginner':
            filtered = [w for w in all_workouts if w['kesulitan'] == 'Easy']
        elif user_level == 'intermediate':
            filtered = [w for w in all_workouts if w['kesulitan'] == 'Medium']
        elif user_level == 'advanced':
            filtered = [w for w in all_workouts if w['kesulitan'] in ['Hard', 'Very Hard']]
        else:
            # If level is not specific, return all
            filtered = all_workouts
        
        # If nothing matches the level, return all
        if not filtered:
            filtered = all_workouts
            
        return filtered
    except Exception as e:
        print(f"Error in recommendation function: {e}", file=sys.stderr)
        return []

if __name__ == "__main__":
    if len(sys.argv) >= 3:
        try:
            body_part = sys.argv[1].lower()
            movement_type = sys.argv[2].lower()
            user_level = sys.argv[3].lower() if len(sys.argv) >= 4 else 'all'
            
            recommendations = recommend_workouts(body_part, movement_type, user_level)
            print(json.dumps(recommendations))
        except Exception as e:
            print(f"Error in script execution: {e}", file=sys.stderr)
            print("[]")
    else:
        print("[]")