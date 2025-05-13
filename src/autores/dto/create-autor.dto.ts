// backend/src/autores/dto/create-autor.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAutorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  biografia?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nacionalidad?: string;

  @ApiProperty({ required: false })
  @IsISO8601()
  @IsOptional()
  fechaNacimiento?: string;
}