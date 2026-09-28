import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'service-agreed' })
  serviceAgreed: boolean;

  @Column({ name: 'privacy-agreed' })
  privacyAgreed: boolean;

  @Column({ name: 'marketing-agreed' })
  markettingArgreed: boolean;
}
