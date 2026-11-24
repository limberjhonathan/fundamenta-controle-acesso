import type { User } from './user';

/**
 * Contrato de persistência de usuários.
 *
 * As regras de negócio (service) dependem desta interface, e não do
 * AsyncStorage diretamente. Trocar o armazenamento (ex.: SQLite ou API)
 * exige apenas uma nova implementação deste contrato.
 */
export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByLogin(login: string): Promise<User | null>;
  insert(user: User): Promise<void>;
  update(user: User): Promise<void>;
  remove(id: string): Promise<void>;
}
