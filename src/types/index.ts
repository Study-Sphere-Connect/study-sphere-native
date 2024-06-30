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

export interface CurrentUser {
    bio: string | null;
    email: string;
    emailVerified: string; // You might want to use a more specific type like Date if you parse this string into a Date object
    iat: number;
    id: string;
    image: string | null;
    isTwoFactorEnabled: boolean;
    name: string;
    role: string;
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