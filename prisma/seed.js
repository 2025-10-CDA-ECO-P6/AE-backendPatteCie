require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const { PrismaNeon } = require('@prisma/adapter-neon')
const { Pool } = require('@neondatabase/serverless')

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Début du seeding...')

  // Créer des propriétaires
  const owner1 = await prisma.owner.create({
    data: {
      UUID: 1001,
      name: 'Dupont',
      first_name: 'Marie',
      phone: 612345678,
      email: 'marie.dupont@email.com',
      adress: '15 rue des Lilas, 75001 Paris'
    }
  })

  const owner2 = await prisma.owner.create({
    data: {
      UUID: 1002,
      name: 'Martin',
      first_name: 'Thomas',
      phone: 623456789,
      email: 'thomas.martin@email.com',
      adress: '8 avenue Victor Hugo, 69002 Lyon'
    }
  })

  const owner3 = await prisma.owner.create({
    data: {
      UUID: 1003,
      name: 'Bernard',
      first_name: 'Sophie',
      phone: 634567890,
      email: 'sophie.bernard@email.com',
      adress: '22 boulevard de la République, 13001 Marseille'
    }
  })

  console.log('✅ Propriétaires créés')

  // Créer des animaux
  const animal1 = await prisma.animal.create({
    data: {
      name: 'Max',
      sex: 'M',
      date_of_birth: new Date('2020-03-15'),
      species: 'Chien',
      race: 'Golden Retriever',
      weight_kg: 30,
      color: 'Doré',
      sterilizes: true,
      chip_number: 250268500123456,
      photo: '/photos/max.jpg',
      owner_id: owner1.owner_id
    }
  })

  const animal2 = await prisma.animal.create({
    data: {
      name: 'Minou',
      sex: 'F',
      date_of_birth: new Date('2019-07-22'),
      species: 'Chat',
      race: 'Siamois',
      weight_kg: 4,
      color: 'Crème et marron',
      sterilizes: true,
      chip_number: 250268500234567,
      photo: '/photos/minou.jpg',
      owner_id: owner1.owner_id
    }
  })

  const animal3 = await prisma.animal.create({
    data: {
      name: 'Rex',
      sex: 'M',
      date_of_birth: new Date('2021-01-10'),
      species: 'Chien',
      race: 'Berger Allemand',
      weight_kg: 35,
      color: 'Noir et feu',
      sterilizes: false,
      chip_number: 250268500345678,
      photo: '/photos/rex.jpg',
      owner_id: owner2.owner_id
    }
  })

  const animal4 = await prisma.animal.create({
    data: {
      name: 'Bella',
      sex: 'F',
      date_of_birth: new Date('2022-05-18'),
      species: 'Chat',
      race: 'Européen',
      weight_kg: 3,
      color: 'Tigré gris',
      sterilizes: false,
      chip_number: 250268500456789,
      photo: '/photos/bella.jpg',
      owner_id: owner3.owner_id
    }
  })

  console.log('✅ Animaux créés')

  // Créer l'équipe médicale
  const vet1 = await prisma.medicalTeam.create({
    data: {
      UUID: 2001,
      name: 'Leclerc',
      first_name: 'Pierre',
      email: 'p.leclerc@pattecie.com',
      phone: 145678901,
      role: 'Vétérinaire principal'
    }
  })

  const vet2 = await prisma.medicalTeam.create({
    data: {
      UUID: 2002,
      name: 'Dubois',
      first_name: 'Julie',
      email: 'j.dubois@pattecie.com',
      phone: 156789012,
      role: 'Vétérinaire assistant'
    }
  })

  const nurse1 = await prisma.medicalTeam.create({
    data: {
      UUID: 2003,
      name: 'Moreau',
      first_name: 'Céline',
      email: 'c.moreau@pattecie.com',
      phone: 167890123,
      role: 'Infirmière vétérinaire'
    }
  })

  console.log('✅ Équipe médicale créée')

  // Créer des traitements
  const treatment1 = await prisma.treatment.create({
    data: {
      name: 'Vaccination annuelle',
      date_start: new Date('2024-01-15'),
      date_end: new Date('2024-01-15'),
      reason: 'Vaccination de routine',
      comments: 'Vaccins CHLRP administrés'
    }
  })

  const treatment2 = await prisma.treatment.create({
    data: {
      name: 'Traitement antibiotique',
      date_start: new Date('2024-02-10'),
      date_end: new Date('2024-02-24'),
      reason: 'Infection cutanée',
      comments: 'Amoxicilline 500mg 2x par jour pendant 14 jours'
    }
  })

  const treatment3 = await prisma.treatment.create({
    data: {
      name: 'Détartrage dentaire',
      date_start: new Date('2024-03-05'),
      date_end: new Date('2024-03-05'),
      reason: 'Tartre important',
      comments: 'Détartrage sous anesthésie générale'
    }
  })

  console.log('✅ Traitements créés')

  // Créer des visites
  const visit1 = await prisma.visit.create({
    data: {
      date: new Date('2024-01-15T10:30:00'),
      reason: 'Consultation de routine',
      comments: 'Animal en bonne santé. Vaccination effectuée.',
      animal_id: animal1.animal_id,
      medical_team_id: vet1.medical_team_id,
      treatment_id: treatment1.treatment_id
    }
  })

  const visit2 = await prisma.visit.create({
    data: {
      date: new Date('2024-02-10T14:00:00'),
      reason: 'Infection de la peau',
      comments: 'Dermatite bactérienne. Prescription antibiotique.',
      animal_id: animal3.animal_id,
      medical_team_id: vet2.medical_team_id,
      treatment_id: treatment2.treatment_id
    }
  })

  const visit3 = await prisma.visit.create({
    data: {
      date: new Date('2024-03-05T09:00:00'),
      reason: 'Soins dentaires',
      comments: 'Détartrage effectué. Extraction d\'une dent infectée.',
      animal_id: animal2.animal_id,
      medical_team_id: vet1.medical_team_id,
      treatment_id: treatment3.treatment_id
    }
  })

  const visit4 = await prisma.visit.create({
    data: {
      date: new Date('2024-04-12T11:30:00'),
      reason: 'Consultation post-opératoire',
      comments: 'Cicatrisation normale. Retrait des fils prévu dans 1 semaine.',
      animal_id: animal2.animal_id,
      medical_team_id: nurse1.medical_team_id,
      treatment_id: treatment3.treatment_id
    }
  })

  console.log('✅ Visites créées')

  // Créer des liens TreatmentVisit
  await prisma.treatmentVisit.create({
    data: {
      visit_id: visit1.visit_id,
      treatment_id: treatment1.treatment_id
    }
  })

  await prisma.treatmentVisit.create({
    data: {
      visit_id: visit2.visit_id,
      treatment_id: treatment2.treatment_id
    }
  })

  await prisma.treatmentVisit.create({
    data: {
      visit_id: visit3.visit_id,
      treatment_id: treatment3.treatment_id
    }
  })

  await prisma.treatmentVisit.create({
    data: {
      visit_id: visit4.visit_id,
      treatment_id: treatment3.treatment_id
    }
  })

  console.log('✅ Liens TreatmentVisit créés')

  console.log('🎉 Seeding terminé avec succès !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })