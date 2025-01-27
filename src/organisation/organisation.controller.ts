import { Organisation } from '../types/modelTypes';
import { Controller, Post, Body } from '@nestjs/common';
import { OrganisationDto } from './organisation.service';
import { OrganisationService } from './organisation.service';

@Controller('org')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Post('create')
  async createOrganisation(
    @Body() createOrganisationDto: OrganisationDto,
  ): Promise<Organisation> {
    return this.organisationService.createOrganisation(createOrganisationDto);
  }
}
