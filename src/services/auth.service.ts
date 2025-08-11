import { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types';
import { mockUsers, generateMockAuthResponse, simulateNetworkDelay } from '@/lib/mockData';

class AuthService {
  private readonly STORAGE_KEYS = {
    TOKEN: 'authToken',
    USER: 'user',
    REFRESH_TOKEN: 'refreshToken',
  };

  // Simular login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    await simulateNetworkDelay(800);

    // Buscar usuario por email
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Simular validación de contraseña (en producción esto se haría en el backend)
    if (credentials.password !== 'password123') {
      throw new Error('Contraseña incorrecta');
    }

    const authResponse = generateMockAuthResponse(user);
    
    // Guardar en localStorage
    this.setAuthData(authResponse);
    
    return authResponse;
  }

  // Simular registro
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    await simulateNetworkDelay(1000);

    // Verificar si el email ya existe
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Crear nuevo usuario
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Agregar a la lista de usuarios mock
    mockUsers.push(newUser);

    const authResponse = generateMockAuthResponse(newUser);
    
    // Guardar en localStorage
    this.setAuthData(authResponse);
    
    return authResponse;
  }

  // Logout
  async logout(): Promise<void> {
    await simulateNetworkDelay(300);
    this.clearAuthData();
  }

  // Obtener usuario actual
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.STORAGE_KEYS.USER);
    const user = userStr ? JSON.parse(userStr) : null;
    console.log('AuthService.getCurrentUser:', user);
    return user;
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem(this.STORAGE_KEYS.TOKEN);
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Refrescar token (simulado)
  async refreshToken(): Promise<string> {
    await simulateNetworkDelay(500);
    
    const refreshToken = localStorage.getItem(this.STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const newToken = `refreshed-token-${Date.now()}`;
    localStorage.setItem(this.STORAGE_KEYS.TOKEN, newToken);
    
    return newToken;
  }

  // Métodos privados para manejo de localStorage
  private setAuthData(authResponse: AuthResponse): void {
    localStorage.setItem(this.STORAGE_KEYS.TOKEN, authResponse.token);
    localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(authResponse.user));
    localStorage.setItem(this.STORAGE_KEYS.REFRESH_TOKEN, authResponse.refreshToken);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.STORAGE_KEYS.TOKEN);
    localStorage.removeItem(this.STORAGE_KEYS.USER);
    localStorage.removeItem(this.STORAGE_KEYS.REFRESH_TOKEN);
  }
}

export const authService = new AuthService();
export default authService;