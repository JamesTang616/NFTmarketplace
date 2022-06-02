import { BaseAPI } from 'decentraland-dapps/dist/lib/api'
import { NFT_SERVER_URL } from '../nft'
import {
  RankingEntities,
  RankingEntity,
  RankingsFilters
} from '../../../analytics/types'

class RankingsAPI extends BaseAPI {
  fetch = async (
    entity: RankingEntities,
    filters: RankingsFilters = {}
  ): Promise<RankingEntity> => {
    console.log('entity: ', entity)
    const queryParams = this.buildItemsQueryString(filters)
    return this.request('get', `/rankings?${queryParams}`)
  }

  private buildItemsQueryString(filters: RankingsFilters): string {
    const queryParams = new URLSearchParams()

    if (filters.category) {
      queryParams.append('category', filters.category)
    }
    if (filters.rarity) {
      queryParams.append('rarity', filters.rarity)
    }
    if (filters.sortBy) {
      queryParams.append('sortBy', filters.sortBy.toString())
    }

    return queryParams.toString()
  }
}

export const rankingsAPI = new RankingsAPI(NFT_SERVER_URL)
