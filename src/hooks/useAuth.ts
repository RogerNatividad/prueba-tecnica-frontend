import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types';
import { authService } from '@/services';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// Hook para obtener el usuario actual
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => {
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error('No authenticated user');
      }
      return user;
    },
    enabled: authService.isAuthenticated(),
    staleTime: Infinity, // El usuario no cambia frecuentemente
    retry: false,
  });
};

// Hook para login
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data: AuthResponse) => {
      // Actualizar cache del usuario
      queryClient.setQueryData(authKeys.user(), data.user);
      // Invalidar todas las queries relacionadas con auth
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};

// Hook para registro
export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: (data: AuthResponse) => {
      // Actualizar cache del usuario
      queryClient.setQueryData(authKeys.user(), data.user);
      // Invalidar todas las queries relacionadas con auth
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      console.error('Register error:', error);
    },
  });
};

// Hook para logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Limpiar todo el cache
      queryClient.clear();
      // Remover datos del usuario
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      console.error('Logout error:', error);
    },
  });
};

// Hook para verificar autenticación
export const useIsAuthenticated = () => {
  const { data: user, isLoading } = useCurrentUser();
  
  return {
    isAuthenticated: !!user && authService.isAuthenticated(),
    isLoading,
    user,
  };
};

// Hook para refrescar token
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: () => authService.refreshToken(),
    onError: (error) => {
      console.error('Token refresh error:', error);
      // Si falla el refresh, hacer logout
      authService.logout();
    },
  });
};