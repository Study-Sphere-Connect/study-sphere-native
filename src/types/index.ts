enum UserRole {
    MENTOR = "MENTOR",
    MENTEE = "MENTEE",
    ADMIN = "ADMIN"
}

export interface User {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    bio: string | null;
    role: UserRole;
    isTwoFactorEnabled: boolean;
}

export interface Education {
    id: string;
    userId: string;
    institution: string;
    country: string;
    level: EducationLevel;
    major: string;
    startYear: number;
    endYear: number;
    isVerified: boolean;
}

enum EducationLevel {
    HIGH_SCHOOL = "HIGH_SCHOOL",
    BACHELOR = "BACHELOR",
    MASTER = "MASTER",
    PHD = "PHD"
  }