import { SearchableFiltersDto } from '#framework'
import { Campaign } from '../../Entity'
import { ICampaignRepository } from '../../Repository'

export class CampaignService {
  constructor(private readonly campaignRepository: ICampaignRepository) {}

  public async save(campaign: Campaign): Promise<Campaign> {
    const campaigns = await this.campaignRepository.getAll(new SearchableFiltersDto())

    if (campaigns.length <= 3) return this.campaignRepository.save(campaign)

    const oldestCampaign = campaigns.slice(-1).pop()

    if (oldestCampaign) await this.campaignRepository.delete(oldestCampaign.getId())

    return await this.campaignRepository.save(campaign)
  }

  public async getOneById(id: string): Promise<Campaign> {
    return this.campaignRepository.getOneById(id)
  }
}
