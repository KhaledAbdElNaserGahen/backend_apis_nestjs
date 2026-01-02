import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Clinic } from '../clinics/entities/clinic.entity';
import { Video } from '../videos/entities/video.entity';
import { Pharmacy } from '../pharmacy/entities/pharmacy.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Clinic)
    private clinicsRepository: Repository<Clinic>,
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
    @InjectRepository(Pharmacy)
    private pharmaciesRepository: Repository<Pharmacy>,
  ) {}

  async globalSearch(query: string, filters?: string[]) {
    const searchTerm = query.toLowerCase();
    const results: any = {
      doctors: [],
      clinics: [],
      videos: [],
      pharmacies: [],
    };

    // Search Doctors
    if (!filters || filters.includes('doctors')) {
      const doctors = await this.usersRepository.find({
        where: { role: 'doctor' } as any,
      });

      results.doctors = doctors.filter(doctor =>
        doctor.name?.toLowerCase().includes(searchTerm) ||
        doctor.job?.toLowerCase().includes(searchTerm)
      ).map(doctor => ({
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.job,
        email: doctor.email,
        phone: doctor.phone,
      }));
    }

    // Search Clinics
    if (!filters || filters.includes('clinics')) {
      const clinics = await this.clinicsRepository.find();

      results.clinics = clinics.filter(clinic =>
        clinic.name?.toLowerCase().includes(searchTerm) ||
        clinic.address?.toLowerCase().includes(searchTerm) ||
        clinic.specialty?.toLowerCase().includes(searchTerm)
      ).map(clinic => ({
        id: clinic.id,
        name: clinic.name,
        address: clinic.address,
        specialty: clinic.specialty,
        phone: clinic.phone,
        rating: clinic.rating,
      }));
    }

    // Search Videos
    if (!filters || filters.includes('videos')) {
      const videos = await this.videosRepository.find();

      results.videos = videos.filter(video =>
        video.title?.toLowerCase().includes(searchTerm) ||
        video.description?.toLowerCase().includes(searchTerm) ||
        video.category?.toLowerCase().includes(searchTerm)
      ).map(video => ({
        id: video.id,
        title: video.title,
        description: video.description,
        category: video.category,
        thumbnailUrl: video.thumbnailUrl,
        duration: video.duration,
      }));
    }

    // Search Pharmacies
    if (!filters || filters.includes('pharmacies')) {
      const pharmacies = await this.pharmaciesRepository.find();

      results.pharmacies = pharmacies.filter(pharmacy =>
        pharmacy.name?.toLowerCase().includes(searchTerm) ||
        pharmacy.address?.toLowerCase().includes(searchTerm) ||
        pharmacy.city?.toLowerCase().includes(searchTerm)
      ).map(pharmacy => ({
        id: pharmacy.id,
        name: pharmacy.name,
        address: pharmacy.address,
        city: pharmacy.city,
        phone: pharmacy.phone,
        isOpen: pharmacy.isOpen,
      }));
    }

    const totalResults = 
      results.doctors.length +
      results.clinics.length +
      results.videos.length +
      results.pharmacies.length;

    return {
      success: true,
      query: query,
      totalResults,
      data: results,
    };
  }

  async searchDoctors(query: string) {
    const searchTerm = query.toLowerCase();
    const doctors = await this.usersRepository.find({
      where: { role: 'doctor' } as any,
    });

    const filtered = doctors.filter(doctor =>
      doctor.name?.toLowerCase().includes(searchTerm) ||
      doctor.job?.toLowerCase().includes(searchTerm)
    );

    return {
      success: true,
      data: filtered.map(doctor => ({
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.job,
        email: doctor.email,
        phone: doctor.phone,
        gender: doctor.gender,
      })),
    };
  }

  async searchClinics(query: string) {
    const searchTerm = query.toLowerCase();
    const clinics = await this.clinicsRepository.find();

    const filtered = clinics.filter(clinic =>
      clinic.name?.toLowerCase().includes(searchTerm) ||
      clinic.address?.toLowerCase().includes(searchTerm) ||
      clinic.specialty?.toLowerCase().includes(searchTerm)
    );

    return {
      success: true,
      data: filtered,
    };
  }

  async searchVideos(query: string) {
    const searchTerm = query.toLowerCase();
    const videos = await this.videosRepository.find();

    const filtered = videos.filter(video =>
      video.title?.toLowerCase().includes(searchTerm) ||
      video.description?.toLowerCase().includes(searchTerm) ||
      video.category?.toLowerCase().includes(searchTerm)
    );

    return {
      success: true,
      data: filtered,
    };
  }
}
