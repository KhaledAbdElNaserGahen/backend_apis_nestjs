export class ForgotPasswordDto {
  email: string;
}

export class ResetPasswordDto {
  email: string;
  code: string;
  newPassword: string;
}

export class VerifyEmailDto {
  email: string;
  code: string;
}
