import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSetting } from './entities/user-setting.entity';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(UserSetting)
    private settingsRepository: Repository<UserSetting>,
  ) {}

  async getSettings(userId: string | number): Promise<UserSetting> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    let settings = await this.settingsRepository.findOne({
      where: { userId: userIdStr } as any,
    });

    // Create default settings if not exists
    if (!settings) {
      settings = this.settingsRepository.create({
        userId: userIdStr,
        language: 'ar',
        notifications_enabled: true,
        sound_enabled: true,
        vibration_enabled: true,
        font_size: 'medium',
        theme: 'light',
        show_online_status: true,
      });
      settings = await this.settingsRepository.save(settings);
    }

    return settings;
  }

  async updateSettings(
    userId: string | number,
    updateSettingsDto: UpdateSettingsDto,
  ): Promise<UserSetting> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    let settings = await this.settingsRepository.findOne({
      where: { userId: userIdStr } as any,
    });

    if (!settings) {
      // Create if not exists
      settings = this.settingsRepository.create({
        userId: userIdStr,
        ...updateSettingsDto,
      });
    } else {
      // Update existing
      Object.assign(settings, updateSettingsDto);
    }

    return await this.settingsRepository.save(settings);
  }
}
