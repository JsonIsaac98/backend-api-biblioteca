import { PartialType } from '@nestjs/swagger';
import { CreatePrestamoDto } from './create-prestamo.dto';
import { IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePrestamoDto extends PartialType(CreatePrestamoDto) {
  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  fechaDevolucionReal?: string;
}