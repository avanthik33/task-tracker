export type errorMessage = { message: string };

export interface ProtectRouteProps {
  children: React.ReactNode;
}

export interface UseTimeIntervalProps {
  task: Tasks[];
}

export type Tasks = {
  id: number;
  userId: number;
  task: string;
  description: string;
  time: string;
  status: string;
};

export interface inputState {
  email: string;
  password: string;
}

export interface signupData {
  userId: number;
  username: string;
  email: string;
  phone: string;
  confirmPass: string;
  password: string;
}
