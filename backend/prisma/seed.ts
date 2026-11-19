import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create Default Admin User
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('admin123', salt);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@slngroups.com' },
    update: {},
    create: {
      email: 'admin@slngroups.com',
      name: 'SLN Executive Admin',
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log(`👤 Admin created: ${admin.email} (Password: admin123)`);

  // 2. Create Sample Projects
  const project1 = await prisma.project.upsert({
    where: { slug: 'sln-grandeur' },
    update: {},
    create: {
      slug: 'sln-grandeur',
      title: 'SLN Grandeur',
      tagline: 'Ultra-Luxury 3 & 4 BHK Sky Residences',
      description: 'An iconic architectural marvel in the Financial District featuring double-height ceiling lobbies, sky lounge, and bespoke concierge services.',
      category: 'ONGOING',
      propertyType: 'RESIDENTIAL_LUXURY',
      location: 'Financial District, Gachibowli',
      address: 'Plot 42, Financial District, Nanakramguda',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032',
      latitude: 17.4156,
      longitude: 78.3421,
      totalAreaSqFt: '1,850,000',
      unitsCount: '340 Residences',
      floors: 'G+42 Floors',
      expectedPossession: 'December 2026',
      featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      galleryImages: JSON.stringify([
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
      ]),
      amenities: JSON.stringify([
        'Infinity Edge Olympic-Size Pool',
        'Private Clubhouse & Cigar Lounge',
        'Helipad & Valet Concierge',
        'Smart Automation & Biometric Access',
        'Full-size Tennis & Squash Courts',
      ]),
      highlights: JSON.stringify([
        'IGBC Platinum Pre-Certified Green Building',
        '360° Panoramic Skyline Views',
        'Italian Marble Flooring & Poggenpohl Kitchens',
      ]),
      isFeatured: true,
      isPublished: true,
      orderIndex: 1,
    },
  });

  const project2 = await prisma.project.upsert({
    where: { slug: 'sln-eden-villas' },
    update: {},
    create: {
      slug: 'sln-eden-villas',
      title: 'SLN Eden Villas',
      tagline: 'Private Gated Villa Community in Serene Greenery',
      description: 'Exclusive 5 BHK signature villas nestled amidst 25 acres of lush landscaped flora with private swimming pools and organic gardens.',
      category: 'COMPLETED',
      propertyType: 'EXCLUSIVE_VILLAS',
      location: 'Moinabad',
      address: 'Chevelle Road, Moinabad',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '501504',
      totalAreaSqFt: '750,000',
      unitsCount: '65 Bespoke Villas',
      completionYear: '2024',
      featuredImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      galleryImages: JSON.stringify([
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      ]),
      amenities: JSON.stringify([
        'Private Plunge Pool for Each Villa',
        'Organic Farming Patch & Miyawaki Forest',
        '24/7 Multi-Tier Perimeter Security',
      ]),
      highlights: JSON.stringify([
        'Ready to Move In with Full Occupancy Certificate',
        '100% Vastu Compliant Architecture',
      ]),
      isFeatured: true,
      isPublished: true,
      orderIndex: 2,
    },
  });

  console.log(`🏢 Projects seeded: ${project1.title}, ${project2.title}`);

  // 3. Create Sample Leadership
  await prisma.leadershipMember.createMany({
    data: [
      {
        name: 'S. Lakshmi Narayana',
        designation: 'Founder & Chairman',
        department: 'LEADERSHIP',
        bio: 'Visionary entrepreneur with over 30 years of transformative leadership in premium real estate, infrastructure, and urban master-planning.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        orderIndex: 1,
      },
      {
        name: 'Rajesh Varma',
        designation: 'Managing Director & CEO',
        department: 'LEADERSHIP',
        bio: 'Oversees group operations, capital strategy, and sustainable construction initiatives across South India.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        orderIndex: 2,
      },
    ],
  });
  console.log('👥 Leadership members seeded.');

  // 4. Create Sample Branches
  await prisma.branch.createMany({
    data: [
      {
        name: 'Corporate Headquarters',
        branchType: 'HEADQUARTERS',
        address: 'SLN One Tower, 14th Floor, Road No. 36, Jubilee Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500033',
        phone: '+91 40 2345 6789',
        email: 'info@slngroups.com',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
        photoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
        isHeadquarters: true,
        orderIndex: 1,
      },
      {
        name: 'Gachibowli Experience Center',
        branchType: 'EXPERIENCE_CENTER',
        address: 'Financial District, Near Wave Rock, Gachibowli',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500032',
        phone: '+91 40 4567 8901',
        email: 'experience.fd@slngroups.com',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
        photoUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
        isHeadquarters: false,
        orderIndex: 2,
      },
    ],
  });
  console.log('📍 Branches seeded.');

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

