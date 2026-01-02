export class CreateReviewDto {
  targetType: 'doctor' | 'clinic';
  targetId: string;
  rating: number; // 1-5
  comment?: string;
}
